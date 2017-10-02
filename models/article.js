var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    createdAt   :{ type: Date },
    updatedAt   :{ type: Date }

    , category  :{ type: String }
    , articleName :{ type: String, required: true }
    , content   :{ type: String, required: true }
});

ArticleSchema.pre('save', function (next) {
   now = new Date();
   this.updatedAt = now;
   if ( !this.createdAt ) {
       this.createdAt = now;
   }
   next();
});
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;