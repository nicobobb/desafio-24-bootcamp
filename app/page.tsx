"use client";
import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface Task {
    id: number;
    title: string;
    description: string;
    isFavorite: boolean;
}

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now(),
            title: title,
            description: description,
            isFavorite: false,
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const toggleFavorite = (taskId: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, isFavorite: !task.isFavorite }
                    : task
            )
        );
    };

    const cancelEditing = () => {
        setEditingTask(null);
    };

    const handleEdit = (
        taskId: number,
        editedTitle: string,
        editedDescription: string
    ) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          title: editedTitle,
                          description: editedDescription,
                      }
                    : task
            )
        );
        setEditingTask(null);
    };

    return (
        <div className="text-center bg-[#354f52] rounded-md max-w-xl mx-auto my-8 py-8">
            <h1 className="text-[#cad2c5] font-semibold text-2xl">
                Lista de Notas
            </h1>
            <TaskForm addTask={addTask} />
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleFavorite={toggleFavorite}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
                cancelEditing={cancelEditing}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default Home;
