const express = require('express');
const app = express();
require('express-async-errors');
require('dotenv').config();
const db = require('./models')
const authenticateUser = require('./middleware/authentication');
const cors = require('cors')

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter=require('./routes/cart')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());
app.use(cors());


// routes
app.use('/api/v1/', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/',authenticateUser,cartRouter)

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.sequelize
    .sync()
    .then(() => {
        console.log("synced db");
    })
    .catch((err) => {
        console.log("failed" + err.message);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on ${port}...`);
});