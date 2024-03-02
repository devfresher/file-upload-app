const { config } = require('dotenv');
const express = require('express');
const { FileWizardry } = require('express-file-wizardry');

config();
const app = express();
const port = 3000;

const fileWizardry = new FileWizardry();
fileWizardry.setStorageType('cloudinary', {
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post(
	'/upload-single',
	fileWizardry.upload({ formats: ['image/jpeg', 'image/png'], fieldName: 'image' }),
	(req, res) => {
		try {
			if (req.fileValidationError) {
				return res.status(400).json({
					error: req.fileValidationError.message || req.fileValidationError,
				});
			}
			res.status(200).json({
				message: 'File uploaded successfully',
				file: req.file,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: 'Internal server error',
				error: error.message,
			});
		}
	}
);

app.post(
	'/upload-multi',
	fileWizardry.upload({
		formats: ['image/jpeg', 'image/png'],
		fieldName: 'images',
		multiFile: true,
	}),
	(req, res) => {
		try {
			if (req.fileValidationError) {
				return res.status(400).json({
					error: req.fileValidationError.message || req.fileValidationError,
				});
			}
			res.status(200).json({
				message: 'Files uploaded successfully',
				file: req.files,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: 'Internal server error',
				error: error.message,
			});
		}
	}
);

app.delete('/delete-file/:fileId', async (req, res) => {
	try {
		await fileWizardry.deleteFile('cloudinary', req.params.fileId);

		res.status(200).json({
			message: 'File deleted successfully',
			file: req.file,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Internal server error',
			error: error.message,
		});
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
