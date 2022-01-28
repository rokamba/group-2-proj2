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

//THIS ROUTE WORKS!!!
    Post.create({
      caption: req.body.caption,
      upload: req.file.filename,
      filename: req.file.fieldname,
      filepath: req.file.filepath,
      mimetype: req.file.mimetype,
      size: req.file.size,
    })
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  });

//THIS ROUTE returns the image but does not return the caption!!!!
// get single post
router.get('/:filename', (req, res) => {
  const {filename} = req.params;
  let reqPath = path.join(__dirname, '../..','uploads/' + filename);
  
  Post.findOne({
    where: {
    upload: filename,
    },
  })
  .then(res.sendFile(reqPath))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//THIS ROUTE DOES NOT WORK YET... need to figure out how to GET multiple images.
// get all posts
router.get('/', (req, res) => {
  let reqPath = path.join(__dirname, '../..','uploads/');

  Post.findAll({
  })
  .then(res.sendFile(reqPath))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
    
});



  module.exports = router;