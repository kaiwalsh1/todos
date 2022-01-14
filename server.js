const express = require('express');
const { todos, uuid } = require('./db/todos');
// Environmental variables
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));
// Body parser
// It takes information that the client is sending from a "form" or "post" request
// and attach the data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// create a middleware to make "req.manny" exist in every route
// 1st parameter to app.use is what routes do i want this middleware to be active for
// a middleware is a function that intercepts the incoming request,
// from there, we can validate data, check if a user is logged in, validate data being sent
// modify the request, respond early in case users does something stupid
app.use(function (req, res, next) {
    req.manny = 'Emmanuel';
    next();
});
const checkBodyForText = (req, res, next) => {
    console.log('im here');
    console.log(req.method);
    if (req.body?.text.length === 0) {
        return res.status(401).json({ error: 'You must pass text to create a todo' });
    } else {
        next();
    }
};
app.get('/api/todos', (req, res) => {
    // req is an object
    // that contains information about the incoming request
    res.json(todos);
});
// When someone makes a "POST" request to /api/todos, call the cb function
app.post('/api/todos', checkBodyForText, (req, res) => {
    console.log(req.body);
    const newTodo = {
        text: req.body.text,
        id: uuid(),
    };
    todos.push(newTodo);
    res.json(newTodo);
});
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
// npm i -g nodemon