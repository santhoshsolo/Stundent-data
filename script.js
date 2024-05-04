let students = []; // Array to store student data
let filteredStudents = []; // Array to store filtered student data

// Function to fetch student data from the provided URL
async function fetchStudentData() {
    const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
    students = await response.json();
    filteredStudents = students.slice(); // Make a copy for filtering
    renderTables();
}

// Function to render the tables
function renderTables() {
    const tablesContainer = document.getElementById('tablesContainer');
    tablesContainer.innerHTML = ''; // Clear previous tables

    // Separate students by gender
    const maleStudents = filteredStudents.filter(student => student.gender === 'Male');
    const femaleStudents = filteredStudents.filter(student => student.gender === 'Female');

    // Create and render tables for male and female students
    tablesContainer.innerHTML += `<table><caption>Male Students</caption>${generateTableHTML(maleStudents)}</table>`;
    tablesContainer.innerHTML += `<table><caption>Female Students</caption>${generateTableHTML(femaleStudents)}</table>`;
}

// Function to generate HTML for the table
function generateTableHTML(data) {
    let tableHTML = '<thead><tr><th>Name</th><th>Email</th><th>Marks</th><th>Passing</th></tr></thead><tbody>';
    data.forEach(student => {
        const fullName = `${student.first_name} ${student.last_name}`;
        const passingStatus = student.passing ? 'Passing' : 'Failed';
        tableHTML += `<tr><td><img src="${student.avatar}" alt="${fullName}" class="avatar">${fullName}</td><td>${student.email}</td><td>${student.marks}</td><td>${passingStatus}</td></tr>`;
    });
    tableHTML += '</tbody>';
    return tableHTML;
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    filteredStudents = students.filter(student => {
        return student.first_name.toLowerCase().includes(searchInput) ||
               student.last_name.toLowerCase().includes(searchInput) ||
               student.email.toLowerCase().includes(searchInput);
    });
    renderTables();
}

// Functions to handle sorting
function sortAZ() {
    filteredStudents.sort((a, b) => (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name));
    renderTables();
}

function sortZA() {
    filteredStudents.sort((a, b) => (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name));
    renderTables();
}

function sortByMarks() {
    filteredStudents.sort((a, b) => a.marks - b.marks);
    renderTables();
}

function sortByPassing() {
    filteredStudents = students.filter(student => student.passing);
    renderTables();
}

function sortByClass() {
    filteredStudents.sort((a, b) => a.class - b.class);
    renderTables();
}

function sortByGender() {
    renderTables(); // Just re-render the tables to separate by gender
}

// Fetch student data when the page loads
window.onload = fetchStudentData;
