var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema ({
    createdAt: {type: Date},
    updatedAt: {type: Date},

    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    first: {type: String, required: true},
    last: {type: String, required: true}
});

UserSchema.pre('save', function (next) {
   var now = new Date();
   this.updatedAt = now;
   if ( !this.createdAt ) {
       this.createdAt = now;
   }

   // ENCRYPT

    var use = this;
    if (!user.isModified('password')) {
    return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
        });
    });
});
module.exports = mongoose.model('User', UserSchema);
