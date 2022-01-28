const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file.',file.path);
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage}); 
  // new post
  router.post('/', upload.single('upload'), (req, res, next) => {

    console.log('here is my request body',req.body);
    let reqPath = path.join(__dirname, '../..','uploads/' + req.file.filename);
    console.log("this is the file path we are looking for the image in",reqPath);


    Post.create({
//upadate this sequelize create so that it doesn't add the data, but adds the image name.
//Then the route will cross reference that image name in the uplaods folder
      caption: req.body.caption,
      upload: fs.readFileSync (reqPath),
    })
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
  
  });


// get all users
router.get('/', (req, res) => {
  console.log('======================');

  Post.findAll({
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});



  module.exports = router;