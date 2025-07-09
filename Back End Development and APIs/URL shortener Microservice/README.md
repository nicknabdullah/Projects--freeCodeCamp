# URL Shortener Microservice

A simple microservice that shortens URLs, built as part of the **freeCodeCamp - Back End Development and APIs** curriculum.

## Project Reference

-   [freeCodeCamp URL Shortener Microservice Project](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

## How to Use

1. Download the folder to your local machine.
2. Open a terminal in the project directory.
3. Install dependencies:
    ```bash
    npm install
    ```
4. Add **.env** file with MONGO_URI for database connection.
5. Start the server:
    ```bash
    npm start
    ```
6. The service will be running locally (default: `http://localhost:3000`).

## API Usage

-   **POST `/api/shorturl`**  
    Send a URL to receive a shortened version.

    ```json
    { "url": "https://example.com" }
    ```

-   **GET `/api/shorturl/:short_url`**  
    Redirects to the original URL.

## Example

1. POST a URL:
    ```
    POST http://localhost:3000/api/shorturl
    Body: { "url": "https://freecodecamp.org" }
    ```
2. Receive a response:
    ```json
    { "original_url": "https://freecodecamp.org", "short_url": 1 }
    ```
3. Visit `http://localhost:3000/api/shorturl/1` to be redirected to the original URL.

## License

This project is for educational purposes as part of the freeCodeCamp curriculum.
