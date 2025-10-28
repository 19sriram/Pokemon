import useToDoList from "./useToDoList";

const TodoListComponent = () => {
    const { handleSave, todoList, inputRef, markTodoHandler, deleteHandler } = useToDoList();

    return (
        <>
            <div>
                <h2>Todo</h2>
                <form onSubmit={handleSave}>
                    <div style={{ display: 'inline-flex' }}>
                        <input type="text" name="newTodo" placeholder="enter things to do" ref={inputRef} />
                    </div>
                    <button type="submit" value="Submit">Save</button>
                </form>
            </div>
            {todoList.filter.length > 0 && todoList.map((item, index) => (
                <div key={index}>
                    <input id={String(index)} type="checkbox" style={{ marginRight: '2em' }} onChange={(e) => markTodoHandler(e)} checked={item.completed} />
                    <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>{item.todo.toUpperCase()}</span>
                    <button type="button" id={String(index)} style={{ marginLeft: '2em', marginTop: '1em' }} value="-" onClick={(e) => deleteHandler(e)}>-</button>
                </div>
            ))}
        </>
    )
}

export default TodoListComponent;