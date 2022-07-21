const sgMail = require('@sendgrid/mail');
const { createError } = require('../errors');

require('dotenv').config();

const { SENDGRID_API_kEY } = process.env;

sgMail.setApiKey(SENDGRID_API_kEY);

const sendMail = async data => {
  try {
    const mail = { ...data, from: 'goit.nodejs.project@gmail.com' };
    sgMail.send(mail);
    return true;
  } catch (error) {
    throw createError(400);
  }
};

module.exports = sendMail;
