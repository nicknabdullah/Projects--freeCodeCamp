# Timestamp Microservice

This project is a simple Timestamp Microservice built as part of the [freeCodeCamp APIs and Microservices Certification](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice).

## Project Reference

-   [freeCodeCamp Timestamp Microservice Challenge](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice)

## Features

-   Returns the current timestamp in both Unix and UTC formats.
-   Accepts a date string or Unix timestamp as a parameter and returns the corresponding date.

## Getting Started

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```

## Usage

-   `GET /api`  
    Returns the current timestamp.
-   `GET /api/:date_string`  
    Returns the timestamp for the provided date string or Unix timestamp.

### Example Output

#### Request

```
GET /api/2015-12-25
```

#### Response

```json
{
    "unix": 1451001600000,
    "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```

#### Request

```
GET /api/1451001600000
```

#### Response

```json
{
    "unix": 1451001600000,
    "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```

## License

This project is for educational purposes as part of the freeCodeCamp curriculum.
