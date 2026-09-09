// Basic form validation for enquiry.html
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before submitting.");
      event.preventDefault(); // stop form submission
    } else {
      alert("Thank you for your enquiry, " + name + "!");
    }
  });
});
