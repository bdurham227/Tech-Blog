const updateFormHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document.querySelector('input[name="post-content"]').value.trim();
  // const user_id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];


  const response = await fetch(`/api/post/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ post_title, post_content }),
    headers: { 'Content-Type' : 'application/json'},
  });

  if (response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert(response.statusText)
  }

};

document.querySelector('.update-form').addEventListener('submit', updateFormHandler); 