var express = require('express');
var router = express.Router();
var fs = require("fs");
function readJSON() {
  var users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  return users;
}
function editUser(id, user){
  var users = readJSON();
  for(var i = 0; i < users.length; i++){
    if (users[i].id == id){
      users[i]={id: user.id, firstName: user.nm, surname: user.sn, age:user.ag};
      console.log("updated");
      console.log(users[i]);
      break;
    }
  }
  usersJson = JSON.stringify(users);
  fs.writeFileSync('./data/users.json', usersJson);
};
router.post('/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.editUser);
  editUser(id, req.body.editUser);
  res.redirect('/');
});

module.exports = router;