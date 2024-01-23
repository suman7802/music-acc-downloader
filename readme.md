# Download YouTube's music/playlist on AAC format

## Setup

1. Create a `.env` file inside the `server` directory.

2. Obtain a `YouTube_API_KEY` from [Google Cloud Console](https://console.cloud.google.com/).

## Running the Application

You can run the application either on your local machine using Node.js or inside a Docker container.

### Using Node on Local Machine

Run the following command:

```bash
npm run start
```

### Using Docker Container

Run the following command:

```bash
docker-compose up --build
```

After running the application, the server will be available at http://localhost:8000 and the client at http://localhost:5173.

Navigate to http://localhost:5173 to view the client.

API Documentation
You can view the API documentation on Postman here.

```
  https://documenter.getpostman.com/view/27265804/2s9YymH5H5
```
