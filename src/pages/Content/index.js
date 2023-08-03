// import { printLine } from './modules/print';

console.log('Content script works! 12312365135');
console.log('Must reload extension for modifications to take effect.');

// const timer = setInterval(() => {
//     const allVideos = document.getElementsByTagName("video");
//     if(allVideos[0]) {
//         console.log("Play timeL ", allVideos[0].currentTime);
//     }
// }, 2000);
let addedControl = false;
const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

function addVideoControl() {
    const allVideos = document.querySelectorAll('video');
    if(allVideos.length) {
        allVideos.forEach(item => {
            item.addEventListener('playing', function() {
                console.log("Video is playing");
                this.setAttribute("controls", "controls");
            })
        })
        // const playingVideo = Array.from(allVideos).find(item => isVideoPlaying(item));
        // console.log("PP", allVideos, playingVideo);
        // playingVideo?.setAttribute("controls", "controls");
    }
};

function checkVideoItem() {
    const allVideos = document.querySelectorAll('video');
    return allVideos.length > 0;
}


function runFunction() {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(item => {
        const rect = item.getBoundingClientRect();
        if(rect.top > 0 && rect.top < (window.innerHeight / 2)) {
            item.nextSibling.style.display = 'none';
            item.addEventListener('playing', function() {
                console.log("Video is playing");
                this.setAttribute("controls", "controls");
            })
            item.addEventListener("ended", function() {
                console.log("Scroll now");
                const height = document.querySelector('main div').scrollTop;
                document.querySelector('main div').scrollTop = height + 500
            })
        }
    });







    // while(!addedControl) {
    //     const hasVideoItem = checkVideoItem();
    //     if (hasVideoItem) {
    //         addedControl = true;
    //         addVideoControl();
    //         hideTitle(); 
    //     }
    // }
    // if(!hideComplete) {
    // setTimeout(() => {nb]]
    //     addVideoControl();
    //     hideTitle();
    //     // }
    // }, 3000);
}
// document.addEventListener('DOMContentLoaded', ()=>{
//     runFunction();
// })




// function some (){
//    if(document.readyState == 'loading') {
//     document.addEventListener('DoMcONTENt isloaded', some);
//    }else{
//     some()
//    }
//    console.log(document.readyState);
//    document.addEventListener('readyStatechange',()=>console.log(document.readyState))
   
// }
const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("main");
    if (checkVideoItem()) {
        runFunction();
    }
    const observer = new MutationObserver(mutations => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        console.log("URL Changed");
        runFunction();
      }
    });
    observer.observe(body, { attributes: true, childList: true, subtree: true });
  };





window.addEventListener('load', () => {
    observeUrlChange();      
})
