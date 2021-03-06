// Calling all dependencies
var express = require('express');

var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

var app = express();

var exphbs = require('express-handlebars');

//Connecting the database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/discover-u-write', {useMongoClient: true});
mongoose.Promise = global.Promise;

//Setting up engine template
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});
// requesting the Article Schema
var Article = require('./models/article.js');

//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// Override
app.use(methodOverride('_method'));


// INDEX
app.get('/', function (req, res) {
    res.render('article-index');
});
//NEW
app.get('/article/new', function (req, res) {
    res.render('article-new', {});
});
// SHOW ARTICLE
app.get('/article-show', function (req, res) {
    Article.findById(req.params.id).exec(function (err, article) {
        res.render('article-show', {article: article});
    });
});
app.get('/article/:id', function (req, res) {
    Article.findById({_id: req.params.id}, function (err, article) {
        console.log(article);
        res.render('article-show', {article: article});
    });
});
// EDIT ARTICLE
app.get('/article/:id/edit', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        res.render('article-edit', {article: article});
    });
});

// CREATE ARTICLE
app.post('/article/new', function (req, res) {
    Article.create(req.body, function (err, article) {
        console.log(req.body);
        res.redirect('/article/' + article.id)
    });
    //res.render('article-new', {});
});

// UPDATE ARTICLE
app.put('/article/:id', function (req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body, function (err, article) {
        res.redirect('/article/show' + article._id);
    });
});
// DELETE ARTICLE
app.delete('/article/:id', function (req, res) {
    Article.findByIdAndRemove(req.params.id, function (err) {
        res.redirect('/')
    })

});


// Requesting the user model schema
user = require('./models/user.js')(app);

app.post('/users', function (req, res) {
    console.log(req.body);
    // User.save(req.body, function(err, user));
    res.json({msg: "Saved!"});
});

//User update
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});
//User Delete
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});


app.listen(port);
console.log('You are connected to ' + port);
