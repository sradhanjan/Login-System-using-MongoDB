const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
	extended : true
}))

mongoose.connect('mongodb://localhost:27017/registration',{
	useNewUrlParser: true,
	useUnifiedTopology:true,
	useCreateIndex:true
});

const db = mongoose.connection;

db.on('error',()=>console.log("error in connecting database"))
db.once('open',()=>console.log("connected to database"))

app.post("/signup",(req,res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const number = req.body.number;

	const data = {
		"name" : name,
		"email" : email,
		"password" : password,
		"number" : number
	}

	db.collection('users').insertOne(data,(err,collection)=> {
		if(err)
		{
			throw err;
		}
		else
		{
			console.log("record inserted");
		}
	});
	return res.redirect('success.html')
}) 

app.get("/", (req,res) => {
	res.set({
		"Allow-access-Allow-Origin":'*'
	})
	return res.redirect('index.html')
});

app.listen(port, ()=> {
	console.log(`server is running at port no ${port}`)
})
