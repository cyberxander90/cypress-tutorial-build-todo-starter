import axios from 'axios';

const url = 'http://localhost:3030/api/todos'

export const saveTodo = (todo) => 
  axios.post(url, todo);

export const loadTodos = () =>
  axios.get(url);

export const removeTodo = (id) =>
  axios.delete(`${url}/${id}`)

export const updateTodo = (todo) =>
  axios.put(`${url}/${todo.id}`, todo)