const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
        y: 0,
        delay:-1,
        duration:2,
        ease: Expo.easeInOut,
        stagger: .2
    })

    .from("#herofooter",{
        y: -10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
}


// jab mouse move ho to hum log circle ka shape chnage kare, aur max and min skew dfine karpaay
// jab mouse move ho then chapta ki value badhe,
// or jab mouse ruk jay then then chapta hatalo

var timeout;

function circleChaptaKaro(){
    // define default scale value
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;


    window.addEventListener("mousemove",function(dets){
        this.clearTimeout(timeout);
        var xdiff=dets.clientX-xprev;
        var ydiff=dets.clientY-xprev;

        xprev=dets.clientX;
        yprev=dets.clientY;

        xscale=gsap.utils.clamp(.8,1.2,xdiff);
        yscale=gsap.utils.clamp(.8,1.2,ydiff);

        // console.log(gsap.utils.clamp(.8,1.2,xdiff),gsap.utils.clamp(.8,1.2,ydiff));

        circleMouseFollower(xscale,yscale);

        timeout=setTimeout(function(){
        document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;

        },100);
        
    });
}



function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        // console.log(dets.clientX,dets.clientY);

        document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

circleMouseFollower();
circleChaptaKaro();
firstPageAnim();


//teeno element ko select karo, then un per musemove lagao,then ye pta karo ki mouse
// kaha per h (mouse ki x & y position) , ab mouse ki  x and y position k badlle us 
// img ko show karo and move karo and roate karo
// mouse tej chale to rotation bhi tej hojay

document.querySelectorAll(".elem").forEach(function(elem){

    var rotate=0;
    var diffrot =0;

    elem.addEventListener("mouseleave", function (details) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });

        gsap.to(elem.querySelector("h1"), {
            opacity: 0.7,
            ease: Power2,
            marginLeft:"0px",
            duration: .7,  

           
          });
      });

    


    elem.addEventListener("mousemove",function(details){


        var diff=details.clientY-elem.getBoundingClientRect().top;

        diffrot=details.clientX-rotate;
        rotate=details.clientX;

        gsap.to(elem.querySelector("h1"),{
            opacity :0.3,
            ease :Power2,
            marginLeft: "30px", // Adjust this value as needed
            duration: .7,       // Duration of the animation in seconds
            // ease: "power1.inOut" // Easing function (adjust as needed)
        });
        
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left : details.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot*0.5)
        });

        console.log(details.clientX,details.clientY);
    });
});