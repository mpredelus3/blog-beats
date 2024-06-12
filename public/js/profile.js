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
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to delete blog');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the blog');
      }
    }
  };

  const likeButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      try {
        const response = await fetch(`/api/blogs/likes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const likesCount = event.target.closest('.blog-post').querySelector('.likes-count');
          likesCount.textContent = data.likes;
        } else {
          alert('Failed to like blog');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while liking the blog');
      }
    }
  };

  const incrementViews = async () => {
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(async (post) => {
      const id = post.getAttribute('data-id');
      try {
        const response = await fetch(`/api/blogs/views/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const viewsCount = post.querySelector('.views-count');
          viewsCount.textContent = data.views;
        } else {
          console.error('Failed to update views for blog', id);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
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
    blogList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-blog-btn')) {
        delButtonHandler(event);
      } else if (event.target.classList.contains('like-blog-btn')) {
        likeButtonHandler(event);
      }
    });
  } else {
    console.error('Blog list element not found');
  }

  // Increment views on page load
  incrementViews();
});
 