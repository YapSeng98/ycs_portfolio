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
function openPowerappsSkill() {
  window.location.href = "powerApps.html";
}
function openServiceNowSkill() {
  window.location.href = "serviceNow.html";
}
function openDecisionsSkill() {
  window.location.href = "decisions.html";
}
function openLinkedin() {
  window.open('https://www.linkedin.com/in/chung-seng-yap-9478111bb', "_blank");
}
function sendEmail() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const from = document.getElementById("from");
    from.value = email;
    const body = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`;
    window.location.href = `mailto:ycseng0398@gmail.com?subject=New message from ${name} via Linkedin&body=${encodeURIComponent(body)}`;
  });
}