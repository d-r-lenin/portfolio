
// menu toggle
$(".burger-menu").click(function() {
    $(".nav-bar").toggleClass("open");
});
$(".closing-cross").click(function() {
    $(".nav-bar").toggleClass("open");
});



const pjc = $(".projects-body")
const ar = [];

for (let index = 0; index < 1; index++) {
    const element = document.createElement("div");

    element.classList.add(`pj-pad-${index}`);

    ar.push(element);
    pjc.append(element);
}


addStyle(`
.pj-pad-0 {
    position: absolute;
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
    animation: move 2s ease-in-out infinite alternate;


}

@keyframes move {
    0% {
        transform: translate(-50%, -50%);
    }
    50% {
        width: 200px;
        height: 200px;
        top: 0;
        left: 0;
    }
    100% {
        transform: translate(-50%, -50%) ;
        width: 100px;
        height: 100px;
    }
}

@keyframes shadow {
    0% {
        transform: translate(-50%, -50%);
    }
    50% {
        top: 20%;
        width: 90px;
        height: 90px;
        filter: blur(20px);
    }
    100% {
        transform: translate(-50%, -50%) ;
        width: 100px;
        height: 100px;
    }
}

.pj-pad-1 {
    position: absolute;
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: gray;
    animation: shadow 2s ease-in-out infinite alternate;
}

`)


// to add new style role to head
function addStyle (style) {
    const head = document.head;
    const styleTag = document.createElement("style");
    //to assign random id to style tag
    styleTag.id = Math.random().toString(36).substring(7);
    styleTag.innerHTML = style;
    head.append(styleTag);
    return styleTag.id;
}


// to remove style tag from head
function removeStyle(id) {
    const styleTag = document.getElementById(id);
    styleTag.remove();
}
