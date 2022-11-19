$("html").ready(function() {
    // get width and height of the window and set it to the html element
    const width = $(window).width();
    const height = $(window).height();
    $("html").css("width", width);
    $("html").css("height", height);
    $("body").css("width", width);
    $("body").css("height", height);
});


// menu toggle
$(".burger-menu").click(function() {
    $(".nav-bar").toggleClass("open");
});

$(".closing-cross").click(function() {
    $(".nav-bar").toggleClass("open");
});

$('.nav-bar a').click(function() {
    $(".nav-bar").toggleClass("open");
});



// card flip
const cards = $('.project-card');

$('.pj-nav-btn-l').click(function() {
    const current = $('.selected-card');
    console.log(current.prev());
    if(current.prev().length === 0) {
        showPopup('beginning of the list');
        return;
    }
    current.toggleClass('selected-card');
    current.prev().toggleClass('selected-card');
});

$('.pj-nav-btn-r').click(function() {
    const current = $('.selected-card');
    if(current.next().length === 0) {
        showPopup('End of the list');
        return;
    }
    current.toggleClass('selected-card');
    current.next().toggleClass('selected-card');
});

//  project card show all button
$('.pj-show-all-btn').click(function() {
    
});


// popup 
function showPopup (msg) {
    const popup = $(`#popup`);
    popup.css('display', 'flex');
    popup.text(msg);
    popup.toggleClass('open');
    setTimeout(closePopup, 3000);
}

function closePopup() {
    const popup = $(`#popup`);
    popup.toggleClass('open');
    setTimeout(() => {
        popup.text('');
        setTimeout(() => {
            popup.css('display', 'none');
        }, 500);
    }, 500);
}


// $(function() {    
//     if (/ipad|iphone/gi.test(window.navigator.userAgent)) {
//     var events = "abort blur focus input scroll submit touchstart touchmove";
//     $("form, input").on(events, function(e) {
//       return (function(window, elem, w, h) {
//                var vh = window.getComputedStyle(elem,null).getPropertyValue(h);
//                var vw = window.getComputedStyle(elem,null).getPropertyValue(w);
//                var vwh = { 
//                            "documentWidth": vw, 
//                            "documentHeight": vh, 
//                            "windowInnerWidth": window.innerWidth, 
//                            "windowInnerHeight": window.innerHeight
//                          };
//                console.log(vwh);
//                var _vwh = document.getElementsByTagName("body")[0];
//                _vwh.width = vwh.windowInnerWidth;
//                 _vwh.height = vwh.windowInnerHeight;
//                return vwh 
//               }(window, document.documentElement, "width", "height"));
//     }).focus();
//     };
// })