const updateFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value.trim();
  const postContent = document.querySelector('input[name="post-content"]').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];


  const response = await fetch(`/api/post${id}`, {
    method: 'PUT',
    body: JSON.stringify({ postTitle, postContent }),
    headers: { 'Content-Type' : 'application/json'},
  });

  if (response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert(response.statusText)
  }

};

document.querySelector('.update-form').addEventListener('submit', updateFormHandler); 