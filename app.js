$(document).ready(function () {
    $(window).scroll(function () {

        if ($(this).scrollTop() > 550) {
            $('.navbar').addClass('solid');
            $('.back-to-top').addClass('visible');
        } else {
            $('.navbar').removeClass('solid');
            $('.back-to-top').removeClass('visible');
        }

    });
});


$(document).ready(function () {

    $("a").on('click', function (event) {


        if (this.hash !== "") {

            event.preventDefault();

            // Store hash
            var hash = this.hash;


            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {


                window.location.hash = hash;
            });
        } 
    });
});

function myFunction() {
    const menuItems = document.querySelector(".menu-items");
    if (menuItems.style.display === "block") {
      menuItems.style.display = "none";
    } else {
      menuItems.style.display = "block";
    }
  }


document.addEventListener("DOMContentLoaded", () => {
    const autoTypeElement = document.querySelector(".auto-type");
    const text = ["Full Stack web developer", "JavaScript Enthusiast", "Creative Thinker"];
    const typingSpeed = 100; // Speed of typing each letter
    const delayBetweenWords = 1500; // Delay before typing the next word
    let textIndex = 0;
    let charIndex = 0;
  
    function typeText() {
      if (charIndex < text[textIndex].length) {
        autoTypeElement.textContent += text[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setTimeout(() => {
          autoTypeElement.textContent = "";
          charIndex = 0;
          textIndex = (textIndex + 1) % text.length;
          typeText();
        }, delayBetweenWords);
      }
    }
  
    typeText();
  });
  
