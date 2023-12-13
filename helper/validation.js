const { make } = require('simple-body-validator');

function validationRequest(body) {
  const rules = {
    name: ['required', 'string'],
    email: ['required', 'string', 'email'],
    password: ['required', 'string', 'min:6'],
  };

  const validation = make().setData(body).setRules(rules);

  return validation;
}

module.exports = {
  validationRequest,
};
