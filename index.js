const http = require("http");
const fs  = require("fs");
const path = require("path");

const cors = require("cors");
const express = require("express");

const app = express();

const fetchView = (name)=>{
  return path.resolve(__dirname,'./views',name)
}
app.use("/static",express.static(path.join(__dirname,"./assests")));

app.set("view engine", "ejs");


app.use("/login",(req,res)=>{
  console.log("This is my login page");
})

app.get("/",(req,res)=>{
 res.render(fetchView("index"),{ name:  "My Todo Application"})
});

app.listen(1000,()=>{
  console.log("Started server at port "+ 1000)
})
// const server = http.createServer((req, res) =>{
//     res.write("Hello World");
//     res.end()
// });

// server.listen(2000,(err)=>{
//   console.log("Enjoy")
// })


