

//Gets yPosition of element from top of entire page, using all parents
function getPosition(element) {
    var yPosition = 0;

    while (element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

//Event listeners for resizing navbar on scroll or resize and highlighting current sections with buttons
window.addEventListener("scroll", function() {
    navbarUpdates();
});
window.addEventListener("resize", function() {
    navbarUpdates();
});

var navbarUpdates = function() {
    //Testing showing scroll and device dimensions
    document.getElementById("testScroll").innerHTML = window.pageYOffset;
    document.getElementById("testWidth").innerHTML = document.body.clientWidth;
    document.getElementById("testWidth2").innerHTML = window.innerWidth;
    document.getElementById("testHeight").innerHTML = window.innerHeight;

    var pageYOffset = window.pageYOffset;

    var navbarItems = [
        document.getElementById("navbar"),
        document.getElementById("navbarContainer"),
        document.getElementById("navbarImage"),
        document.getElementById("navbarName"),
        document.getElementById("navbarButtonsDiv"),
        document.getElementById("bodyContainer"),
    ];
    var navbarButtons = document.getElementsByClassName("navbarButton");

    //Add navbar buttons to array
    navbarItems = navbarItems.concat(Array.from(navbarButtons));

    for(var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].classList.add("scrolled");
    }

    // //If scrolled or always on mobile
    // if(pageYOffset >= 10 || window.innerWidth < 825 || window.innerHeight < 416) {
    //     for(var i = 0; i < navbarItems.length; i++) {
    //         navbarItems[i].classList.add("scrolled");
    //     }
    // }
    // else {
    //     for(var i = 0; i < navbarItems.length; i++) {
    //         navbarItems[i].classList.remove("scrolled");
    //     }
    // }

    //Both navbar and mobile navbar buttons
    var navbarButtons = Array.from(document.getElementsByClassName("navbarButton")).concat(Array.from(document.getElementsByClassName("navbarButtonMobile")));
    var len = navbarButtons.length;

    for(var i = 0; i < len; i++) {
        if(!navbarButtons[i].classList.contains("icon")) {
            var thisJumpOffset = getPosition(document.getElementById(navbarButtons[i].innerHTML.toLowerCase()));

            //Last one of navbar or mobile navbar will not have another div after it
            if(i != len - 3 && i != (len / 2) - 3) {
                var nextJumpOffset = getPosition(document.getElementById(navbarButtons[i + 1].innerHTML.toLowerCase()));

                if(thisJumpOffset < pageYOffset + 25 && pageYOffset < nextJumpOffset - 25) {
                    //If mobile navbar button give to parent
                    if(navbarButtons[i].classList.contains("navbarButtonMobile"))
                        navbarButtons[i].parentElement.classList.add("active");
                    else {
                        navbarButtons[i].classList.add("active");
                    }
                }
                else {
                    //If mobile navbar button give to parent
                    if(navbarButtons[i].classList.contains("navbarButtonMobile"))
                        navbarButtons[i].parentElement.classList.remove("active");
                    else {
                        navbarButtons[i].classList.remove("active");
                    }
                }
            }
            else {
                if(thisJumpOffset < pageYOffset + 25) {
                    //If mobile navbar button give to parent
                    if(navbarButtons[i].classList.contains("navbarButtonMobile"))
                        navbarButtons[i].parentElement.classList.add("active");
                    else {
                        navbarButtons[i].classList.add("active");
                    }
                }
                else {
                    //If mobile navbar button give to parent
                    if(navbarButtons[i].classList.contains("navbarButtonMobile")) {
                        navbarButtons[i].parentElement.classList.remove("active");
                    }
                    else {
                        navbarButtons[i].classList.remove("active");
                    }
                }
            }
        }
    }
}

//Run at startup
$(document).ready(function() {
    navbarUpdates();

    var mobileNavbarMenu = document.getElementById("mobileNavbarMenu");

    mobileNavbarMenu.addEventListener("click", function() {
        var mobileNavbar = document.getElementById("mobileNavbar");

        if(mobileNavbar.classList.contains("open")) {
            mobileNavbar.classList.toggle("open");
            mobileNavbar.style.height = "0px";
        }
        else {
            mobileNavbar.classList.toggle("open");
            mobileNavbar.style.height = mobileNavbar.scrollHeight + "px";
        }
    });

    window.addEventListener("click", function(event) {
        if(event.target.id != "mobileNavbarMenu") {
            var mobileNavbar = document.getElementById("mobileNavbar");

            mobileNavbar.classList.remove("open");
            mobileNavbar.style.height = "0px";
        }
    });
});