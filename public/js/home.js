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
                   <span class='date'>${timeDifference(new Date(), new Date(post.createdAt))}</span>
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


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         if(elapsed /1000 < 30) return "Just now";
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}