/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../logs');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome to the John Merritt App',
      message: `<%= userName %>,
        <p>
          Thanks for signing up for John Merritt App!
        </p>
        <p>
          In our books, we teach you how to build complete, production-ready web apps from scratch.
        </p>
        John MErritt
      `,
    },
    {
      name: 'purchase',
      subject: 'You purchased book at The John Merritt App',
      message: `<%= userName %>,
        <p>
          Thank you for purchasing our book! You will get confirmation email from Stripe shortly.
        </p>
        <p>
          Start reading your book: <a href="<%= bookUrl %>" target="_blank"><%= bookTitle %></a>
        </p>
        <p>
          If you have any questions while reading the book,
          please fill out an issue on
          <a href="https://github.com/builderbook/builderbook/issues" target="blank">Github</a>.
        </p>
        Kelly & Timur, Team Builder Book
      `,
    },
  ];

  templates.forEach(async template => {
    if ((await EmailTemplate.find({ name: template.name }).count()) > 0) {
      return;
    }

    EmailTemplate.create(template).catch(error => {
      logger.error('EmailTemplate insertion error:', error);
    });
  });
}

insertTemplates();

async function getEmailTemplate(name, params) {
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    throw new Error(
      'No Email Templates found. Please check that at least one is generated at server startup, restart your server and try again.'
    );
  }

  return {
    message: _.template(source.message)(params),
    subject: _.template(source.subject)(params),
  };
}

exports.insertTemplates = insertTemplates;
exports.getEmailTemplate = getEmailTemplate;
