## Task-management-api
Real-Time Task Management System

## To run the application locally, follow the below steps.

1. Install the necessary dependencies after cloning this project in your local.

```bash
npm i
```

2. Start the server by running the below command. No need to worry about the DB connection as we are using a hosted mongoDB cluster for this project. 

```bash
NODE_ENV=development npm run start
```

We have a dedicated env file so thats why we are using `NODE_ENV` to set it as development.
Once the server is started you will see something like:
```bash
Web server listening on http://localhost:9100
Use the following command to test the ping call:
curl http://localhost:9100/api/ping
```
so the port for our API would be 9100

3. Open Postman to start using the API's for the Tast management starting with registering the user using singup and login API's.

Now that the server is running, let's make some requests to our API.

### Rate Limiter:
To prevent abuse and ensure fair usage of our API services, we have implemented a rate limiter. The rate limiter restricts the number of requests a user can make within a specified time window.
### Configuration:
i) Window Duration: 60 seconds
ii) Maximum Requests: 10 per window


### Testing PING endpoint (copy and import the cURL):
```bash
curl http://localhost:9100/api/ping
```

### Signup endpoint cURL:
To sign up for an account, you can use the following cURL command. Make sure to replace <USERNAME>, <EMAIL>, and <PASSWORD> with your desired username, email address, and password respectively.
```bash
curl --location 'http://localhost:9100/api/v1/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": <USERNAME>,
    "emailId": <EMAIL>,
    "password": <PASSWORD>
}'
```

### Login endpoint cURL:
To log in to your account, you can use the following cURL command. Ensure to replace <EMAIL> and <PASSWORD> with your registered email address and password respectively.
```bash
curl --location 'http://localhost:9100/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "emailId": <EMAIL>,
    "password": <PASSWORD>
}'
```

Upon successful login, you will receive an access token in the response. This access token must be included in the Authorization header of subsequent API requests.