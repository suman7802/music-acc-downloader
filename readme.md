It'a server for download YouTube's music/playlist

so, To test or use it make sure to create .env file.
Example is provided as a .env.example form
- - get a YouTube_API_KEY from https://console.cloud.google.com/
- - and a port Recommended PORT 8000

- - - cd ./server
- - - npm run install
- - - npm run start or npm run dev

- For Docker Container
- - please make sure you have docker services running
- - - make sure you are at the dir where dockerfile is present (in server dir)

- - Run on your Terminal
- - - docker build -t <image_name> .
- - - docker run -d -p 8000:8000 <image_name>

Now your docker container should be running
so you can use it now

- PostMan API
- - https://documenter.getpostman.com/view/27265804/2s9YymH5H5

also you can use it via browser for better experience (because of get method it's easy on browser)

user interactive will be added soon