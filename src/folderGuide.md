1. I have setted Up the backend heres the complete details --> 

<directory_structure>
src/
  config/
  controller/
    AdminCotroller/
    ApplicationController/
      DoctorsController/
      UsersController/
  middleware/
  models/
    AdminModels/
    ApplicationModels/
      DoctorModels/
      PatientModels/
  routes/
    AdminRoutes/
    ApplicationRoutes/
      DoctorsRoutes/
      UsersRoutes/
    app.js
index.js
package.json
</directory_structure>


2. package.json file --> 

{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "dotenv": "^18.0.5",
    "mongoose": "^9.10.4",
    "multer": "^2.4.0"
  }
}

3. details about the folder structures --> 


1. config folder is for configuration files of db , razorpay or any other third party service we will use 

2. controller will have all the controller fuction separate controller folder for admin and separate for the application (further to better organize the work application have doctor and patient controllers separately )

3. middleware folder will have all the middleware files related to authentication , multer etc whatever more middlewares we will set up in future 

4. models to write the schemas separate models folder for admin and separate for the application (further to better organize the work application have doctor and patient models separately )

5. routes folder follows the similar pattern , and there is also a app.js , all the routes file that will come in admin , user , doctor will have the endpoints related to them while , app.js is where all the routes will be registered for different modules for all three of them 

6. index.js is going to be the main file . 

