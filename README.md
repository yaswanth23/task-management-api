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

This configuration limits users to making a maximum of 10 requests within a 60-second window. Adjustments to the rate limiter configuration can be made based on the application's requirements and observed usage patterns.

Please note that we have intentionally reduced the rate limiter thresholds for demonstration purposes. Adjustments may be made to these thresholds in production to better suit real-world usage scenarios.


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

### Add task endpoint cURL:
Replace `<AUTHORIZATION>` with the access token obtained after successful login. <TITLE> and <DESCRIPTION> should be replaced with the title and description of the task you want to add, respectively.
```bash
curl --location 'http://localhost:9100/api/v1/task' \
--header 'Authorization: <AUTHORIZATION>' \
--header 'Content-Type: application/json' \
--data '{
    "title": <TITLE>,
    "description": <DESCRIPTION>
}'
```

### Update task status endpoint cURL:
Replace `<AUTHORIZATION>` with the access token obtained after successful login. <TASK_ID> should be replaced with the ID of the task you want to update, and <STATUS> should be replaced with the new status (e.g., "completed" or "active").
```bash
curl --location --request PATCH 'http://localhost:9100/api/v1/task' \
--header 'Authorization: <AUTHORIZATION>' \
--header 'Content-Type: application/json' \
--data '{
    "taskId": <TASK_ID>,
    "status": <STATUS>
}'
```

### List of tasks endpoint cURL:
Replace `<AUTHORIZATION>` with the access token obtained after successful login.
```bash
curl --location 'http://localhost:9100/api/v1/task' \
--header 'Authorization: <AUTHORIZATION>'
```

### Delete task endpoint cURL:
Replace `<AUTHORIZATION>` with the access token obtained after successful login, and <TASK_ID> with the ID of the task you want to delete.
```bash
curl --location --request DELETE 'http://localhost:9100/api/v1/task/<TASK_ID>' \
--header 'Authorization: <AUTHORIZATION>'
```

### WebSocket Connection URL:
The WebSocket connection URL ws://localhost:9100 is used to establish a WebSocket connection to the server running locally on port 9100.
```bash
ws://localhost:9100
```