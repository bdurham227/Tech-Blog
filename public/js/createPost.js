const newFormHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document.querySelector('input[name="post-content"]').value.trim();
  
  const data = {
    post_title,
    post_content,

  };

  if (post_title && post_content) {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type' : 'application/json' },
  });
  console.log(data);
console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);