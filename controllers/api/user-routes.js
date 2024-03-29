const router = require('express').Router();
const User = require('../../models/User');

// GET route /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST route /api/users
router.post('/', (req, res) => {
    // expects {username: 'test', email: 'test@test.com', password: 'test123'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
       // req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.status(200).json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login route
router.post('/login', (req, res) => {
    console.log("login route is being hit")
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(dbUserData => {
        console.log("here is the .then data", dbUserData);
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
    
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
    
        req.session.save(() => {
          // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
    })
    .catch (
        err => {
            console.error(err);
        }
    )
});

// logout route
router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
            res.status(204).end();
            });
        }
        else {
            res.status(404).end();
        }
    });

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'test', email: 'test@test.com', password: 'test123'}
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;