var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.redirect('/first/index.html');
    //res.send("周彬诚,欢迎访问!这是我们工作室的第一个网站");
    //res.render('index', {title:"gaoxiao"});
    res.redirect("/game/dlx/index.html");
});

module.exports = router;
