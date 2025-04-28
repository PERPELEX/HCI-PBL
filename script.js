// Model
class EventModel {
  constructor(title, description, date, startTime, endTime) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

// View
class SchedulerView {
  static showStatus(message, isSuccess = true) {
    const statusMsg = document.getElementById("status-msg");
    statusMsg.textContent = message;
    statusMsg.style.color = isSuccess ? "green" : "red";
  }

  static clearForm() {
    document.getElementById("event-title").value = "";
    document.getElementById("event-description").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("start-time").value = "";
    document.getElementById("end-time").value = "";
  }
}

// Utility function to format date and time
function formatDateTime(date, time) {
  return date.replace(/-/g, "") + "T" + time.replace(":", "") + "00";
}

// Controller
class SchedulerController {
  static saveEvent() {
    const title = document.getElementById("event-title").value.trim();
    const description = document
      .getElementById("event-description")
      .value.trim();
    const date = document.getElementById("event-date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    // Basic Validation
    if (!title || !description || !date || !startTime || !endTime) {
      SchedulerView.showStatus("Please fill all fields!", false);
      return;
    }

    // Time Validation
    if (startTime >= endTime) {
      SchedulerView.showStatus("Start time must be before end time!", false);
      return;
    }

    // Enhanced Date Validation
    const now = new Date();
    const selectedDate = new Date(`${date}T${startTime}`);
    if (selectedDate < now) {
      SchedulerView.showStatus("Event cannot be scheduled in the past!", false);
      return;
    }

    const event = new EventModel(title, description, date, startTime, endTime);
    console.log("Event Saved:", event);

    // Generate Google Calendar Link
    const startDateTime = formatDateTime(date, startTime);
    const endDateTime = formatDateTime(date, endTime);

    const gcalUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(
      description
    )}&dates=${startDateTime}/${endDateTime}&trp=false`;

    // Handle Popup Blocker
    const newWindow = window.open(gcalUrl, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      SchedulerView.showStatus(
        "Failed to open Google Calendar. Please check your popup blocker.",
        false
      );
      return;
    }

    SchedulerView.showStatus("Redirecting to Google Calendar...", true);
    SchedulerView.clearForm();
  }
}

// Attach Controller to Button
document
  .getElementById("save-btn")
  .addEventListener("click", SchedulerController.saveEvent);

// Initialize Flatpickr for the date input
// document.addEventListener("DOMContentLoaded", () => {
//   flatpickr("#event-date", {
//     dateFormat: "Y-m-d", // Customize the format if needed
//   });
// });

// Handle Color Scheme Selector
document.getElementById("color-scheme-btn").addEventListener("click", () => {
  const dropdown = document.getElementById("color-dropdown");
  dropdown.classList.toggle("hidden");
});

document.querySelectorAll(".color-option").forEach((button) => {
  button.addEventListener("click", (event) => {
    const color = event.target.getAttribute("data-color");
    applyColorScheme(color);
  });
});

function applyColorScheme(color) {
  const body = document.body;
  const widget = document.getElementById("scheduler-widget");
  const buttons = document.querySelectorAll("button");
  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");
  const statusMsg = document.getElementById("status-msg");
  const heading = document.querySelector(".heading");
  const dropdown = document.querySelector("#color-dropdown");

  switch (color) {
    case "black":
      body.style.backgroundColor = "#000";
      body.style.color = "#FFF";
      widget.style.backgroundColor = "#333";
      widget.style.borderColor = "#FFF";
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "#444";
        btn.style.color = "#FFF";
        btn.style.borderColor = "#FFF";
      });
      inputs.forEach((input) => {
        input.style.backgroundColor = "#444";
        input.style.color = "#FFF";
        input.style.borderColor = "#FFF";
      });
      labels.forEach((label) => {
        label.style.color = "#FFF";
      });
      statusMsg.style.color = "#FFF";
      heading.style.color = "#FFF";
      dropdown.style.borderColor = "#FFF";
      break;

    case "white":
      body.style.backgroundColor = "#FFF";
      body.style.color = "#000";
      widget.style.backgroundColor = "#F9F9F9";
      widget.style.borderColor = "#000";
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "#EEE";
        btn.style.color = "#000";
        btn.style.borderColor = "#000";
      });
      inputs.forEach((input) => {
        input.style.backgroundColor = "#FFF";
        input.style.color = "#000";
        input.style.borderColor = "#000";
      });
      labels.forEach((label) => {
        label.style.color = "#000";
      });
      statusMsg.style.color = "#000";
      heading.style.color = "#000";
      dropdown.style.borderColor = "#000";
      break;

    default: // "current"
      body.style.backgroundColor = "#E2EAD8"; // Default pastel green
      body.style.color = "#1c1c1c";
      widget.style.backgroundColor = "#F2EBDC"; // Light beige
      widget.style.borderColor = "#000";
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "#64e268"; // Green
        btn.style.color = "#000";
        btn.style.borderColor = "#000";
      });
      inputs.forEach((input) => {
        input.style.backgroundColor = "#F2EBDC"; // Light beige
        input.style.color = "#1c1c1c";
        input.style.borderColor = "#000";
      });
      labels.forEach((label) => {
        label.style.color = "#1c1c1c";
      });
      statusMsg.style.color = "#1c1c1c";
      heading.style.color = "#000";
      dropdown.style.borderColor = "#000";
      break;
  }
}
