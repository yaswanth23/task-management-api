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

Testing PING endpoint (copy and import the curls):
```bash
curl http://localhost:9100/api/ping
```