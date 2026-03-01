import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 1. CREATE
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  // 2. UPDATE (Toggle)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 3. DELETE
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 4. EDIT
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
  };

  // Статистика
  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="app-container">
      <h1>Задачи: {activeCount} активных</h1>
      
      <div className="input-group">
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'done' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            
            {editingId === todo.id ? (
              <input value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={() => saveEdit(todo.id)} autoFocus />
            ) : (
              <span onDoubleClick={() => startEdit(todo)}>{todo.text}</span>
            )}

            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;