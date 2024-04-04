"use client";
import { useState } from "react";
import { IoIosSave } from "react-icons/io";

interface TaskProps {
    addTask: (taskText: string, taskDescription: string) => void;
}

interface FormSubmitEvent {
    preventDefault: () => void;
}

const TaskForm: React.FC<TaskProps> = ({ addTask }) => {
    const [taskText, setTaskText] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleSubmit = (e: FormSubmitEvent) => {
        e.preventDefault();
        if (!taskText.trim() || !taskDescription.trim()) return;
        addTask(taskText, taskDescription);
        setTaskText("");
        setTaskDescription("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="my-[40px] flex-col gap-6 flex align-middle justify-center items-center"
        >
            <input
                type="text"
                placeholder="Título de la nota"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="border text-[#354f52] bg-[#cad2c5] p-5 w-80 rounded-sm"
            />
            <textarea
                cols={30}
                rows={5}
                placeholder="Descripción de la nota"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="border text-[#354f52] bg-[#cad2c5] p-5 w-80 rounded-sm"
            />
            <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#729178] bg-[#84a98c] rounded-md text-white">
                <IoIosSave className="text-white" size={28} type="submit" />
                <span>GUARDAR</span>
            </button>
        </form>
    );
};

export default TaskForm;
