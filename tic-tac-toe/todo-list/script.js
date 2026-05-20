// 1. Grab HTML elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 2. Load saved tasks from localStorage when the page opens
// If there are no saved tasks, default to an empty array []
let tasks = JSON.parse(localStorage.getItem('myTodoList')) || [];

// 3. Render the tasks on the screen right away
renderTasks();

// 4. Listen for when the user clicks the "Add" button
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    
    if (taskText !== "") {
        tasks.push(taskText); // Add new task to our array
        updateStorageAndUI(); // Save and refresh the screen
        todoInput.value = ""; // Clear the input box
    }
});

// 5. Function to display the tasks on the webpage
function renderTasks() {
    todoList.innerHTML = ""; // Clear the list first to avoid duplicates
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// 6. Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove 1 item from the array at that position
    updateStorageAndUI();   // Save and refresh the screen
}

// 7. Helper function to sync local storage and redraw the UI
function updateStorageAndUI() {
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
    renderTasks();
}