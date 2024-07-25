function mouseFollower(){
    let courser =  document.querySelector('.mousefollower');

document.querySelector(".header").addEventListener('mousemove', (data)=>{
    let height = data.target.clientHeight/2;
    let width = data.target.clientWidth/2;
    let x = data.x;
    let y = data.y;
    if(x<width && y===height){
        gsap.to( courser, {
            x : data.x - ((width - data.x)/10),
            y : data.y - (data.y/10)
        })
    }else if(x < width && y < height){
        gsap.to( courser, {
            x : data.x - ((width - data.x)/10),
            y : data.y - ((height - data.y)/10)
        })
    }else if(x === width && y < height){
        gsap.to( courser, {
            x : data.x - (data.x/10),
            y : data.y - ((height - data.y)/10)
        })
    }else if(x > width && y < height){
        gsap.to( courser, {
            x : data.x + (data.x/10),
            y : data.y - ((height - data.y)/10)
        })
    }else if(x > width && y === height){
        gsap.to( courser, {
            x : data.x + (data.x/10),
            y : data.y + (data.y/10)
        })
    }else if(x > width && y > height){
        gsap.to( courser, {
            x : data.x + (data.x/10),
            y : data.y + (data.y/10)
        })
    }else if(x === width && y > height){
        gsap.to( courser, {
            x : data.x + (data.x/10),
            y : data.y + (data.y/10)
        })
    }else{
        gsap.to( courser, {
            x : data.x - ((width - data.x)/10),
            y : data.y + (data.y/10)
        })
    }
    
})
}

mouseFollower();




function page2Animation(){
    gsap.from("page2-content p", {
      y: 120,
      stagger:0.2,
      duration:1,
      scrollTrigger:{
        scroller:"main",
        trigger:"page2",
        start:"top 47%",
        end:"top 46%",
        marker: true,
        scrub:2
      }
    })
}

page2Animation();

function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotive();