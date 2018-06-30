//module.exports = function(app) {
  //const db = client.db('postman_crud');
  const mongoose = require('mongoose');
  const passport = require('passport');
  const router = require('express').Router();
  const ObjectID = require('mongodb').ObjectID;  
  const User = require('./user');

  // Home
  router.get('/', (req, res)=>{
    res.send('Home.');
  });

  // LIST 
  router.get('/users/', (req, res) => {
    User.find().then(
        item => {
            res.send(item);
            console.log(item);
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  });  
  
  // CREATE
  router.post('/users/', (req, res, next) => {
    var newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        Id: req.body.Id,
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email
    });
    newUser.save().then(
        () => {
            res.send(newUser);
            console.log(newUser + ' is saved.');
        },
        err => {
            console.log(err.message);
            //res.send(err);
            next(err);
        }
    );
  });

  // READ 
  /* router.get('/users/:id', (req, res) => {
    var id = req.params.id;
    User.findById(id).then(
        item => {
            res.send(item);
            console.log(item + ' has been readed.');
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  }); */

  // UPDATE 
  router.put ('/users/:id', (req, res, next) => {
    var id = req.params.id;
    var details = {'Id': id};
    //User.findByIdAndUpdate(id, req.body).then(
    User.findOneAndUpdate(details, req.body).then(    
        () => {
            //res.send(id + JSON.stringify(req.body));
            res.end();
            console.log(id + ' ' + JSON.stringify(req.body) + ' has been updated.');
        },
        err => {
            console.log(err.message);
            //res.send(err);
            next(err);
        }
    );    
  });
  
// DELETE 
router.delete('/users/:id', (req, res) => {
    var id = req.params.id;
   // var details = {'_id': new ObjectID(id)};
   var details = {'Id': id};
    User.remove(details).then(
        () => {
            //res.send(id + ' has been deleted.');
            res.end();
            console.log(id + ' has been deleted.');
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  });

    // auth login
    router.get('/users/login', (req, res) => {
        console.log('logging in');
        res.send({"msg": "logging in"});
    });

    // auth logout
    router.get('/users/logout', (req, res) => {
        // handle with passport
        console.log('logging out');
        res.send({"msg": "logging out"});
    });

    // auth with google+
    router.get('/users/google', passport.authenticate('google', {
        scope: ['profile']
    }));

    // callback route for google to redirect to
    router.get('/users/google/redirect', (req, res) => {
        console.log('you reached the redirect URI');
        res.send({"msg": "you reached the redirect URI"});
    });

//};
module.exports = router;