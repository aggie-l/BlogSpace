let postsArray = []
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")



function renderPosts() {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3 id="post-heading">${post.title}</h3>
            <p id="post-list">${post.body}</p>
        `
    }
    document.getElementById('blog-posts').innerHTML = html
}



fetch("https://apis.scrimba.com/jsonplaceholder/posts")
.then(response => response.json())
.then(data => {
    postsArray = data.slice(0, 10)
    renderPosts()
})



document.getElementById("new-post").addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = titleInput.value
    const postBody = bodyInput.value 
    const data = {
        title: postTitle,
        body: postBody
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(res => res.json())
    .then(post => {
        postsArray.unshift(post)
        renderPosts()
        titleInput.value = ''
        bodyInput.value = ''
    })
})