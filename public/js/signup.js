
const signupHandler = async (event) => {
  event.preventDefault();

const username = document.querySelector('#username-signup');
const email = document.querySelector('#email-signup');
const password = document.querySelector('#password-signup');

if (username && email && password) {
  console.log(username.value)
  console.log(email.value)
  console.log(password.value)
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username: username.value, email: email.value, password: password.value }),
    headers: { 'Content-Type' : 'application/json' },
  });

if (response.ok) {
  console.log('success')
  document.location.replace('/dashboard');
} else {
  alert(response.statusText);
}
}
};

document.querySelector('.signup-form').addEventListener('submit', signupHandler);