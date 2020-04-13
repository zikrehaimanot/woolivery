//Where CRUD is happening. Create, Result, Update, Delete
const Resturant = require("./models/Resturant.js")
module.exports = function(app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  //Result
  app.get('/', function(req, res) {
    //tells us what page to render in the dom
    res.render('index.ejs');
  });
  app.get('/profile', function(req, res) {
    //tells us what page to render in the dom
    res.render('profile.ejs');
  });
  app.get('/generic', isLoggedIn, function(req, res) {
    console.log(req.user);

    //tells us what page to render in the dom
    res.render('generic.ejs',{
      user: req.user
    });
  });
  app.get('/homepage', function(req, res) {
    //tells us what page to render in the dom
    res.render('homepage.ejs');
  });
  app.get('/driver', function(req, res) {
    //tells us what page to render in the dom
    res.render('driver.ejs');
  });
  app.get('/resturant', function(req, res) {
    //tells us what page to render in the dom
    res.render('resturant.ejs');
  });
  app.get('/landing', function(req, res) {
    //tells us what page to render in the dom
    res.render('landing.ejs');
  });
  app.get('/order', function(req, res) {
    //tells us what page to render in the dom
    res.render('order.ejs');
  });
  app.get('/orderNow', function(req, res) {
    //tells us what page to render in the dom
    res.render('orderNow.ejs');
  });
  app.get('/landing', function(req, res) {
    //tells us what page to render in the dom
    res.render('landing.ejs');
  });
  app.get('/customer', function(req, res) {
    //tells us what page to render in the dom
    res.render('customer.ejs');
  });

  app.get('/driverLogin', function(req, res) {
    //tells us what page to render in the dom
    res.render('driverLogin.ejs');
  });
  app.get('/driverSignUp', function(req, res) {
    res.render('driverSignUp.ejs');

  });
  app.get('/driverLogin', function(req, res) {
    res.render('driverLogin.ejs');
  });
//   app.get('/', (req, res) => {
//   //console.log(db)
//   db.collection('messages').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     res.render('index.ejs', {messages: result})
//   })
// })


  app.get('/resturantPartner', function(req, res) {
   db.collection('resturants').find().toArray((err, result) => {
     if (err) return console.log(err)
     res.render('resturantPartner.ejs',{results: result});
  });
});



  app.get('/resturantSignUp', isLoggedIn, function(req, res) {
    res.render('resturantSignUp.ejs', {
        user : req.user
    });
  });
  app.get('/resturantLogin', function(req, res) {
    res.render('resturantLogin.ejs');
  });
  app.get('/customerLogin', function(req, res) {
    res.render('customerLogin.ejs');
  });
  app.get('/customerSignUp', function(req, res) {
    res.render('customerSignUp.ejs');
  });
    // PROFILE SECTION =========================
    app.get('/reviews',function(req, res) {
      //get request grabs profile function
      // routes js line 14-19 is our request. GET is what we use to achieve this
        db.collection('orders').find().toArray((err, result) => {
          //reuest to grabbatabase collection named message,into array
          if (err) return console.log(err)
          //conditional console logged for error
          res.render('reviews.ejs', {
            user: req.user,
            orders: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/resturantPost', (req, res) => {
       console.log(req.body);
      const newResturant = new Resturant({
        resturantName: req.body.resturantName,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode,
        ein : req.body.ein,
        payPal : req.body.payPal,
        menu: req.body.menu,
        prices: req.body.prices,
        createdBy : req.user._id
     })
     newResturant.save()
     .then(resturant => {
       console.log(resturant)

     })

    // (err, result) => {
    //     if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/resturantSignUp')
      // }
  })

    app.put('/orders', (req, res) => {
      db.collection('orders')
      .findOneAndUpdate({name: req.body.name, email: req.body.email, review:req.body.review}, {
        $set: {
          // name:req.body.name,
          // email: req.body.email,
          review:req.body.review
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    // app.put('/orders', (req, res) => {
    //   db.collection('orders')
    //   .findOneAndUpdate({name: req.body.name, email: req.body.email, review:req.body.review}, {
    //     $set: {
    //       thumbUp:req.body.thumbUp - 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    app.delete('/orders', (req, res) => {
      //deletemethod:Deletes a single document based on the filter and sort criteria, returning the deleted document https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
      db.collection('orders').findOneAndDelete({name: req.body.name, email: req.body.email, review: req.body.review}, (err, result) => {//looks at messages collection,s finds and deletes.
        if (err) return res.send(500, err)//if error, send error
        res.send('Message deleted!')
      })
    })

//Authenticates the user and makes sure user is logged in and only on their account  =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/generic', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/generic', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
