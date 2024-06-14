<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  const newFormHandler = async (event) => {
    event.preventDefault();
=======
const newFormHandler = async (event) => {
  event.preventDefault();
>>>>>>> parent of 34530d9 (wrapped code so that the DOM is fully loaded)

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

<<<<<<< HEAD
  const projectList = document.querySelector('.project-list');
  if (projectList) {
    projectList.addEventListener('click', delButtonHandler);
  }
=======
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

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

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
>>>>>>> c0906e5919480a89ca5f8de74db1a541318a1a20
});
=======
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
>>>>>>> parent of 34530d9 (wrapped code so that the DOM is fully loaded)
