// DOM要素の取得
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');

// ローカルストレージからTODOを読み込む
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// TODOを保存する
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// TODOリストを描画する
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}
                   onchange="toggleTodo(${index})">
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">削除</button>
        `;

        todoList.appendChild(li);
    });

    updateCount();
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// TODOを追加する
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    todoInput.value = '';
    saveTodos();
    renderTodos();
}

// TODOを削除する
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// TODOの完了/未完了を切り替える
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// カウントを更新する
function updateCount() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    todoCount.textContent = `タスク: ${total}件 (完了: ${completed}件)`;
}

// イベントリスナーの設定
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 初期描画
renderTodos();
