const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const router = require('./routes/users.js');
const { route } = require('./routes/users.js');
const PORT = 5000;

app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World !')
    
// })

app.use('/users', router)

app.listen(PORT, () => {
    console.log("Server is running at port 5000")
})