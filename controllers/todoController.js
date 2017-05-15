var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://roshan:roshan@ds139781.mlab.com:39781/todosimple');

//Create a schema
var todoScheme = new mongoose.Schema({
	item: String
});

//model
var Todo = mongoose.model('Todo',todoScheme);

//var data = [{item:'get milk'},{item:'eat food'},{item:'sleep'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});	

module.exports = function(app){

	app.get('/todo',function(req,res){
		//get data from mongo db and pass it to view
		Todo.find({},function(err,data)
		{
			if(err) throw err;
			res.render('todo',{todos:data});
		});
	});

	app.post('/todo',urlencodedParser ,function(req,res){
		//get data from view and add it to mongo db
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
		});
		res.JSON(data);
		
	});

	app.delete('/todo/:item',function(req,res){
		//deleted requested item from database
		Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data)
		{
			if(err) throw err;
			res.json(data);
		});
		
	});
};