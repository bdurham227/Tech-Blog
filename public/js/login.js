
const loginFormHandler = async (event) => {
event.preventDefault();

const email = document.querySelector("#email-login").value.trim();
const password = document.querySelector("#password-login").value.trim();

if (email && password) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('inside login js')
if (response.ok) {
  document.location.replace('/dashboard')
} else {
  alert('nope!')
}
}
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

