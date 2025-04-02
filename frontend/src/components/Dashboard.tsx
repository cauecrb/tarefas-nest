import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Dashboard.css';

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
    const [filter, setFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
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
    }, [navigate]);

    // Criar tarefa
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', dueDate: '' });
            setShowForm(false);
        } catch (err) {
            alert('Erro ao criar tarefa');
        }
    };

    // Excluir tarefa
    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(task => task.id !== id));
            } catch (err) {
                alert('Erro ao excluir tarefa');
            }
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

    // Filtrar tarefas
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status.toLowerCase() === filter;
    });

    return (
        <div className="app-container">
            <div className="dashboard-header">
                <h1>Minhas Tarefas</h1>
                <div className="header-actions">
                    <button
                        className="create-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancelar' : 'Nova Tarefa'}
                    </button>
                    <button
                        className="logout-btn"
                        onClick={() => navigate('/logout')}
                    >
                        Sair
                    </button>
                </div>
            </div>

            {/* Formulário de Criação */}
            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleCreate} className="task-form">
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Título da tarefa"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                placeholder="Descrição da tarefa"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dueDate">Data de vencimento</label>
                            <input
                                id="dueDate"
                                type="date"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">Adicionar Tarefa</button>
                    </form>
                </div>
            )}

            {/* Filtros */}
            <div className="filter-container">
                <span>Filtrar por:</span>
                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </button>
                    <button
                        className={filter === 'pendente' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setFilter('pendente')}
                    >
                        Pendentes
                    </button>
                    <button
                        className={filter === 'em progresso' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setFilter('em progresso')}
                    >
                        Em Progresso
                    </button>
                    <button
                        className={filter === 'concluída' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setFilter('concluída')}
                    >
                        Concluídas
                    </button>
                </div>
            </div>

            {/* Lista de Tarefas */}
            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhuma tarefa encontrada.</p>
                    {filter !== 'all' && (
                        <button className="filter-btn" onClick={() => setFilter('all')}>
                            Mostrar todas as tarefas
                        </button>
                    )}
                </div>
            ) : (
                <div className="task-grid">
                    {filteredTasks.map(task => (
                        <div key={task.id} className="task-card">
                            <div className="task-header">
                                <h3>{task.title}</h3>
                                <span className={`task-status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                                    {task.status}
                                </span>
                            </div>
                            <div className="task-body">
                                <p>{task.description || "Sem descrição"}</p>
                            </div>
                            <div className="task-meta">
                                <p>Vencimento: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="task-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => setEditingTask(task)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Edição */}
            {editingTask && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Editar Tarefa</h2>
                            <button
                                className="close-btn"
                                onClick={() => setEditingTask(null)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="edit-title">Título</label>
                                <input
                                    id="edit-title"
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-description">Descrição</label>
                                <textarea
                                    id="edit-description"
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-dueDate">Data de vencimento</label>
                                <input
                                    id="edit-dueDate"
                                    type="date"
                                    value={new Date(editingTask.dueDate).toISOString().split('T')[0]}
                                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-status">Status</label>
                                <select
                                    id="edit-status"
                                    value={editingTask.status}
                                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em Progresso">Em Progresso</option>
                                    <option value="Concluída">Concluída</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setEditingTask(null)}>Cancelar</button>
                            <button className="save-btn" onClick={handleUpdate}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
