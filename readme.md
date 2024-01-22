server for download YouTube's music/playlist

To test or use it make sure to create .env file.
Example is provided as .env.example
- cd ./server

- PORT Recommended PORT 8000
- API_KEY from https://console.cloud.google.com/ (YouTube_API_KEY)

- npm run install
- npm run start or npm run dev

Using Docker Container
- please make sure you have docker and running
- make sure you are at the dir where dockerfile is present (server dir)

- docker build -t <any_image_name> .
- docker run -d -p 8000:8000 <any_image_name>

Now your docker container should be running on http://localhost:8000

PostMan API
- https://documenter.getpostman.com/view/27265804/2s9YymH5H5
Browser is supported for better experience

user interactive will be added soon 