const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid');

const new_customerSchema = new mongoose.Schema(
    {
        prefix: {
            type: String,
            trim: true,
            maxlength: 20
        },
        cfirst: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        clast: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        cemail: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 50
        },
        /* cdob: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }, */
        /* csadd: {
            type: String,
            trim: true,
            required: true,
            maxlength: 500
        },
        csadd2: {
            type: String,
            trim: true,
            maxlength: 500
        },
        ccity: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }, */
        /* cstate: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }, */
        cphone: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 32
        },
        /* czip: {
            type: String,
            required: true,
            maxlength: 20
        }, */
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 1
        },
        deleted: {
            type: String,
            default: "0"
        },
        customerid:{
            type: String,
            trim: true
        },
        resetPasswordToken:String,
        resetPasswordExpires:Date
    },
    { timestamps: true}
);

// virtual field
new_customerSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuid.v1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

    new_customerSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('new_customer', new_customerSchema);