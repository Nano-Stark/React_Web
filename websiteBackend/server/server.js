// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
const {host, environ, hot} = require('./config');

const { Role } = require('loopback');
const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

//console.log(`HOST IS ${host}`);
console.log(`HOT IS ${hot}`);
console.log(`ENV IS ${environ}`);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

console.log(Object.keys(app.models));

//logging in user
app.models.user.find((err, result) => {
  if (result.length === 0){
    const user = {
      email: 'star@gmail.com',
      password: 'star',
      username: 'star'
    };

    app.models.user.create(user, (err, result ) => {
      console.log("Tried to create user", err, result);
    })
  }
})

//User before subclassing due to model relations to use user (app.models.user)
//remove User after dubclassing from model-config.json

//removed from line 16 in model-config.json due to subclassing of user with User as its base class
/*"User": {
  "dataSource": "db"
},
"AccessToken": {
    "dataSource": "db",
    "public": false
  },


*/
//app.models.user.create('create', (ctx, user, next) => { //this always gets called after a user is created, 
//a corresponding profile is alongside created
app.models.user.afterRemote('create', (ctx, user, next) => { 
  console.log("New user is", user);
  //console.log("New cont is", ctx);//user==ctx.result
  //console.log("New nnext is", next);
  app.models.profile.create({
    firstName: user.username,
    name : user.name,//in videos for creating comments, towards end of tutorial
    role: 'subscriber',//same as name in videos towardd end
    createdAt: new Date(),
    userId: user.id
  }, (err, result) => {
    if (!err && result) {
      console.log("Created new profile", result);
    }
    else {
      console.log('There is an error', err);
    }
 
  });
  next();
});


console.log('JUST CHECKING MY CODE IN SERVER.JS')


//ROLE AND ROLEMAPPING
//creating admin

app.models.Role.find({where: {name: 'admin'}}, (err, role) => {
  if (!err && role){
    console.log('No error, role is', role, "length", role.length);
    if (role.length === 0) {
      app.models.Role.create({
        name: 'admin',
      }, (err2, result) => {
        if (!err2 && result) {

            app.models.user.findOne((usererr, user) => {
              if (!usererr && user) {
                result.principals.create({
                  principalType: app.models.RoleMapping.USER,
                  principalId: user.id,
                }, (err3, principal) => {
                  console.log('created principal', err3, principal);
                })
              }
            });
          
        }
      });
    }
    
  }
});

app.models.Role.find({where: {name: 'editor'}}, (err, roles) => {
  if (!err && roles) {
    if (roles.length === 0) {
      app.models.Role.create({
        name: 'editor',
      }, (creationErr, result) => {
        console.log(creationErr, result);
      });
    }
  }
});





//app.models.Post.destroyAll((err, found) => {
//  console.log('Found?', err, found);
//})
console.log('LAST LINE OF SERVER.JS FILE');