document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Initial display
  showSlide(currentSlide);

  // Event listeners for "prev" and "next" buttons
  document.querySelectorAll(".prev").forEach((button) => {
    button.addEventListener("click", prevSlide);
  });

  document.querySelectorAll(".next").forEach((button) => {
    button.addEventListener("click", nextSlide);
  });
});
/// HIDDEN POP UP
// Get all the links inside the popUp div
let popupLinks = document.querySelectorAll("#popUp a");

// Function to hide the popUp div
function hidePopup() {
  let popup = document.getElementById("popUp");
  popup.style.display = "none";
  return false; // Prevent the default behavior of the link
}

// Attach click event listeners to all links inside the popUp div
popupLinks.forEach(function (link) {
  link.addEventListener("click", hidePopup);
});
