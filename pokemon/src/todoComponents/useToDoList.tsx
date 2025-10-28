import { useRef, useState } from "react";
import { initialList } from "./const";

const useToDoList = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [todoList, setTodoList] = useState(
        initialList
    );
    const markTodoHandler = (e: React.FormEvent) => {
        const id = Number(e.currentTarget.id);
        todoList[id].completed = !todoList[id].completed;
        setTodoList([...todoList]);
    }

    const deleteHandler = (e: React.FormEvent) => {
        if (window.confirm('Do you wan to delete')) {
            const id = Number(e.currentTarget.id);
            console.log(todoList[id]);
            todoList.splice(id, 1);
            setTodoList([...todoList])
        }
    };
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newTodo = Object.fromEntries(data).newTodo;
        setTodoList(
            prevList => [...prevList, {
                todo: String(newTodo),
                completed: false
            }]
        )
        inputRef.current!.value = ''
    }
    return {
        markTodoHandler,
        deleteHandler,
        handleSave,
        todoList,
        inputRef
    }
}

export default useToDoList;