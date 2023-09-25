const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');
env.config();

const userRouter = require('./Routes/userRouter');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use((req, res, next) => {
    console.log("HTTP METHOD - " + req.method + " URL - " + req.url);
    next();
});


app.use('/api/user', userRouter)



mongoose.connect(process.env.MONGODB_URL,{
    dbName:"otp"
})
    .then(() => {
        app.listen(PORT, () => console.log(`Server Running on port ${PORT} !`))
        app.get("/", (req, res) => {
            const response = { message: "API Works Fine !" };
            res.json(response);
        });


    }).catch((error) => {
        console.log(error);
    });



