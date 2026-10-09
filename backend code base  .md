 details about the folder structures --> 


1. config folder is for configuration files of db , razorpay or any other third party service we will use 

2. controller will have all the controller fuction separate controller folder for admin and separate for the application (further to better organize the work application have doctor and patient controllers separately )

3. middleware folder will have all the middleware files related to authentication , multer etc whatever more middlewares we will set up in future 

4. models to write the schemas separate models folder for admin and separate for the application (further to better organize the work application have doctor and patient models separately )

5. routes folder follows the similar pattern , and there is also a app.js , all the routes file that will come in admin , user , doctor will have the endpoints related to them while , app.js is where all the routes will be registered for different modules for all three of them 

6. index.js is going to be the main file . 

<directory_structure>
src/
  config/
    cloudinaryConfig.js
    db_config.js
    doctorCredentials.js
  controller/
    AdminCotroller/
      adminController.js
      DoctorApplicationAdminController.js
    ApplicationController/
      DoctorsController/
        DoctorApplicationController.js
        DoctorAuthController.js
        DoctorProfileController.js
      UsersController/
        userController.js
  middleware/
    doctorAuthMiddleware.js
    midlleware.js
    uploadMiddleware.js
  models/
    AdminModels/
      Admin.js
      adminModels.js
    ApplicationModels/
      DoctorModels/
        Doctor.js
        DoctorApplication.js
      PatientModels/
        PatientModels.js
  routes/
    AdminRoutes/
      adminRoutes.js
      DoctorApplicationAdminRoutes.js
    ApplicationRoutes/
      DoctorsRoutes/
        DoctorApplicationRoutes.js
        doctorRoutes.js
      UsersRoutes/
        userRoutes.js
    app.js
  folderGuide.md
.gitignore
index.js
package.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/config/cloudinaryConfig.js">
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
</file>

<file path="src/config/db_config.js">
const mongoose = require("mongoose")
let {DBNAME,ATLASUSERNAME,ATLASPASSWORD} = process.env


