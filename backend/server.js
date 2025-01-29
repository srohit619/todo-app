const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const port = 5000
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log(

    "process.env.MONGO_URI",process.env.MONGO_URI
)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

const todoSchema = new mongoose.Schema({
    task: String
})

const todo = mongoose.model('todo', todoSchema);

app.get('/todos', async (req, res) => { 
    const todos = await todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {           
    const newTodo = new todo({
        task: req.body.task
    });

    await newTodo.save();
   res.json(newTodo);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


