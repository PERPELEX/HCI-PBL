// Animate the widget on page load
gsap.from("#scheduler-widget", {
  duration: 1,
  opacity: 0,
  y: -50,
  ease: "power2.out",
});

// Animate inputs when they are focused
const inputs = document.querySelectorAll("#scheduler-widget input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    gsap.to(input, {
      duration: 0.05,
      scale: 1.05,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    });
  });

  input.addEventListener("blur", () => {
    gsap.to(input, {
      duration: 0.05,
      scale: 1,
      boxShadow: "none",
    });
  });
});

// Animate the save button on hover
const saveButton = document.querySelector("#save-btn");
saveButton.addEventListener("mouseenter", () => {
  gsap.to(saveButton, {
    duration: 0.05,
    scale: 1.1,
    backgroundColor: "#1c1c1c",
    color: "#F2EBDC",
  });
});

saveButton.addEventListener("mouseleave", () => {
  gsap.to(saveButton, {
    duration: 0.05,
    scale: 1,
    backgroundColor: "#64e268",
    color: "#000",
  });
});
