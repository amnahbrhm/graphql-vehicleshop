const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

//connect to mongodb...
mongoose.connect(`mongodb://127.0.0.1/vehicledb`);
mongoose.connection.on('error', err => console.error('FAILED to connect to mongodb instance.', err));
mongoose.connection.once('open', () => console.log('Connected to mongodb instance.'));

const graphqlHTTP = require('express-graphql');
const schema = require('./graphSchema/vehicleSchemaGQL');

app.get('/', (req, res)=>{
    res.end("graphql-vehicleshop is running on 4000 port...");
})
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen('4000', ()=>{
    console.log("Server is starting on 3000 port...")
})