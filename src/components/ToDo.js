import { useState } from "react";

const ToDo = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

    const addTask = () => {
        if (!task || task === "") { return; }

        setList((prev) => [...prev, { id: Date.now(), task: task }]);
        setTask("");
    }

    const editTask = (id) => {
        if (!id || !task || task === "") { return; }

        let newList = list.map((item) => (item.id === id) ? { ...item, task } : item)
        
        setList([...newList])
        setTask("");
    }

    const deleteTask = (id) => {
        if (!id) { return; }

        let newList = list.filter((item) => item.id !== id)
        
        setList([...newList])
        setTask("");
    }

    console.log(list);

    return (
        <div>
            <h1>TO-DO List</h1>
            <div className="todo-input">
                <input value={task}
                    onChange={(e) => {
                        setTask(e.target.value);
                    }}></input>
                <button onClick={addTask}>Add</button>
            </div>

            {

                (list.length > 0) && <div className="todo-list">
                    {
                        list.map((item, index) => {
                            return (
                                <div key={"item" + index}> {item.task}
                                    <button onClick={() => editTask(item.id)}>Edit</button>
                                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}

export default ToDo;