## Welcome to Restaurant reservation system

***Quick reservation system using express, postgres, redis***

**Prerequisite to run the app-**
*Have **docker** installed and running*

**Seed Data installed-**
- User roles `admin` and `user` are placed in database roles table
- Few tables with different capacity has been initialized
- One reservation with current time is created

**Accessing the app**

 1. Import provided API JSON collection into Postman 
 2. Start the whole system by using `docker-compose up` 
    
 3. Test Application startup by accessing Public API test. If you get response then Node app is
    running

4. Sign up a new account using *'User signup'* endpoint 

5. After user is created, use the *'User Login'* Endpoint to get your access
    token. 

6. Place the access token in Postman collection Auth variable using key *'x-access-token'* 

7. That's it. Now you can check out all endpoints available to your user role 

8. Enjoy!!


**Folder structure**

- App folder has application code
- Config for DB connection and auth config
- Controllers have functions for data manipulation and querying
- Middleware for API request and response injection/validation
- Models have user, tables and reservation data models
- Routes include all accessible API endpoints
- Validators for checking API request data
