'use strict';
/**
 * User Schema
 */
module.exports = (mongoose) => {
  const Schema = mongoose.Schema,
    validation = require('./validationModel'),
    UserSchema = new Schema({
      password: {
        type: String,
        trim: true,
        required: 'Password cannot be blank',
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [
          validation.validateEmail,
          'Please fill a valid email address',
        ],
      },
      name: {
        type: String,
        required: 'name cannot be blank',
      },
      image: {
        type: String,
        default: '',
      },
      created: {
        type: Date,
        default: Date.now,
      },
    });
  mongoose.model('users', UserSchema);
};
