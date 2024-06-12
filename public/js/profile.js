document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();

    if (name && description) {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create blog');
      }
    } else {
      alert('Please fill out all fields');
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  const form = document.querySelector('.new-blog-form');
  console.log('Form element:', form);

  if (form) {
    form.addEventListener('submit', newFormHandler);
  } else {
    console.error('Form element not found');
  }

  const blogList = document.querySelector('.blog-list');
  console.log('Blog list element:', blogList);

  if (blogList) {
    blogList.addEventListener('click', delButtonHandler);
  } else {
    console.error('Blog list element not found');
  }
});