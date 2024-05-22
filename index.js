const {scraper}=require('../scraper')
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// let data = null;
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log("The server is running at port:",PORT)
})
app.get("/", (req, res) => {
    
    res.send("Server is working fine");

});
app.get("/puppeteer",  (req, res)=> {
    scraper(res);
})