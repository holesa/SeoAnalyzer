const express       = require("express"),
      Manager       = require("../models/manager"),
      router        = express.Router(),
      puppeteer      = require("puppeteer");


      // @desc    Analyze
      // @route   GET /analyze
      router.get("/",(req,res)=>{
          if(req.query.url === ""){
            res.render("index",{error:"Please enter a valid URL"});
          }
          const data = new Manager(req).getResults();          
           data.then(data=>{
            if(!data){
              res.render("index",{error:"Please enter a valid URL"});
            } else {
              res.render("performence",{data:data});
            }
          })
    })

module.exports = router;