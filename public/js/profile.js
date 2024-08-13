document.addEventListener('DOMContentLoaded', () => {
  // Handler for project form submission
  const newProjectFormHandler = async (event) => {
    event.preventDefault();

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

  // Handler for project deletion
  const delProjectButtonHandler = async (event) => {
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

  const newProjectForm = document.querySelector('.new-project-form');
  if (newProjectForm) {
    newProjectForm.addEventListener('submit', newProjectFormHandler);
  }

  const projectList = document.querySelector('.project-list');
  if (projectList) {
    projectList.addEventListener('click', delProjectButtonHandler);
  }
  console.log('DOM fully loaded and parsed');

  // Handler for blog form submission
  const newBlogFormHandler = async (event) => {
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

  // Handler for blog deletion
  const delBlogButtonHandler = async (event) => {
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
    form.addEventListener('submit', newBlogFormHandler);
  } else {
    console.error('Form element not found');
  }

  const blogList = document.querySelector('.blog-list');
  console.log('Blog list element:', blogList);

  if (blogList) {
    blogList.addEventListener('click', delBlogButtonHandler);
  } else {
    console.error('Blog list element not found');
  }
});
