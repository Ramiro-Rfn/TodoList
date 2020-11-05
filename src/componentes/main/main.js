import React, {useState, useEffect} from 'react';

import deleteIcon  from '../../assets/delete_icon_gray.svg';

import './main.css';

function Main(){
    const ItemInStorage = JSON.parse(localStorage.getItem('listTodos')) || []

    const [todos, setTodos] = useState(ItemInStorage);
    const [value, setValue] = useState('');

    function addTodo(){
        if(value){
            setTodos([...todos, {id: Math.random(), todoText: value, isDisabled: false}]);
            setValue('')
            console.log(todos)
        }
    };

    function handleInputChange(event){
        setValue(event.target.value);
    }
    
    useEffect(()=>{
        console.log(todos)
        saveToStorage()
    },[todos])
    



    function saveToStorage() {
        localStorage.setItem('listTodos', JSON.stringify(todos))
    };

    let todoLenght = todos.length;

    function deleteTodos (todo){

        setTodos(todos.filter((item)=>{
            return item !== todo;
        }));
        
        console.log(todos);
    };

    return (
        <div id="app">
            <div className="add-todo">
                <input type="text" 
                    required 
                    placeholder="Dite um novo todo"
                    value={value}
                    onChange={handleInputChange}
                />

                <button className="button-add" onClick={addTodo}>Adicionar</button>
            </div>

            <div className="todo-counter">
                <p>Total de {todoLenght} coisas para fazer na lista.</p>
            </div>

            <ul>
                {todos.map((todo)=>{
                    return (
                        <li key={todo.id}>
                            <p>
                                <input  
                                    type="checkbox"
                                />
                                {todo.todoText}
                            </p>
                            <button className="deletebutton" onClick={()=>deleteTodos(todo)}><img src={deleteIcon} alt="lixeira"/></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Main;