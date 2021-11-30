const express = require('express');
const app = express();
const db = require('./db');
const getItems = require('./db/getItems');
const addItem = require('./db/addItem');
const updateItem = require('./db/updateItem');
const deleteItem = require('./db/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/dist'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init()
    .then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
