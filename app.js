const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to mongodb...
mongoose.connect(`mongodb://127.0.0.1/vehicledb`);
mongoose.connection.on('error', err => console.error('FAILED to connect to mongodb instance.', err));
mongoose.connection.once('open', () => console.log('Connected to mongodb instance.'));

const graphqlHTTP = require('express-graphql');
const schema = require('./graphSchema/vehicleSchemaGQL');

app.get('/', (req, res)=>{
    res.end("graphql-vehicleshop is running on 3000 port...");
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen('3000', ()=>{
    console.log("Server is starting on 3000 port...")
})