const db=()=>{
 
    mongoose.connect(`mongodb+srv://${ATLASUSERNAME}:${ATLASPASSWORD}@cluster0.erhuuwa.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() =>{
            console.log(`Atlas connection successfully 👍`)
        })
        .catch(()=>{
            console.log(`Atlas connection error`)
        })
        
}

module.exports=db
</file>

<file path="src/config/doctorCredentials.js">
const crypto = require("crypto");

const generateDoctorId = () => {
    const randomNumber = crypto.randomInt(100000, 999999);

    return `DOC${randomNumber}`;
};

const generateUsername = (fullName) => {
    const name = fullName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");

    const randomNumber = crypto.randomInt(1000, 9999);

    return `${name}${randomNumber}`;
};

const generatePassword = () => {
    return crypto.randomBytes(6).toString("hex");
};

module.exports = {
    generateDoctorId,
    generateUsername,
    generatePassword,
};
</file>

<file path="src/controller/AdminCotroller/adminController.js">

</file>

<file path="src/controller/AdminCotroller/DoctorApplicationAdminController.js">
const DoctorApplication = require("../../models/ApplicationModels/DoctorModels/DoctorApplication");
const Doctor = require("../../models/ApplicationModels/DoctorModels/Doctor");
const bcrypt = require("bcryptjs");
const { generateUsername, generateDoctorId, generatePassword } = require("../../config/doctorCredentials");

const getDoctorApplications = async (req, res) => {
    try {
        const applications = await DoctorApplication.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Doctor applications fetched successfully",
            applications,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch doctor applications",
            error: error.message,
        });
    }
};


const approveDoctorApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await DoctorApplication.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Doctor application not found",
            });
        }

        if (application.status !== "pending") {
            return res.status(400).json({
                message: "This application has already been processed",
            });
        }

        const username = generateUsername(application.fullName);
        const doctorId = generateDoctorId();
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = await Doctor.create({
            fullName: application.fullName,
            email: application.email,
            phoneNumber: application.phoneNumber,

            // temporary values for now
            username: username,
            doctorId: doctorId,
            password: hashedPassword,

            yearsOfExperience: application.yearsOfExperience,
            specialization: application.specialization,
            currentlyWorkingAt: application.currentlyWorkingAt,
            degree: application.degree,
            credentialDocument: application.credentialDocument,
        });

        application.status = "approved";
        await application.save();

        res.status(201).json({
            message: "Doctor application approved successfully",
            Credentials:{
                Username:username , 
                DoctorId:doctorId , 
                password:password
            },
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to approve doctor application",
            error: error.message,
        });
    }
};

module.exports = {
    getDoctorApplications,
    approveDoctorApplication,
};
</file>

<file path="src/controller/ApplicationController/DoctorsController/DoctorApplicationController.js">
const DoctorApplication = require("../../../models/ApplicationModels/DoctorModels/DoctorApplication");

const submitDoctorApplication = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            yearsOfExperience,
            specialization,
            currentlyWorkingAt,
            degree,
        } = req.body;

        const credentialDocument = req.file
            ? req.file.path
            : null;

        const doctorApplication = await DoctorApplication.create({
            fullName,
            email,
            phoneNumber,
            yearsOfExperience,
            specialization,
            currentlyWorkingAt,
            degree,
            credentialDocument,
        });

        res.status(201).json({
            message: "Doctor application submitted successfully",
            application: doctorApplication,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to submit doctor application",
            error: error.message,
        });
    }
};

module.exports = {
    submitDoctorApplication,
};
</file>

<file path="src/controller/ApplicationController/DoctorsController/DoctorAuthController.js">
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");


const doctorLogin = async (req, res) => {
    try {
        const { username, doctorId, password } = req.body;

        if (!username || !doctorId || !password) {
            return res.status(400).json({
                message: "Username, Doctor ID and password are required",
            });
        }

        const doctor = await Doctor.findOne({
            username,
            doctorId,
        });

        if (!doctor) {
            return res.status(401).json({
                message: "Invalid username or Doctor ID",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            doctor.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                doctorId: doctor._id,
                role: "doctor",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Doctor login successful",
            token,
            doctor: {
                id: doctor._id,
                fullName: doctor.fullName,
                username: doctor.username,
                doctorId: doctor.doctorId,
                specialization: doctor.specialization,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Doctor login failed",
            error: error.message,
        });
    }
};

module.exports = {
    doctorLogin,
};
</file>

<file path="src/controller/ApplicationController/DoctorsController/DoctorProfileController.js">
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");

const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.doctor.doctorId)
            .select("-password");

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor profile not found",
            });
        }

        res.status(200).json({
            message: "Doctor profile fetched successfully",
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch doctor profile",
            error: error.message,
        });
    }
};

module.exports = {
    getDoctorProfile,
};
</file>

<file path="src/controller/ApplicationController/UsersController/userController.js">

</file>

<file path="src/middleware/doctorAuthMiddleware.js">
const jwt = require("jsonwebtoken");

const doctorAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid authorization format",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "doctor") {
            return res.status(403).json({
                message: "Doctor access required",
            });
        }

        req.doctor = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = doctorAuthMiddleware;
</file>

<file path="src/middleware/midlleware.js">

</file>

<file path="src/models/AdminModels/Admin.js">
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }  

 } , 
    {
        timestamps: true
    }

);


const Admin = mongoose.model('Admin', adminSchema); 
module.exports = Admin;
</file>

<file path="src/models/AdminModels/adminModels.js">

</file>

<file path="src/models/ApplicationModels/DoctorModels/Doctor.js">
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        doctorId: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        yearsOfExperience: {
            type: Number,
            required: true,
        },

        specialization: {
            type: String,
            required: true,
        },

        currentlyWorkingAt: {
            type: String,
            required: true,
        },

        degree: {
            type: String,
            required: true,
        },

        credentialDocument: {
            type: String,
            required: true,
        },

        consultationFee: {
            type: Number,
            default: 0,
        },

        professionalBio: {
            type: String,
            default: "",
        },

        consultationAddress: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
</file>

<file path="src/models/ApplicationModels/DoctorModels/DoctorApplication.js">
const mongoose = require("mongoose");

const doctorApplicationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        yearsOfExperience: {
            type: Number,
            required: true,
        },

        specialization: {
            type: String,
            required: true,
        },

        currentlyWorkingAt: {
            type: String,
            required: true,
        },

        degree: {
            type: String,
            required: true,
        },

        credentialDocument: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const DoctorApplication = mongoose.model(
    "DoctorApplication",
    doctorApplicationSchema
);

module.exports = DoctorApplication;
</file>

<file path="src/models/ApplicationModels/PatientModels/PatientModels.js">

</file>

<file path="src/routes/AdminRoutes/adminRoutes.js">

</file>

<file path="src/routes/AdminRoutes/DoctorApplicationAdminRoutes.js">
const { getDoctorApplications, approveDoctorApplication } = require("../../controller/AdminCotroller/DoctorApplicationAdminController");
const express = require("express");

const DoctorApplicationAdminRouter = express.Router();

DoctorApplicationAdminRouter.get(
    "/applications",
    getDoctorApplications
);
DoctorApplicationAdminRouter.patch(
    "/applications/:applicationId/approve" , 
    approveDoctorApplication
)


module.exports = DoctorApplicationAdminRouter;
</file>

<file path="src/routes/ApplicationRoutes/DoctorsRoutes/DoctorApplicationRoutes.js">
const express = require("express");
const { submitDoctorApplication } = require("../../../controller/ApplicationController/DoctorsController/DoctorApplicationController");
const upload = require("../../../middleware/uploadMiddleware");
const { doctorLogin } = require("../../../controller/ApplicationController/DoctorsController/DoctorAuthController");
const doctorAuthMiddleware = require("../../../middleware/doctorAuthMiddleware");
const { getDoctorProfile } = require("../../../controller/ApplicationController/DoctorsController/DoctorProfileController");

const DoctorApplicationRouter = express.Router();

DoctorApplicationRouter.post("/apply", upload.single("credentialDocument"), submitDoctorApplication);
DoctorApplicationRouter.post("/login", doctorLogin);

// DoctorApplicationRouter.get("/profile-test", doctorAuthMiddleware, (req, res) => {
//     res.status(200).json({
//         message: "Doctor authentication successful",
//         doctor: req.doctor,
//     });
// }); Testing the middleware using a temporary route and a temporary controller

DoctorApplicationRouter.get(
    "/profile",
    doctorAuthMiddleware,
    getDoctorProfile
);


module.exports = DoctorApplicationRouter;
</file>

<file path="src/routes/ApplicationRoutes/DoctorsRoutes/doctorRoutes.js">

</file>

<file path="src/routes/ApplicationRoutes/UsersRoutes/userRoutes.js">

</file>

<file path="src/routes/app.js">
const express = require("express");

const DoctorApplicationRouter = require("./ApplicationRoutes/DoctorsRoutes/DoctorApplicationRoutes");
const DoctorApplicationAdminRouter = require("./AdminRoutes/DoctorApplicationAdminRoutes");

const DoctorRouter = express.Router();
const AdminRouter = express.Router();


// All Doctor Routes -->
DoctorRouter.use("/doctorApplication", DoctorApplicationRouter); // catching All doctor routes related to doctor application


// All Admin Routes -->
AdminRouter.use("/AdmindoctorApplication", DoctorApplicationAdminRouter); // catching all admin routes related to doctor applications 

// All Patient Routes --> 



module.exports = {
    DoctorRouter,
    AdminRouter
};
</file>

<file path="src/folderGuide.md">
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
</file>

<file path="src/middleware/uploadMiddleware.js">
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "doctor_credentials",
        allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
</file>

<file path=".gitignore">
# Dependencies
node_modules/

# Environment variables
.env

uploads/
</file>

<file path="index.js">
const express = require("express") ; 
const app = express() ; 
require("dotenv").config()
const db = require("./src/config/db_config");
const { DoctorRouter, AdminRouter } = require("./src/routes/app");
const { submitDoctorApplication } = require("./src/controller/ApplicationController/DoctorsController/DoctorApplicationController");
const upload = require("./src/middleware/uploadMiddleware");

db() ; 



console.log(process.env.PORT) ; 

app.use(express.json());


app.use("/doctor" , DoctorRouter) ; // catching all routes related to doctor 
app.use("/admin", AdminRouter); // catching all routes related to admin

// app.use("/doctor/doctorApplication/apply",upload.single("credentialDocument") ,  submitDoctorApplication);
app.get("/ping", (req, res) => {
    res.status(200).json({ status: "Server is alive!" });
});

app.listen(process.env.PORT,()=>{
    console.log(`server runs on ${process.env.PORT}`)
})
</file>

<file path="package.json">
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cloudinary": "^2.11.0",
    "cors": "^2.8.6",
    "dotenv": "^18.0.5",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.10.4",
    "multer": "^2.4.0",
    "multer-storage-cloudinary": "^4.0.0"
  }
}
</file>

</files>
