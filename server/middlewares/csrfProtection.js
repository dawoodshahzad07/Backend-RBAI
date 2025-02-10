// File: csrfProtection.js
const csurf = require('csurf');
const csrfMiddleware = csurf({ cookie: true });
module.exports = csrfMiddleware;
