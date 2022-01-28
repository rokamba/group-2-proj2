const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const fs = require('fs');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file.', file.path);
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage });

// // get route 
// router.get('/images', (req, res) => {
//  Post.findAll().then(Posts => res.send(Posts));

//   Post.find({}, ['upload', 'caption'], { sort: { _id: -1 } }, (err, data) => {
//     console.log(data);
//     res.render('files', { file: data });
//   });

// });


// new post

router.post('/image', upload.single('upload'), (req, res, next) => {

  console.log('here is my request body', req.body);
  let reqPath = path.join(__dirname, '../..', 'uploads/' + req.file.filename);
  console.log(reqPath);

  Post.create({
    caption: req.body.caption,
    upload: req.file.filename,
  })
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)

});


//   // store image in database
//   var imageName = req.file.originalname;
//   var inputValues = {
//       image_name: imageName
//   }
// // call model
// imageModel.storeImage(inputValues, function(data){
//   res.render('upload-form',{alertMsg:data})
// })

module.exports = router;