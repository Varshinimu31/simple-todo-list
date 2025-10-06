const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

window.onload = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task!');
  renderTask(taskText);
  saveTasks();
  taskInput.value = '';
}

function renderTask(text, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  if (completed) li.classList.add('completed');
  
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => {
    const newText = prompt('Edit your task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
      saveTasks();
    }
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const span = li.querySelector('span');
    tasks.push({ text: span.textContent, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

