import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';
import { signUp } from './services/signup.service';
import { getCountries } from './services/location';
import { getCities } from './services/location';
import {
  getAutocompleteTemplate,
  getAutocompleteTemplateCities,
} from './store/autocomplete';

const { formLog, formReg, inputEmail, inputPassword, signUpFromFields } = UI;
const inputs = [inputEmail, inputPassword];
const inputsReg = Object.values(signUpFromFields);
const inputCountries = signUpFromFields.inputCountry;
const inputCities = signUpFromFields.inputCity;

inputCities.addEventListener('input', (e) => {
  e.preventDefault();
  autucompleteInputCities();
});

inputCountries.addEventListener('input', (e) => {
  e.preventDefault();
  autucompleteInput();
});

//Events
formLog.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((el) => el.addEventListener('focus', () => removeInputError(el)));

formReg.addEventListener('submit', (e) => {
  e.preventDefault();
  onSignUpSubmit();
});

inputsReg.forEach((el) => el.addEventListener('focus', () => removeInputError(el)));

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    formLog.reset();
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Login failed', className: 'alert-danger' });
  }
}

async function onSignUpSubmit() {
  let inputsArr;
  const inputsRegVal = inputsReg.map((inputVal) => inputVal.value);

  if (inputsRegVal[9].length) {
    let oldArr = inputsRegVal[9].split('-');
    const oldArrReverse = oldArr.reverse();
    inputsArr = inputsRegVal.splice(-1, 1, ...oldArrReverse);
  } else {
    let oldArr = ['', '', ''];
    inputsArr = inputsRegVal.splice(-1, 1, ...oldArr);
  }

  let contact = document.querySelectorAll('input[name="gender_orientation"]');
  contact.forEach((el) => {
    if (el.checked) {
      inputsRegVal[6] = el.value;
    }
  });

  const isValidForm = inputsReg.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await signUp(...inputsRegVal);
    formReg.reset();
    notify({ msg: 'SignUp success', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'SignUp failed', className: 'alert-danger' });
  }
}

async function autucompleteInput() {
  try {
    await getAutocompleteTemplate();
  } catch (err) {
    console.log(err);
  }
}

async function autucompleteInputCities() {
  try {
    await getAutocompleteTemplateCities();
  } catch (err) {
    console.log(err);
  }
}
