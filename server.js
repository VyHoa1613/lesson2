// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ todos: {} })
  .write()

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (req, res) => {
  var q = req.query.q;
  var match = todoList.filter(function(todos) {
    return todos.todo.toLowerCase().indexOf(q.toLowerCase()) != -1;
  });
  res.render("todos", {
    todoList: match
  });
});

app.get('/todo',function(req, res){
    res.render('todos',{
        todoList:db.get("todos").value()
    })
})

app.get('/todo/create',(req, res) => {
  res.render('create')
})

app.post('/todo/create',(req, res) => {
  db.get('todos').push(req.body).write();
  res.redirect('/todo');
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
