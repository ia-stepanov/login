const UI = {
  formLog: document.forms['loginForm'],
  formReg: document.forms['signupForm'],
  inputEmail: document.getElementById('email'),
  inputPassword: document.getElementById('password'),

  signUpFromFields: {
    inputEmail: document.getElementById('signup-email'),
    inputPassword: document.getElementById('signup-password'),
    inputNickname: document.getElementById('signup-nickname'),
    inputFirstname: document.getElementById('signup-firstname'),
    inputLastname: document.getElementById('signup-lastname'),
    inputPhone: document.getElementById('signup-phone'),
    inputSex: document.querySelector("input:checked[name='gender_orientation']"),
    inputCity: document.getElementById('signup-city'),
    inputCountry: document.getElementById('signup-country'),
    inputBirthdate: document.getElementById('signup-birth'),
  },
};

export default UI;
