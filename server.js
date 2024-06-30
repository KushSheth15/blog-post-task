const express = require("express");
require('dotenv').config();

const db = require("./models/index");
const userRoute = require("./routers/user-route");
const postRoute = require("./routers/post-route");
const PORT = process.env.PORT;
const app = express();

db.sequelize.sync().then(()=>{
    console.log("Database synced successfully");
}).catch((err)=>{
    console.log ('Failed to sync db'+err.message);    
});

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api',userRoute);
app.use('/api',postRoute);

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
})