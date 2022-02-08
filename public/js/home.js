$(document).ready(() => {
    $.get("/api/posts", (results) => {
        console.log("the results is",results)
        outputPosts(results.data, $(".postsContainer"))
    });
})

function outputPosts(results, container) {
    container.html("");
    console.log(results.length);
    results.forEach(post => {
        document.getElementById('home').innerHTML += `<div class='post'>
       <div class='mainContentContainer'>
           <div class='userImageContainer'>
               <img src='${post.postedBy.profilePic}'>
           </div>
           <div class='postContentContainer'>
               <div class='header'>
                   <a href='/profile/${post.postedBy.userName}' class='displayName'>${post.postedBy.firstName + " " + post.postedBy.lastName}</a>
                   <span class='username'>@${post.postedBy.userName}</span>
                   <span class='date'>${post.createdAt}</span>
               </div>
               <div class='postBody'>
                   <span>${post.content}</span>
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
                         <button>
                             <i class='far fa-heart'></i>
                         </button>
                    </div>
                </div>
           </div>
       </div>
   </div>`;
    });

    if(results.length == 0) {
        document.getElementById('home').innerHTML = "<h2 class='text-center text-primary'> Nothing to show</h2>"
    }
}