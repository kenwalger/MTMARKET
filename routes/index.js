var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');


// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render('profile', { title: 'Profile', name: user.name, organization:
          user.organization });
        }
      });
});

// Creating product orders
router.post('/profile', function(req, res, next) {
     User.find({}, null, function(err, users){
      if (err){
        var err = new Error("Man");
        next(err);
      } else {
          users.products.$push(req.body.title, req.body.cost, req.body.location, req.body.description);
          users.save(function(err) {
          if (err){
            next(err);
          }
          return res.redirect('/about');
        })
        };
      });
      });


// Route for created product record
router.get('/profile/product', function(req, res, next) {
    return res.send('product');
});

// Route for editing a specific product record
router.put('/profile/product/:id', function(req, res, next) {
    return res.send('Editing Product');
});

// Route for deleting a specific route
router.delete('/profile/product/:id', function(req, res, next) {
    return res.send('Deleting Route');
});


//GET all profiles for buyer views
router.get('/users', function(req, res, next) {
    return res.send('Shuck and Jive');
});

// GET specific profile for buyer views
router.get('/profile/:id', function(req, res, next) {
    return res.send(req.params.id);
  });

// GET all orders for buyer views
// GET specific product for buy view



// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
});
}
});



// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Log In'});
});

// POST /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up'});
});

// POST /register page.
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.organization &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
        }

        // create object with form input
        var userData = {
          email: req.body.email,
          name: req.body.name,
          organization: req.body.organization,
          password: req.body.password
        };

        // use schema's 'create' method to insert document into mongodb
        User.create(userData, function(error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
          }
        });

    } else {
  var err = new Error('All fields required.');
  err.status = 400;
  return next(err);
}
});
/* GET home page. */
router.get('/', function(req, res, next) {
 return res.render('index', { title: 'What about now?' });
});



// POST /register page.

// GET /About page.
router.get('/about', function(req, res, next) {
 return res.render('about', { title: 'What about now?' });
});

// Get /Contact page.





// POST /User Product page.
// GET /User single Product
// PUT /User Single Product.
// DELETE /User Single Product.

// GET /Multiple Profiles page.
// GET Single Profile page.

// GET /Multiple products page.
// GET /Single product.

/* ProductSchema.statics.findLocation = function(location, callback) {
          return this.find({location: location}, callback);
        }
        ----
  Products.findLocation("New York", function(err, locations) {
        locations.forEach(function(location) {
          console.log( product.vender + product.location + product.price  );

});

}):;

  ProductSchema.methods.findSamePrice = function (size, callback) {
    //this == Product
        return this.model("Product").find({price: this.price}, callback)
}

  Product.findOne({price: 9000}, function(err, pprice) {
    pprice.findSamePrice(err, prices) {
      if (err) console.error.(err);
      prices.forEach(function(product) {
        console.log( product.vender + product.location + product.price  );


  }

})



*/

module.exports = router;
