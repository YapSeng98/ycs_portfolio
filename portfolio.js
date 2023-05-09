window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var scrollToTopButton = document.getElementById("scrollToTopButton");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleNav() {
  var navCollapse = document.getElementById("navbar-collapse");
  if (navCollapse.classList.contains("open")) {
    navCollapse.classList.remove("open");
  } else {
    navCollapse.classList.add("open");
  }
}
