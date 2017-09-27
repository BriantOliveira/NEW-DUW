// Calling all dependencies
var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/discover-u-write');
//models
var Article = mongoose.model('Article', {
    category:  String,
    articleId: String,
    writeArticle: String
});
// module.exports = mongoose.model('Article', Article);

//Setting up engine template
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// require('./controllers/posts.js')(app);

// INDEX
app.get('/', function(req, res) {
    Article.find(function(err, articles) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('article-index', { articles: articles });
    });

});
//NEW
app.get('/article/new', function(req, res) {
   res.render('article-new', {});
});

//CREATE
app.post('/articles', function(req, res) {
    Article.create(req.body, function (err, article) {
        console.log(article);
        res.redirect('/article' + article.id)
    });
   //res.render('article-new', {});
});


app.listen(port);
console.log('You are connected to ' + port);
