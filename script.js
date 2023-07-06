let allComments = [];
let commentID;
let badWord = "similique"; //jaki placeholder?

fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((comments) => {
    allComments = comments;
    console.log(allComments);
    displayComments(allComments);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function displayComments(comments) {
  const commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";

  comments.forEach((comment) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" name="select" /></td>
      <td>${comment.name}</td>
      <td>${comment.email}</td>
      <td>${comment.body}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    commentList.appendChild(tr);
  });
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.parentNode.parentNode;

    row.remove();
  }
});

const deleteSelectedBtn = document.querySelector(".btn-selected");
deleteSelectedBtn.addEventListener("click", () => {
  const selectedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  selectedCheckboxes.forEach((checkbox) => {
    const row = checkbox.parentNode.parentNode;
    row.remove();
  });
});

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const bodyInput = document.querySelector('input[name="body"]');

  if (
    nameInput.value !== "" &&
    emailInput.value === "" &&
    bodyInput.value === ""
  ) {
    const searchName = nameInput.value.trim().toLowerCase();
    const filteredComments = allComments.filter((comment) =>
      comment.name.toLowerCase().includes(searchName)
    );
    displayComments(filteredComments);
  } else if (
    nameInput.value === "" &&
    emailInput.value !== "" &&
    bodyInput.value === ""
  ) {
    const searchName = emailInput.value.trim().toLowerCase();
    const filteredComments = allComments.filter((comment) =>
      comment.email.toLowerCase().includes(searchName)
    );
    displayComments(filteredComments);
  } else if (
    nameInput.value === "" &&
    emailInput.value === "" &&
    bodyInput.value !== ""
  ) {
    const searchName = bodyInput.value.trim().toLowerCase();
    const filteredComments = allComments.filter((comment) =>
      comment.body.toLowerCase().includes(searchName)
    );
    displayComments(filteredComments);
  } else return alert("only one value!");
});

//////////////////////////////////////
const hateSpeech = document.querySelector(".btn-hate-speech");

hateSpeech.addEventListener("click", (event) => {
  event.preventDefault();

  displayCommentsHateSpeech(allComments);
});

function displayCommentsHateSpeech(comments) {
  const commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";

  comments.forEach((comment) => {
    const checking =
      comment.name.includes(badWord) || comment.body.includes(badWord);
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td ><input type="checkbox" name="select" }></td>
      <td class=${checking ? "hate-speech" : ""}>${comment.name}</td>
      <td class=${checking ? "hate-speech" : ""}>${comment.email}</td>
      <td class=${checking ? "hate-speech" : ""}>${comment.body}</td>
      <td ><button class="delete-btn">Delete</button></td>
    `;
    commentList.appendChild(tr);
  });
}
const curPageVisible = document.querySelector(".page-current");
const btnMoveLeft = document.querySelector(".btn-page-left");
const btnMoveRight = document.querySelector(".btn-page-right");

let page = 1;

const numPage = 25; //given

btnMoveLeft.addEventListener("click", (event) => {
  event.preventDefault();
  if (page >= 2) {
    page--;
  }
  curPageVisible.textContent = `${page}`;
});

btnMoveRight.addEventListener("click", (event) => {
  event.preventDefault();
  if (page < numPage) {
    page++;
  }
  curPageVisible.textContent = `${page}`;
});

const selectPost = document.querySelector(".select-post");
const windowComments = document.querySelector(".comments");

selectPost.addEventListener("click", (event) => {
  event.preventDefault();
  windowComments.innerHTML = "";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      allPosts = posts;
      console.log(allPosts);
      displayPosts(allPosts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function displayPosts(posts) {
    allPosts.forEach((post) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${post.title}</td>
        <td><button class="show-comment-btn" id="${post.id}">show comment</button></td>
      `;
      windowComments.appendChild(tr);
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("show-comment-btn")) {
      commentID = event.srcElement.attributes.id.value;
      console.log(commentID);
      console.log(allComments);
      windowComments.innerHTML = `
      <table id="comment-table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Email</th>
          <th>Body</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="comment-list"></tbody>
      </table>`;

      displayCommentsPosts(allComments, commentID);
    }
  });

  const displayCommentsPosts = function (comments, commentID) {
    const commentList = document.getElementById("comment-list");
    commentList.innerHTML = "";
    // console.log(+commentID);
    comments.forEach((comment) => {
      // console.log(+comment.postId);
      if (+comment.postId === +commentID) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td><input type="checkbox" name="select" /></td>
        <td>${comment.name}</td>
        <td>${comment.email}</td>
        <td>${comment.body}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
        commentList.appendChild(tr);
      }
    });
  };
});
