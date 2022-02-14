
$("#postTextarea").keyup(event => {
    var value = (event.target.value).trim();
    var submitButton = $("#submitPostButton");
    if (value == "") {
        submitButton.prop('disabled', true);
        return
    } else {
        submitButton.prop('disabled', false);
    }
})

const submitButton = document.getElementById('submitPostButton')

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    var value = document.getElementById('postTextarea');
    var data = {
        content: (value.value).trim()
    }
    $.post("/api/posts", data, (postData) => {
        console.log(postData);
        value.value = "";
        submitButton.disabled = true;
        var postedBy = postData.data.postedBy;
        var displayName = postData.data.postedBy.firstName + " " + postData.data.postedBy.lastName;
        var timestamp = timeDifference(new Date(), new Date(postData.data.createdAt));
        document.getElementById('home').innerHTML += `<div class='post' data-id='${postData.data._id}'>
       <div class='mainContentContainer'>
           <div class='userImageContainer'>
               <img src='${postedBy.profilePic}'>
           </div>
           <div class='postContentContainer'>
               <div class='header'>
                   <a href='/profile/${postedBy.userName}' class='displayName'>${displayName}</a>
                   <span class='username'>@${postedBy.userName}</span>
                   <span class='date'>${timestamp}</span>
               </div>
               <div class='postBody'>
                   <span>${postData.data.content}</span>
               </div>
               <div class='postFooter'>
                    <div class='postButtonContainer'>
                        <button>
                            <i class='far fa-comment'></i>
                        </button>
                     </div>
                     <div class='postButtonContainer'>
                        <button>
                         <i class='fas fa-retweet'></i>
                        </button>
                    </div>
                     <div class='postButtonContainer'>
                         <button class="likeButton">
                             <i class='far fa-heart'></i>
                         </button>
                    </div>
                </div>
           </div>
       </div>
   </div>`;
    })
})


const likeButton = document.getElementsByClassName('likeButton')


document.addEventListener('click', function(event) {
    if(event.target.className.includes("fa-heart")) {
        let postId = getPostId(event.target);
        console.log(postId);

        if(postId == undefined || postId == null) return

        // put request to like
        $.ajax({
            url: `/api/posts/${postId}/like`,
            method: 'PUT',
            success: (data) => {
                console.log(data);
                if(data.success) {
                    event.target.classList.remove('far');
                    event.target.classList.add('fas');
                }
            }
        });
    }
});

function getPostId(element) {
    const isRootElement = element.className.includes('post');
    let postId = isRootElement ? element : element.closest(".post")
    postId = postId.dataset.id
    return postId;
}