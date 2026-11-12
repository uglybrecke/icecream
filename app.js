// Import the express module
import express from 'express';

// Import the mysql2 module
// mysql2 allows Node.js to communicate with a MySQL database
import mysql2 from 'mysql2';

//import our dotenv file
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,       	// Your Digital Ocean IP
    user: process.env.DB_USER,          // MySQL username
    password: process.env.DB_PASSWORD, 	// MySQL password from readme.txt
    database: process.env.DB_NAME,      // Database name
    port: process.env.DB_PORT           // MySQL port (default is 3306)
}).promise();

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
app.post('/confirm', async(req, res) => {

    try {
        //send this file
        //create a json object to store order data
        const order = req.body;

        //order['timestamp'] = new Date();

        //conver toppings array to a comma-deliminated string
        order.toppings = Array.isArray(order.toppings) ?
            order.toppings.join(", ") : "";

        console.log(order);

        //define an SQL query to INSERT new order
        const sql = `INSERT INTO orders (customer, email, flavor, cone, toppings, comment) VALUES(?,?,?,?,?,?)`;

            //create an array of parameters froim order data
        const params = [
            order.customer,
            order.email,
            order.flavor,
            order.conie,
            order.toppings,
            order.comment
        ];

        //execute the query (using array destructuring)
        const [result] = await pool.execute(sql, params);

        order.id = result.insertId;

        //res.send('icecream');
        res.render(`confirm`, {order});

    } catch(err) 
        {
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);
        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }

});

//ADMIN  route
app.get('/admin', (req, res) => {
    //send this file
    res.render(`admin`, { orders } );
})

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});

// Database test - http://localhost:3000/db-test to test this route
app.get('/db-test', async(req,res) => {

    // try/catch block for error handling
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC'); //await for a database response but keep working

        res.render('admin', {orders}); // 0 is the data, 1 is the metadata
    } catch(err) {

        console.error('Database error:', err);

        res.status(500).send('Database error: ' + err.message);
    }
});