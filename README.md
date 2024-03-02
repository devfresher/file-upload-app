# File Upload With express-file-wizardry

This is a simple Express.js application for handling file uploads using express-file-wizardry. It allows users to upload files to a specified storage location and delete files as needed.

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/devfresher/file-upload-app-with-express-file-wizardry.git
    ```

2. Navigate to the project directory:

    ```bash
    cd file-upload-app
    ```

3. Install dependencies using npm:

    ```bash
    npm install
    ```

## Usage

1. Set up your environment variables by creating a .env file in the root directory of the project. Include the following variables:

    ```plaintext
    CLOUD_NAME=your-cloudinary-cloud-name
    API_KEY=your-cloudinary-api-key
    API_SECRET=your-cloudinary-api-secret
    ```

    Replace your-access-key, your-secret-key, and your-region with your AWS credentials and region.

2. Start the Express.js server:

    ```bash
    node app.js
    ```

3. Access the application with your preferred API client like Postman to send requests to the defined routes:
    - `POST /upload-single`: Upload a file to the server.
    - `POST /upload-multi`: Upload multiple files to the server.
    - `DELETE /delete-file/:fileId`: Delete a file from the server. Replace :fileId with the name of the file you want to delete.
