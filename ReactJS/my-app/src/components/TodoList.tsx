import { useEffect, useState } from 'react'
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { TaskList } from '../components/TaskList';
import type { TodoType } from '../types/TodoType';

export const TodoList = () => {
     const [task, setTask] = useState<TodoType>({task: "", isActive: true});
    const [todos, setTodos] = useState<TodoType[]>([])
    
      const handleChange = (value: string) => {
        setTask((prev) => ({...prev, task: value}))
        
      }
    
      const addTaskButton = () => {
        if(task.task.trim() == "") return alert("Task Input Doesn't Empty");
        setTodos((prev) => ([...prev, task]));
    
        setTask({
          ...task,
          task: ""
        })
      }
    
      useEffect(()=> {
        console.log(todos);
      }, [todos])
    
    
    return (
        <>

             <h3>Todo list</h3>
              
              <h1>Vite + React + TypeScript</h1>

                <h3>Todo List</h3>
            
                {/* Input field reusable component */}
               <InputField text={task.task} onchange={handleChange}/>
               {/* Button reusable component */}
               <Button title="Add Tasks" onclick={addTaskButton}/>
        
               <TaskList todos={todos}/>
       
        </>

    )
}