const express = require('express');

const router = express.Router();
const multer = require('multer');
const Picture = require('../models/Picture');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/map', (req, res, next) => {
  res.render('map')
  
});

router.get('/', (req, res, next) => {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});

router.post('/upload', uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  const pic = new Picture({
    name: req.body.pictureName,
    path: imgPath,
    originalName: imgName,
  });

  pic.save((err) =>{
    res.redirect('/');
  });
});

module.exports = router;

// const upload = multer({ dest: './public/uploads/' });

// router.post('/upload', upload.single('photo'), (req, res) => {

//   const pic = new Picture({
//     name: req.body.name,
//     path: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname,
//   });

//   pic.save((err) => {
//     res.redirect('/');
//   });
// });

