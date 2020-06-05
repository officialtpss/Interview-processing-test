'use strict';
module.exports = (app) => {
  const Joi = require('joi');
  const user = require('../modules/users');
  const jwtAuth = require('../middleware/jwt');
  const validator = require('../middleware/schema-validator');

  const loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  const registerSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  };


  app
    .route('/users')
    .post(validator(registerSchema), user.create)
    .put(validator(loginSchema), user.login, jwtAuth.encode);

  app
    .route('/user/profile')
    .put(jwtAuth.decode, user.profileUpdate);
};
