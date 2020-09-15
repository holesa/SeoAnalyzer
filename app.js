const express        = require("express"), 
      dotenv         = require("dotenv"),
      app            = express();

// Configure env
dotenv.config();

// Configure port
const port = parseInt(process.env.PORT)

// Set ejs as a primary app template engine;
app.set("view engine", "ejs");

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({extended:true}));

// Serve static files in a public directory
app.use(express.static("public"));

// Set local variable
app.use(function(req, res, next) {
       res.locals.error = ""
       next();
     });  
     

// Routes
app.use("/analyze", require("./routes/analyze"));
app.use("/", require("./routes/index"));

// 404 page
app.get("*",(req, res)=>{
  res.render("404");
})
      
app.listen(port, (req,res)=>{
    console.log("Env here " +  process.env.PORT)
    console.log("Server is running!");
})      