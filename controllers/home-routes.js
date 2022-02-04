const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User} = require('../models');
const withAuth = require('../utils/auth')

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        include: [{
            model: User,
            required: false
           }],
            // Add order conditions here....
        order: [
          ['created_at', 'DESC'],
        ],
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
  
        res.render('newsfeed', {
          posts,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //render login screen

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
res.render('login', );
});

router.get('/post', (req, res) => {
    res.render('post', );
    });

module.exports = router;
