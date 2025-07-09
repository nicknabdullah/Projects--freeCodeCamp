## Description

This project is a solution to the File Metadata Microservice challenge on freeCodeCamp: [File Metadata Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice)

This microservice allows users to upload a file and receive metadata about that file, including its name, type, and size.

## Technologies Used

-   Node.js
-   Express.js
-   CORS
-   Multer (for handling `multipart/form-data`)

## Installation and Usage

1.  **Download the folder and get inside:**
    ```bash
    cd [folder name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the application:**
    ```bash
    npm start
    ```
    The application will be running on `http://localhost:3000`.

## API Endpoint

-   **`POST /api/fileanalyse`**:
    -   **Description:** Uploads a single file and returns its metadata.
    -   **Request Type:** `multipart/form-data`
    -   **Form Field Name:** `upfile`
    -   **Response:** A JSON object containing:
        -   `name`: The original name of the uploaded file.
        -   `type`: The MIME type of the uploaded file.
        -   `size`: The size of the uploaded file in bytes.

## Example Usage

1.  Access the home page at `http://localhost:3000`.
2.  Select a file using the "Choose File" input field.
3.  Click the "Upload" button to submit the file.
4.  The API will return a JSON response with the file's metadata.

## License

This project is for educational purposes as part of the freeCodeCamp curriculum.
