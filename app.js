// Import the express module
import express from 'express';

//create an instance of an
//express application
const app = express();

//define a port number
//for our server to listen on
const PORT = 3000;

//enable static file serving (from a folder called public)
app.use(express.static('public'));

//define a default route ("/")
app.get('/', (req, res) => {
    //res.send('icecream');
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});