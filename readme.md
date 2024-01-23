server for download YouTube's music/playlist

- cd ./server

  create .env file

  - PORT=8000 (Recommended PORT 8000)
  - API_KEY=YouTube_API_KEY
  - NODE_ENV=development
    Get API key from https://console.cloud.google.com/

- npm run install
- npm run start or npm run dev

Using Docker Container

- please make sure you have docker service running
- make sure you are at the Dir where docker-compose is present (root Dir)

- docker-compose up --build

Now your docker container should be running on

- server http://localhost:8000
- client http://localhost:5173

PostMan API

- https://documenter.getpostman.com/view/27265804/2s9YymH5H5
- Browser is supported for better experience
