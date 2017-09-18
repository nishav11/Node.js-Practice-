var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nishav:nisha1308@ds135574.mlab.com:35574/tododb');

//schema

var todoSchema = new mongoose.Schema({
    item: String
});

//model

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "kick some coding ass" }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get('/todo', function(req, res, next) {
        //get data from mlab and pass it to the view

        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });


    });

    app.post('/todo', urlencodedParser, function(req, res, next) {
        // get data from the view and add to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', function(req, res, next) {
        //delete requested item
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo) {
        //return todo.item.replace(/ /g, "") !== req.params.item;
        //});
        // res.json(data);
    });


};