const form = document.getElementById('form');
const firstName = document.querySelector('.firstName');
const lastName = document.querySelector('.lastName');
const email = document.querySelector('.email');
const password = document.querySelector('.password');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = [
    { field: firstName, value: firstName.value, errorMsg: 'First Name cannot be empty' },
    { field: lastName, value: lastName.value, errorMsg: 'Last Name cannot be empty' },
    { field: email, value: email.value, errorMsg: 'Email cannot be empty', validate: validateEmail, invalidMsg: 'Looks like this is not an email' },
    { field: password, value: password.value, errorMsg: 'Password cannot be empty' }
  ];

  fields.forEach(({ field, value, errorMsg, validate, invalidMsg }) => {
    if (value === '') {
      showError(field, errorMsg);
    } else if (validate && !validate(value)) {
      showError(field, invalidMsg);
    } else {
      showSuccess(field);
    }
  });
});

function showError(input, message) {
  input.classList.add('error');
  let errorElement = input.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('small');
    errorElement.classList.add('error-message');
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }
  errorElement.textContent = message;
}

function showSuccess(input) {
  input.classList.remove('error');
  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.remove();
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
