// DOM Elements
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const submitBtn = document.getElementById("submitBtn");

// Load students from localStorage or initialize empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// Render table initially
renderTable();

// Form Submit Handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const studentId = document.getElementById("studentId").value.trim();

  // Validation
  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }
  if (!/^\d+$/.test(studentId)) {
    alert("Student ID must be a number.");
    return;
  }
  if (!/^\d{10,}$/.test(contact)) {
    alert("Contact must be at least 10 digits.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Invalid email address.");
    return;
  }

  const newStudent = { name, email, contact, id: studentId };
  const editingIndex = form.dataset.editing;

  if (editingIndex !== undefined) {
    // Update existing student
    students[editingIndex] = newStudent;
    submitBtn.textContent = "Add Student";
    form.removeAttribute("data-editing");
  } else {
    // Add new student
    students.push(newStudent);
  }

  // Save to localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Re-render table and reset form
  renderTable();
  form.reset();
});

// Function to render the table
function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Name">${student.name}</td>
      <td data-label="Email">${student.email}</td>
      <td data-label="Contact">${student.contact}</td>
      <td data-label="ID">${student.id}</td>
      <td data-label="Actions">
        <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Edit student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  document.getElementById("studentId").value = student.id;

  form.dataset.editing = index;
  submitBtn.textContent = "Update Student";
}

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}
