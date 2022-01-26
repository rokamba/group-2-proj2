const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');
const upload = require('././')

// //Get all posts
// router.get('/', (req, res) => {
//     console.log('======================');
//     Post.findAll({
//       attributes: [
//         'id',
//         'post_url',
//         'title',
//         'created_at',
//         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// //get single post by id

// router.get('/:id', (req, res) => {
//     Post.findOne({
//       where: {
//         id: req.params.id
//       },
//       attributes: [
//         'id',
//         'post_url',
//         'title',
//         'created_at',
//         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

//   // new post
//   router.post('/', withAuth, upload.single('image'), (req, res) => {
//     Post.create({
//       title: req.body.title,
//       post_url: req.body.post_url,
//       user_id: req.session.user_id
//     })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// //update post
//   router.put('/:id', withAuth, (req, res) => {
//     Post.update(
//       {
//         title: req.body.title
//       },
//       {
//         where: {
//           id: req.params.id
//         }
//       }
//     )
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });
  

//   //delete post
//   router.delete('/:id', withAuth, (req, res) => {
//     console.log('id', req.params.id);
//     Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

  module.exports = router;