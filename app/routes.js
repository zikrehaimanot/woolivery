//Where CRUD is happening. Create, Result, Update, Delete
const Resturant = require("./models/Resturant.js")
module.exports = function(app, passport, db, ObjectId,nexmo) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  //Result
  app.get('/', function(req, res) {
    //tells us what page to render in the dom
    res.render('index.ejs');
  });
  app.get('/generic', isLoggedIn, function(req, res) {
    //tells us what page to render in the dom
    res.render('generic.ejs',{
      user: req.user
    });
  });

  app.get('/homepage', function(req, res) {
    //tells us what page to render in the dom
    res.render('homepage.ejs');
  });


  app.get('/order', isLoggedIn, function(req, res) {
    var resId = req.session.passport.user

    db.collection('resturants').find({
      "createdBy": resId
    }).toArray((err, resturants) => {

      db.collection('orders').find({
        "resId": resturants[0].createdBy

      }).toArray((err, orders) => {

        if (err) return console.log(err)
        res.render('order.ejs', {
          resturants: resturants,
          orders: orders
        })
      })
    })
  });


  app.get('/orderStatus/:orderId',  isLoggedIn, function(req, res) {
    var orderId = ObjectId(req.params.orderId)
    db.collection('orders').find({
      "_id": orderId
    }).toArray((err, orders) => {
      if (err) return console.log(err)
      // console.log(orders[0]);
      res.render('orderStatus.ejs', {
        orders: orders[0]

      })
    })
  });

  app.post('/tipPost/:orderId', isLoggedIn, function(req,res){
    var orderId = ObjectId(req.params.orderId)
    var tip = req.body.tip
    console.log(tip);
    db.collection('orders').findOneAndUpdate({
      "_id": orderId
    }, {
      $set: {
        tip: tip
      }
    }, {
      upsert: false
    }, (err, result) => {
      if (err) return res.send(err)

      res.redirect(`/orderStatus/${req.params.orderId}`)
    })
  })



  //
  // db.collection('orders')
  // .findOneAndUpdate({
  //   _id: orderId
  // }, {
  //   $set: {
  //     accepted: true
  //   }
  // }, {
  //   sort: {
  //     _id: -1,
  //   },
  //   upsert: false
  // }, (err, result) => {
  //   if (err) return res.send(err)
  //
  // })



  app.get('/orderNow',isLoggedIn, function(req, res) {
    db.collection('resturants').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('orderNow.ejs',{results: result,  user: req.user});

    });
  });

  app.get('/driverOrder',isLoggedIn, function(req, res) {
    db.collection('orders').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('driverOrder.ejs',{orders: result,  user: req.user});

    });
  });

  app.get('/myDriverOrders',isLoggedIn, function(req, res) {
    db.collection('orders').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('myDriverOrders.ejs',{orders: result,  user: req.user});

    });
  });

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

  app.get('/orderConfirmation', isLoggedIn, function(req, res) {
    var user = ObjectId(req.session.passport.user)

    // console.log(user);
    db.collection('users').find({
      "_id": user

    })
    .toArray((err, userResult) => {
       console.log(userResult);
       var customerId = `${userResult[0]._id}`
       console.log(customerId);
       db.collection('orders').find({
        "customer": customerId
      }).toArray((err, orderResult) => {
         console.log(orderResult);
        if (err) return console.log(err)
        res.render('orderConfirmation.ejs', {
          user: userResult[0],
          orders: orderResult
        })
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // POST RESTURANT LISTING
  app.post('/resturantPost', (req, res) => {
    console.log(req.body);
    let newItems = []
    for (let i = 0; i < req.body.menu.length; i++) {
      let newItem = { itemName: req.body.menu[i], price: req.body.prices[i] };
      newItems.push(newItem);
    }
    const newResturant = new Resturant({
      resturantName: req.body.resturantName,
      phoneNumber: req.body.phoneNumber,
      street: req.body.street,
      city : req.body.city,
      state : req.body.state,
      zipcode : req.body.zipcode,
      ein : req.body.ein,
      payPal : req.body.payPal,
      menu: newItems,
      createdBy : req.user._id
    })
    newResturant.save()
    .then(resturant => {
    })
    // (err, result) => {
    //     if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/resturantSignUp')
    // }
  })

  // CUSTOMER ORDER CHECKOUT
  app.post('/checkout', (req, res) => {
    db.collection('orders').save({
      resId: req.body.resId,
      orderedItem: req.body.orderedItem,
      totalPrice: req.body.totalPrice,
      customer: req.body.customer,
      accepted:req.body.accepted,
      completed:req.body.completed,
      delivered: req.body.delivered,
      pickedUp : req.body.pickedUp,
      driverId : req.body.driverId,
      driverAccepted : req.body.driverAccepted,
      reason : "",
      tip : "",
    },(err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.send({err: 0, redirectUrl: "/orderConfirmation"});
    })

  })
  // RESTURANT ORDER ACCEPTED
  app.put('/acceptedOrder', isLoggedIn, function(req, res) {
    var orderId = ObjectId(req.body.orderId.trim());
    var customerId = ObjectId(req.body.customerId.trim());
    var resName = req.body.resName
    var customerNumber;

    db.collection('users').find({
      "_id": customerId
    }).toArray((err, customer) => {
      if (err) return console.log(err)
      // console.log(customer);
      customerNumber = '1' + customer[0].local.number
      var msg = "Restaurant Working On Order"
      nexmo.message.sendSms(
        '12012750754', customerNumber, msg, {
          type: 'unicode'
        },
        (err, result) => {
          if (err) return console.log(err)
          console.log('sent text')
        })
      })
      db.collection('orders')
      .findOneAndUpdate({
        _id: orderId
      }, {
        $set: {
          accepted: true
        }
      }, {
        sort: {
          _id: -1,
        },
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)

      })
    });

    // RESTURANT COMPLETE ORDER


    app.put('/completeOrder', isLoggedIn, function(req, res) {
      var orderId = ObjectId(req.body.orderId.trim());
      var customerId = ObjectId(req.body.customerId.trim());
      var resName = req.body.resName
      var customerNumber;

      db.collection('users').find({
        "_id": customerId
      }).toArray((err, customer) => {
        console.log(err, customer);
        if (err) return console.log(err)
        console.log(customer);
        customerNumber = '1' + customer[0].local.number
        var msg = "Your Order Is Completed"
        nexmo.message.sendSms(
          '12012750754', customerNumber, msg, {
            type: 'unicode'
          },
          (err, result) => {
            if (err) return console.log(err)
            console.log('sent text')
          })
        })

        db.collection('orders')
        .findOneAndUpdate({
          _id: orderId
        }, {
          $set: {
            completed: true
          }
        }, {
          sort: {
            _id: -1,
          },
          upsert: false
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
      });

      // RESTURANT ORDER DECLINED

      app.delete('/declineOrder', isLoggedIn, function(req, res) {
        var orderId = ObjectId(req.body.orderId.trim());
        var customerId = ObjectId(req.body.customerId.trim());
        // var resName = req.body.resName
        var customerNumber = "16176157263"
        // var customerName = "Z"
        db.collection('users').find({
          "_id": customerId
        }).toArray((err, customer) => {
          if (err) return console.log(err)
          // console.log(customer);
          customerNumber = '1' + customer[0].local.number
          customerName = customer[0].local.email
          // console.log(customerName, customerNumber);
          var msg = "The Resturant Declined Your Order"
          nexmo.message.sendSms(
            '12012750754', customerNumber, msg, {
              type: 'unicode'
            },
            (err, result) => {
              if (err) return console.log(err)
              console.log('sent text')
            })

          })
          // console.log(req.body.orderId)
          // console.log(req.body.resId, req.body.orderedItem,req.body.totalPrice,req.body.customerId, req.body.accepted, req.body.completed, req.body.delivered, req.body.orderId)
          db.collection('orders')
          .findOneAndDelete({_id:orderId}, (err, result) => {
            if (err) return res.send(500, err)
            res.send('Message deleted!')
          })
        });

        // DRIVER ORDER ACCEPTED

        app.put('/acceptedOrderDriver', isLoggedIn, function(req, res) {
          var orderId = ObjectId(req.body.orderId);
          var driverId = req.body.driverId;
          // var customerId = ObjectId(req.body.customerId.trim());
          // var resName = req.body.resName
          // var customerNumber = "16176157263"
          // var customerName = "Z"

          // db.collection('users').find({
          //   "_id": customerId
          // }).toArray((err, customer) => {
          //   if (err) return console.log(err)
          //   // console.log(customer);
          //   customerNumber = '1' + customer[0].local.number
          //   customerName = customer[0].local.email
          //   console.log(customerName, customerNumber);
          //   var msg = "Your Order Is About To Be Picked Up"
          //   nexmo.message.sendSms(
          //      '12012750754', customerNumber, msg, {
          //       type: 'unicode'
          //     },
          //     (err, result) => {
          //       if (err) return console.log(err)
          //       console.log('sent text')
          //     })
          //   })
          db.collection('orders')
          .findOneAndUpdate({
            _id: orderId
          }, {
            $set: {
              driverAccepted: true,
              driverId : driverId
            }
          }, {
            sort: {
              _id: -1,
            },
            upsert: false
          }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
          })
        });

        // DRIVER PICKED UP FOOD

        app.put('/pickedUp', isLoggedIn, function(req, res) {
            var orderId = ObjectId(req.body.orderId.trim());
            var customerId = ObjectId(req.body.customerId.trim());
            var reason = req.body.reason
            var driverId = ObjectId(req.body.driverId)
            // var userQuery = db.collection('users').find({
            //   "_id": customerId
            // });
            // userQuery.toArray((err, customer) => {
            //   if (err) return console.log(err)
            //   // console.log(customer);
            //   customerNumber = '1' + customer[0].local.number
            //   var msg = "Your Driver Has Your Food, Tip Well Please"
            //   nexmo.message.sendSms(
            //     '12012750754', customerNumber, msg, {
            //       type: 'unicode'
            //     },
            //     (err, result) => {
            //       if (err) return console.log(err)
            //       console.log('sent text')
            //     })
            //   })
              console.log(reason);
              db.collection('users')
              .findOneAndUpdate({
                _id: driverId
              },{
                $set:{
                  reason : reason
                }
              }, (err, result) => {
                console.log(reason);
                // console.log("gothere1");
                if (err) return res.send(err)
                // console.log("gothere2");
                db.collection('orders')
                .findOneAndUpdate({
                  _id: orderId
                }, {
                    $set: {
                      pickedUp: true,
                      reason: reason
                    }
                  }, {
                    sort: {
                      _id: -1,
                    },
                    upsert: false
                  }, (err, result) => {
                    // console.log("gothere3");
                    if (err) return res.send(err)
                    // console.log("gothere4");
                    res.send(result)
                  })
                })
            })


            app.put('/delivered', isLoggedIn, function(req, res) {
              var orderId = ObjectId(req.body.orderId.trim());
              var customerId = ObjectId(req.body.customerId.trim());
              var customerNumber;

              db.collection('users').find({
                "_id": customerId
              }).toArray((err, customer) => {
                if (err) return console.log(err)
                // console.log(customer);
                customerNumber = '1' + customer[0].local.number
                var msg = "Your Driver Is Outside"
                nexmo.message.sendSms(
                  '12012750754', customerNumber, msg, {
                    type: 'unicode'
                  },
                  (err, result) => {
                    if (err) return console.log(err)
                    console.log('sent text')
                  })
                })
                db.collection('orders')
                .findOneAndUpdate({
                  _id: orderId
                }, {
                  $set: {
                    delivered: true
                  }
                }, {
                  sort: {
                    _id: -1,
                  },
                  upsert: false
                }, (err, result) => {
                  if (err) return res.send(err)
                  res.send(result)
                })
              });


              // app.delete('/orders', (req, res) => {
              //   //deletemethod:Deletes a single document based on the filter and sort criteria, returning the deleted document https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
              //   db.collection('orders').findOneAndDelete({name: req.body.name, email: req.body.email, review: req.body.review}, (err, result) => {//looks at messages collection,s finds and deletes.
              //     if (err) return res.send(500, err)//if error, send error
              //     res.send('Message deleted!')
              //   })
              // })

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
