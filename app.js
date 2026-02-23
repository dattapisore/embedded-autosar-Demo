const tasks = [
  "Complete personal details",
  "Review IT security policy",
  "Sign employment documents",
  "Submit equipment request",
  "Book orientation session",
];

const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const submissionStatus = document.getElementById("submissionStatus");
const form = document.getElementById("onboardingForm");
const themeToggle = document.getElementById("themeToggle");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${i}`;
    checkbox.addEventListener("change", updateProgress);

    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.textContent = task;

    li.append(checkbox, label);
    taskList.appendChild(li);
  });
}

function updateProgress() {
  const checked = taskList.querySelectorAll("input:checked").length;
  const percent = Math.round((checked / tasks.length) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}% completed`;
}

async function submitToServiceNow(payload) {
  // Replace placeholders with your real ServiceNow details.
  const serviceNowConfig = {
    instanceUrl: "https://your-instance.service-now.com",
    username: "api.user",
    password: "replace-with-secure-token",
  };

  const url = `${serviceNowConfig.instanceUrl}/api/now/table/sc_req_item`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${serviceNowConfig.username}:${serviceNowConfig.password}`)}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ServiceNow API error (${response.status}): ${errText}`);
  }

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  submissionStatus.textContent = "Submitting onboarding request...";

  const formData = new FormData(form);
  const payload = {
    requester: `${formData.get("firstName")} ${formData.get("lastName")}`,
    email: formData.get("email"),
    department: formData.get("department"),
    manager: formData.get("manager"),
    start_date: formData.get("startDate"),
    equipment: formData.get("equipment"),
    notes: formData.get("notes"),
  };

  try {
    const result = await submitToServiceNow(payload);
    submissionStatus.textContent = `Request submitted successfully. RITM: ${result?.result?.number ?? "created"}`;
    form.reset();
  } catch (error) {
    submissionStatus.textContent = `Submission failed. ${error.message}`;
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderTasks();
updateProgress();
