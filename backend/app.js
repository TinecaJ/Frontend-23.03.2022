//This will consist of all the server side code
const createError = require('http-errors');
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require('crypto');
var cors = require('cors')
const expressValidator = require('express-validator')
const session = require('express-session')

 



//Routes
const pcPartsRoutes = require("./routes/pc-parts");
const imageRoutes = require("./routes/image");
const contextsRoutes = require("./routes/contexts");
const improvementsRoutes = require("./routes/improvements");
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const rolesRoutes = require('./routes/roles');
const supportRoutes = require('./routes/support');
const riskdRoutes = require('./routes/riskd');
const riskCRoutes = require('./routes/riskC');
const riskARoutes = require('./routes/riskA');
const policiesRoutes = require('./routes/policies');
const operationsRoutes = require('./routes/operations');
const objectivesRoutes = require('./routes/objectives');
const internalsRoutes = require('./routes/internals');
const RRsRoutes = require('./routes/RRs');
const PEsRoutes = require('./routes/PEs');
const LCsRoutes = require('./routes/LCs');
const organizationsRoutes = require('./routes/organizations');
const controlsRoutes = require('./routes/controls');const { Session } = require('express-session');
;




const app = express();

const dbConnectionString = "mongodb://localhost:27017/ISMS";
mongoose
    .connect(dbConnectionString)
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log("Connection failed: " + err);
    });

app.use(bodyparser.json());
/*app.use(bodyparser.raw({
    type: 'image/png'
  }));*/
  
app.use(bodyparser.urlencoded({extended: false}));

app.use(expressValidator());
app.use(session({secret:'max', saveUninitialized:false, resave: false}));



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token, x-refresh-token, _id"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );

    res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

    next();
});

app.use(cors()) //

/*
//STORAGE SETUP


// DB
const mongoURI = "mongodb://localhost:27017/ISMS";

// connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});
// Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });

app.get('/check', function(req, res, next) {
    res.send('images route sucessful');
  });

app.post("/upload", upload.single("file"), (req, res) => {
   res.json({file : req.file})
    res.redirect("/");
  });

  app.get("/image/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  });
*/
// Problem app.use("api/pcparts",pcPartsRoutes);
app.use("/api/pcparts",pcPartsRoutes);
app.use("/api/contexts",contextsRoutes);
app.use("/api/improvements",improvementsRoutes);
app.use('/', indexRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/riskd', riskdRoutes);
app.use('/api/riskC', riskCRoutes);
app.use('/api/riskA', riskARoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/operations', operationsRoutes);
app.use('/api/objectives', objectivesRoutes);
app.use('/api/internals', internalsRoutes);
app.use('/api/RRs', RRsRoutes);
app.use('/api/PEs', PEsRoutes);
app.use('/api/LCs', LCsRoutes);
app.use('/api/organizations', organizationsRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/controls', controlsRoutes);





module.exports = app;



//sources: https://dev.to/shubhambattoo/uploading-files-to-mongodb-with-gridfs-and-multer-using-nodejs-5aed