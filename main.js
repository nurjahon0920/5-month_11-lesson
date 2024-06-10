async function getAllPosts() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching all posts:', error);
    }
}

async function getPostById(postId) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        let post = await response.json();
        return post;
    } catch (error) {
        console.error(`Error fetching post with ID ${postId}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let loadPostsBtn = document.getElementById('loadPosts');
    let cards = document.getElementById('cards');
    let details = document.getElementById('details');

    if (loadPostsBtn) {
        loadPostsBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            let posts = await getAllPosts();
            cards.innerHTML = '';
            posts.forEach(post => {
                let card = document.createElement('div');
                card.classList.add('card');  // Add card class
                card.dataset.postId = post.id;
                card.innerHTML = `
                    <p>ID: ${post.id}</p>
                    <p>User ID: ${post.userId}</p>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                cards.appendChild(card);
            });
        });

        cards.addEventListener('click', (e) => {
            let card = e.target.closest('.card');
            if (card) {
                let postId = card.dataset.postId;
                window.location.href = `details.html?postId=${postId}`;
            }
        });
    }

    if (details) {
        let urlParams = new URLSearchParams(window.location.search);
        let postId = urlParams.get('postId');
        if (postId) {
            (async () => {
                let post = await getPostById(postId);
                if (post) {
                    details.innerHTML = '';
                    let detailCard = document.createElement('div');
                    detailCard.classList.add('card');
                    detailCard.innerHTML = `
                        <h3>Post ID: ${post.id}</h3>
                        <h3>User ID: ${post.userId}</h3>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    `;
                    details.appendChild(detailCard);
                } else {
                    details.innerHTML = '<p>Post not found</p>';
                }
            })();
        } else {
            details.innerHTML = '<p>Post not found</p>';
        }
    }
});

function myFunction() {
    let element = document.querySelector(".cards");
    if (element) {
        element.classList.toggle("dark-mode");
    }
}
