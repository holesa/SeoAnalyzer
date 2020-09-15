const express   = require("express"),
      router    = express.Router();

      
// @desc    Homepage
// @route   GET /
router.get("/",((req,res)=>{
    res.render("index",{notification:""});
 })) 


 module.exports = router