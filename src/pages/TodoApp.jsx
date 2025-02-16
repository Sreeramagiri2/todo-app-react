import React, { useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    // Function to create a todo
    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, done: false }]);
            setInput('');
        }
    };

    // Function to remove a todo
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Function to toggle todo completion
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    };

    // Function to start editing a todo
    const StartEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

    // Function to save the edited todo
    const saveEdit = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo));
        setEditId(null);
        setEditText('');
    };

    return (
        <div className='container mt-4'>
            <div className="card shadow-lg p-4" style={{ background: 'linear-gradient(135deg, #20002c, #cbb4d4)', backdropFilter: 'blur(10px)', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
                <h2 className="text-center text-dark fw-bold">✨ Todo List</h2>

                {/* Input Field */}
                <div className="d-flex p-3">
                    <input  
                        className="form-control" 
                        type="text" 
                        value={input}
                        placeholder="Enter todo..."
                        onChange={(e) => setInput(e.target.value)}
                        style={{ borderRadius: '8px', border: '2px solid #198754', padding: '10px' }}
                    />
                    <button 
                        className="mx-3" 
                        onClick={addTodo} 
                        style={{ background: '#28a745', color: 'white', fontWeight: 'bold', padding: '10px 15px', border: 'none', borderRadius: '5px', transition: '0.3s' }}>➕AddTask
                    </button>
                </div>

                {/* Todo Items */}
                <div className="list-group mt-3">
                    {todos.map((todo) => (
                        <li 
                            key={todo.id} 
                            className="list-group-item d-flex justify-content-between align-items-center" 
                            style={{ background: '#fff', borderRadius: '8px', padding: '10px', marginBottom: '10px', transition: 'transform 0.2s' }}
                        >
                            {
                                editId === todo.id ? (
                                    <input  
                                        className="form-control me-2" 
                                        type="text" 
                                        value={editText}
                                        placeholder="Enter todo..."
                                        onChange={(e) => setEditText(e.target.value)}
                                        style={{ borderRadius: '8px', border: '2px solid #198754', padding: '10px' }}
                                    />
                                ) : (
                                    <span style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? 'gray' : 'black' }}>
                                        {todo.text}
                                    </span>
                                )
                            }

                            {/* Buttons */}
                            {
                                editId === todo.id ? (
                                    <button 
                                        onClick={() => saveEdit(todo.id)} 
                                        style={{ background: '#17a2b8', color: 'white', fontWeight: 'bold', padding: '5px 10px', border: 'none', borderRadius: '5px', transition: '0.3s' }}
                                    >
                                        💾 Save
                                    </button>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => StartEdit(todo.id, todo.text)} 
                                            style={{ background: '#007bff', color: 'white', fontWeight: 'bold', padding: '5px 10px', border: 'none', borderRadius: '5px', transition: '0.3s' }}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button 
                                            onClick={() => toggleTodo(todo.id)} 
                                            style={{ background: todo.done ? '#6c757d' : '#ffc107', color: todo.done ? 'white' : 'black', fontWeight: 'bold', padding: '5px 10px', border: 'none', borderRadius: '5px', transition: '0.3s' }}
                                        >
                                            {todo.done ? '🔄 Undo' : '✅ Done'}
                                        </button>
                                    </>
                                )
                            }

                            <button 
                                onClick={() => removeTodo(todo.id)} 
                                style={{ background: '#dc3545', color: 'white', fontWeight: 'bold', padding: '5px 10px', border: 'none', borderRadius: '5px', transition: '0.3s' }}
                            >
                                🗑️ Delete
                            </button>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
