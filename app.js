$(document).ready(function () {
    $(window).scroll(function () {
        // checks if window is scrolled more than 500px, adds/removes solid class
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
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
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

// auto-type js func
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
  
