let content = null;
$("html").ready(function() {
    // get width and height of the window and set it to the html element
    const width = $(window).width();
    const height = $(window).height();
    $.getJSON('./json/content.json', function(data) {
        content = data;
        loadContents(content);
        setupCas();
    }); 
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


const cards = $('.project-card');

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



// load contents
function loadContents (contents){
    $(".dat-name").text(contents.name.toUpperCase());
    $(".dat-subject").text(contents.subject);

    // contacts
    $(".email-link").attr('href', `mailto:${contents.contact.email}`);
    $(".linkedin-link").attr('href', contents.contact.linkedin);
    $(".phone-link").attr('href', `tel:${content.contact.phone.replaceAll(' ', '')}`);
    $(".github-link").attr('href', contents.contact.github);

    // bio
    $(".dat-bio").text(contents.bio);

    // projects
    contents.projects.forEach((project, index) => {
        const element = $(`
            <li class="project-card ${index == 0? 'selected-card': ''}">
                        <div class="project-card-body">
                            <div class="project-card-title">
                                <h2 class="dat-projects-name" >${project.name}</h2>
                            </div>
                            <div class="project-card-description dat-projects-description">
                                <p> ${project.description }</p>
                            </div>
                            <div class="project-card-skils ">
                                ${
                                    project.techStack.map((skil) => {
                                        return `<div class="project-card-skil">${skil}</div>`;
                                    }).join('')
                                }
                            </div>
                            <div class="project-card-links">
                                <a href="${project.github}">Github</a>
                                <a href="${project.live}">Live</a>
                            </div>
                        </div>
                    </li>
        `);


        $(".dat-projects-list").append(element);
    });
    
    // skills
    contents.skills.forEach((skill,index)=>{

        const skillCard = $(`
        <div class="skill-pad-wrap">
                        <div class="skill-pad">
                            <div class="skill-icon">
                                <img src="${skill.icon}" alt="" srcset="">
                            </div>
                            <div class="skill-content">
                                <div class="skill-name">${skill.name}</div>
                                <div class="skill-rating">
                                    ${(() => {
                                        let stars = "";
                                        for (let i = 0; i < skill.rating; i++) {
                                            stars += '<img src="./assets/icons/star-solid.svg" alt="" srcset="">';
                                        }
                                        return stars;
                                    })()}
                                    
                                </div>
                        </div>
                        </div>
                    </div>
        `);

        $(".dat-skills-list").append(skillCard);

    })
    

    // footer contacts
    $(".dat-email").text(contents.contact.email);
    $(".dat-phone").text(contents.contact.phone);
    $(".dat-github").text(contents.contact.github.split('/').pop());
    $(".dat-linkedin").text(contents.contact.linkedin.split('.com/').pop());
    
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




function setupCas(){

    const cas = new Carousel({
        parentClass: "project-cas",
        childClass: "project-card",
        activeClass: "selected-card",
        sqx: 3,
        sqy: 0.5,
    });

    
    // card flip

    $('.pj-nav-btn-l').click(function() {
        cas.move('l');
    });

    $('.pj-nav-btn-r').click(function() {
        cas.move('r');
    });

    //  project card show all button
    $('.pj-show-all-btn').click(function() {
        
    });


}