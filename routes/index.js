var express = require('express');
var router = express.Router();

var fs = require("fs");

function readJSON() {
  var users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  return users;
}

function deleteUser(id){
  var users = readJSON();
  for(var i = 0; i < users.length; i++){
    if (users[i].id == id){
      users.splice(i,1)
      console.log("deleted");
      break;
    }
  }
  var usersJson = JSON.stringify(users);
  //console.log("users",usersJson)
  fs.writeFileSync('./data/users.json', usersJson);
};
router.post('/:id', function(req, res){
  var id = req.params.id;
  deleteUser(id);
  res.redirect('/');
});

function addUser(user){
  var users = readJSON();
  users.push({id: user.id, firstName: user.nm, surname: user.sn, age:user.ag});
  usersJson = JSON.stringify(users);
  fs.writeFileSync('./data/users.json', usersJson);
};
router.post('/', function(req, res) {
  addUser(req.body.newUser);
  res.redirect('back');
});
router.get('/edit/:id', function(req, res, next) {
  var users = readJSON();
  var id = req.params.id;
  //console.log(req.params.id);
  for(var i=0; i<users.length; i++){
    if(users[i].id==id){
      res.render('edit', { 
        user:users[i]
      });
    }
  };
});
router.get('/', function(req, res, next) {
  var users = readJSON();
  res.render('index', { 
    users:users
  });
});

module.exports = router;
