const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load saved tasks
window.addEventListener('load', loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
}

// Add new task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  renderTask(text);
  saveTasks();
  taskInput.value = '';
});

function renderTask(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task';
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;

  // Toggle complete
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    li.style.opacity = '0';
    li.style.transform = 'translateX(20px)';
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 300);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}