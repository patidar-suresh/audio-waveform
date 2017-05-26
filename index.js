const express = require("express");

const app = express();

app.use(express.static('public'));

app.listen(3001, ()=>{
    console.log("application started listening on 3001");
});
