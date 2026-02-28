import type { TodoType } from "../types/TodoType"
import { Button } from "./Button";

type TaskListProps = {
    todos: TodoType[];
}

export const TaskList = ({todos}: TaskListProps) => {

    const deleteTask = () => {
        console.log("Task Delete")
    }

    return (
        <div>
            <p>----Task List -----</p>
            
            {todos.length == 0 && <h3>Task is Empty</h3>}

            {todos.map((task, index) => (
                
                    <p key={index}>
                        
                        <span>{task.task}</span>
                        <Button title="Delete" onclick={deleteTask}/>
                    
                    </p>
                
            ))}
            
        </div>
    )
}