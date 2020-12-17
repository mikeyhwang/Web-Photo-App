const express = require('express');
const router = express.Router();
const db = require('../config/database');


router.get('/getALLPosts', (req, res, next) =>{
    db.query('SELECT * from posts;', (err, results, fields) => {
        console.log(results);
        res.send(results);
    });
});

router.get('/getALLPostsP', (req, res, next) =>{
    db.query('SELECT * from posts;').then(([results, fields]) => {
        console.log(results);
        res.send(results);
        //return db.query('SELECT * FROM posts WHERE id=1');
    })
});

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    /*validate data, if bad send response
    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
        db.query(baseSQL, [username, email, password]).then(([results, fields]) => {
            if (results && results.affectedRows) {
                res.send('user was made');
            } else {
                res.send('user was not made');
            }
        })*/
    })
module.exports = router;