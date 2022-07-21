const sgMail = require('@sendgrid/mail');
const { createError } = require('../errors');

require('dotenv').config();

const { SENDGRID_API_kEY } = process.env;

sgMail.setApiKey(SENDGRID_API_kEY);

// const mail = {
//   to: 'ripoxo3705@teasya.com',
//   from: 'goit.nodejs.project@gmail.com',
//   subject: 'Email confirm subject',
//   html: '<p>Email confirm html</p>',
// };

const sendMail = async data => {
  try {
    const mail = { ...data, from: 'goit.nodejs.project@gmail.com' };
    sgMail.send(mail);
    return true;
  } catch (error) {
    throw createError(400);
  }
};

// sgMail
//   .send(mail)
//   .then(() => console.log('Email send success'))
//   .catch(error => {
//     console.log(error.message);
//   });

module.exports = sendMail;
