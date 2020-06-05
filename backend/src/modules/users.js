const mongoose = require('mongoose');
const { getErrorMessage } = require('./../handler/error.handler');
const users = mongoose.model('users');
const path = require('path');
const btoa = require('btoa');
const imageMagick = require('imagemagick');
const fs = require('fs');

/**
 *@create - in which we create the users
 */
module.exports.create = async (req, res) => {
  try {
    req.body.password = b64 = btoa(req.body.password);
    const user = new users(req.body);
    await user.save();
    res.status(200).send({ 'success': 'ok' });
  } catch (e) {
    res.status(400).send({
      message: getErrorMessage(e),
    });
  }
};

/**
 *@login - login User
 */
module.exports.login = async (req, res, next) => {
  try {

    const doc = await users.findOne({
      email: req.body.email,
      password: btoa(req.body.password)
    });
    if (!doc) {
      res.status(400).send({
        message: 'Email or Password does not match!',
      });
    } else {
      res.user = doc;
      next();
    }
  } catch (e) {
    res.status(400).send({
      message: getErrorMessage(e),
    });
  }
};

/**
 *@profileUpdate - profile update
 */

module.exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.files.file) {
      if (req.files.file.mimetype == 'image/png' || req.files.file.mimetype == 'image/jpg' || req.files.file.mimetype == 'image/jpeg') {
        const ext = req.files.file.name.substring(req.files.file.name.lastIndexOf('.') + 1).toLowerCase();
        const time = new Date().getTime();
        const rand = Math.random().toString(36).substring(7);
        const imageName = `public/thumb/${rand}_${time}_50x50.${ext}`;
        const thumb_path = `${path.join(__dirname, '../../', 'public/thumb/') + rand}_${time}_50x50.${ext}`;
        imageMagick.resize({
          srcData: req.files.file.data,
          width: 50,
          quality: 1,
          height: 50
        }, async (err, stdout, stderr) => {
          if (err) throw err;
          fs.writeFileSync(thumb_path, stdout, 'binary');
          /* 
           add  update image in database
          */
          res.status(200).send({
            message: 'OK',
            image: imageName
          });
        });

      } else {
        res.status(400).send({
          message: 'image must be jpeg or png',
        });
      }
    } else {
      res.status(400).send({
        message: 'File not exist',
      });
    }
  } catch (e) {
    res.status(400).send({
      message: getErrorMessage(e),
    });
  }
};