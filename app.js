// Import the express module
import express from 'express';

//create an instance of an
//express application
const app = express();

//define a port number
//for our server to listen on
const PORT = 3001;

const orders = [];

//enable static file serving (from a folder called public)
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//define a default route ("/")
app.get('/', (req, res) => {
    //res.send('icecream');
    res.render('home');
});

//define a default route ("/")
app.post('/confirm', (req, res) => {
    //send this file
    //create a json object to store order data
    const order = req.body;
    order['timestamp'] = new Date();
    console.log(order);

    orders.push(order);
    console.log(orders);
    //res.send('icecream');
    res.render(`confirm`, {order});
});

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});