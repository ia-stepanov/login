import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.services';
import { notify } from './views/notifications';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((input) => input.addEventListener('focus', () => removeInputError(input)));

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every((input) => {
    const isValidInput = validate(input);
    if (!isValidInput) {
      showInputError(input);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    form.reset();
    notify({ msg: 'Login success', className: 'alert-success', timeout: 1000 });
  } catch (err) {
    notify({ mas: 'Login failed', className: 'alert-danger' });
  }
}
