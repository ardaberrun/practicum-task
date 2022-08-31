import axios from 'axios';
import { Todo } from '../context';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos = async () => {
  const res = await api.get<Todo[]>('/todos');
  return res.data;
};

export const createTodo = async (content: string) => {
  const res = await api.post<Todo>('/todos', { content });
  return res.data;
};

export const updateTodo = async (todo: Todo) => {
  const res = await api.put<Todo>(`/todos/${todo.id}`, todo);
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await api.delete<Todo>(`/todos/${id}`);
  return res.data;
};
