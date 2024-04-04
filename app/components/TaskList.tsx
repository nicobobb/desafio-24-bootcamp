import { useState } from "react";
import { IoIosClose, IoMdCreate } from "react-icons/io";
import { FaStar } from "react-icons/fa";

interface TaskListProps {
    tasks: {
        id: number;
        title: string;
        description: string;
        isFavorite: boolean;
    }[];
    deleteTask: (taskId: number) => void;
    toggleFavorite: (taskId: number) => void;
    setEditingTask: (taskId: number | null) => void;
    editingTask: number | null;
    cancelEditing: () => void;
    handleEdit: (
        taskId: number,
        editedTitle: string,
        editedDescription: string
    ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    deleteTask,
    toggleFavorite,
    setEditingTask,
    editingTask,
    cancelEditing,
    handleEdit,
}) => {
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const handleStartEditing = (taskId: number) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
            setEditedTitle(taskToEdit.title);
            setEditedDescription(taskToEdit.description);
            setEditingTask(taskId);
        }
    };

    return (
        <ul className="max-w-xs mx-auto">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="flex items-center justify-between text-[#cad2c5] rounded-md p-4 mb-4 max-w-80"
                >
                    <div className="border-2 p-2 w-full ">
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => toggleFavorite(task.id)}
                                className={`mr-2 ${
                                    task.isFavorite
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            >
                                <FaStar size={24} />
                            </button>
                            <button
                                onClick={() => handleStartEditing(task.id)}
                                className="text-gray-300"
                            >
                                <IoMdCreate size={24} />
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-cyan-300"
                            >
                                <IoIosClose
                                    className="text-red-300"
                                    size={26}
                                />
                            </button>
                        </div>

                        {editingTask === task.id ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEdit(
                                        task.id,
                                        editedTitle,
                                        editedDescription
                                    );
                                }}
                                className="max-w-md mx-auto mt-4 p-8 bg-gray-800 rounded-lg"
                            >
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) =>
                                        setEditedTitle(e.target.value)
                                    }
                                    className="border text-white bg-gray-700 p-3 mb-4 w-full rounded-lg"
                                    placeholder="Título de la nota"
                                />
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) =>
                                        setEditedDescription(e.target.value)
                                    }
                                    className="border text-white bg-gray-700 p-3 mb-4 w-full rounded-lg"
                                    placeholder="Descripción de la nota"
                                    rows={4}
                                />
                                <div className="flex justify-center gap-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => cancelEditing()}
                                        type="button"
                                        className="border-2 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="flex items-center justify-center mt-4">
                                    <p className="text-lg font-bold">
                                        {task.title}
                                    </p>
                                </div>
                                <p>{task.description}</p>
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
