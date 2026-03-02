import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Состояние задач 
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // Состояние для таймера
  const [seconds, setSeconds] = useState(0);

  // --- ЭФФЕКТЫ (useEffect) ---

  // Загрузка при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Сохранение в localStorage при каждом изменении todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Таймер времени в приложении
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup функция 
    return () => clearInterval(interval);
  }, []);

  

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    // Создаем новый массив
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    // создание  нового массива
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    // удаление
    setTodos(todos.filter(todo => todo.id !== id));
  };

  
  const total = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const remaining = total - completedCount;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Форматирование времени
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins} мин ${secs} сек`;
  };

  return (
    <div className="container">
      <h1>Мой Todo Список</h1>
      
      {/* Таймер */}
      <div className="timer">
        Вы в приложении: {formatTime(seconds)}
      </div>

      {/* Статистика */}
      <div className="stats">
        <p>Всего: <strong>{total}</strong></p>
        <p>Выполнено: <strong>{completedCount}</strong></p>
        <p>Осталось: <strong>{remaining}</strong></p>
        <p>Прогресс: <strong>{percentage}%</strong></p>
      </div>

      <div className="input-group">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Что нужно сделать?"
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;