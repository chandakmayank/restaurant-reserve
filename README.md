## Welcome to Restaurant reservation system

***Quick reservation system using express, postgres***

System design and modules
-
- **Docker** to manage App Container and DB container
- **Node/Express** for Application logic
- **Postgres** for DB
- **MomentJS** for Date/Time manipulations and transform
- **Joi** for API validation
- **Sequelize** ORM for app connection to DB
- **JWT** for authentication


**Folder structure**

- App folder has application code
- Config for DB connection and auth config
- Controllers have functions for data manipulation and querying
- Middleware for API request and response injection/validation
- Models have user, tables and reservation data models
- Routes include all accessible API endpoints
- Validators for checking API request data


**Prerequisite to run the app-**
*Have **docker** installed and running*

**Seed Data installed-**
- User roles `admin` and `user` are placed in database roles table
- Few tables with different capacity has been initialized
- One reservation with current time is created

**Assumptions**

- Minimum reservation time is 10 minutes

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

## Reservation Flow diagram

![Core reservation logic](https://github.com/chandakmayank/restaurant-reserve/blob/cbde068d29471a5babb1b911bd79aff3cf59d31a/docs/Reservation%20diagram.jpg)

## ER Diagram
![DB models](https://github.com/chandakmayank/restaurant-reserve/blob/cbde068d29471a5babb1b911bd79aff3cf59d31a/docs/ER%20diag.png)
