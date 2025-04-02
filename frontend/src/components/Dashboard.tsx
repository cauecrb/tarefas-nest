import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the API service instead of axios

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const navigate = useNavigate();

    // Buscar tarefas ao carregar
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks');
                setTasks(response.data);
            } catch (err) {
                navigate('/login');
            }
        };
        fetchTasks();
    }, []);

    // Criar tarefa
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', dueDate: '' });
        } catch (err) {
            alert('Erro ao criar tarefa');
        }
    };

    // Excluir tarefa
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            alert('Erro ao excluir tarefa');
        }
    };

    // Atualizar tarefa
    const handleUpdate = async () => {
        if (!editingTask) return;
        try {
            const response = await api.patch(`/tasks/${editingTask.id}`, editingTask);
            setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
            setEditingTask(null);
        } catch (err) {
            alert('Erro ao atualizar tarefa');
        }
    };

    return (
        <div className="dashboard">
            <h1>Minhas Tarefas</h1>

            {/* Formulário de Criação */}
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Título"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Descrição"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                />
                <button type="submit">Adicionar Tarefa</button>
            </form>

            {/* Lista de Tarefas */}
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Vencimento: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p>Status: {task.status}</p>
                        <div className="task-actions">
                            <button onClick={() => setEditingTask(task)}>Editar</button>
                            <button onClick={() => handleDelete(task.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Edição */}
            {editingTask && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Tarefa</h2>
                        <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        />
                        <textarea
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        />
                        <input
                            type="date"
                            value={new Date(editingTask.dueDate).toISOString().split('T')[0]}
                            onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                        />
                        <select
                            value={editingTask.status}
                            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                        >
                            <option value="Pendente">Pendente</option>
                            <option value="Em Progresso">Em Progresso</option>
                            <option value="Concluída">Concluída</option>
                        </select>
                        <button onClick={handleUpdate}>Salvar</button>
                        <button onClick={() => setEditingTask(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
