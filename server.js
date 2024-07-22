const express = require("express");
require('dotenv').config();

const db = require("./models/index");
const mainRoutes = require("./routers/index");
const PORT = process.env.PORT;
const app = express();

db.sequelize.sync().then(()=>{
    console.log("Database synced successfully");
}).catch((err)=>{
    console.log ('Failed to sync db'+err.message);    
});

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api',mainRoutes);

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
})