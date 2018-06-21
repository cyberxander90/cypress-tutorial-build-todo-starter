import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import {saveTodo, loadTodos, removeTodo} from './../lib/service'


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTodo: '',
      todos: []
    }
    this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  componentDidMount() {
    loadTodos()
      .then(({data}) => this.setState({todos: data}))
      .catch(() => this.setState({ showError: true }));
  }

  handleNewTodoChange(evt) {
    this.setState({
      currentTodo: evt.target.value
    });
  }

  handleTodoSubmit(evt) {
    evt.preventDefault();
    const newTodo = {
      name: this.state.currentTodo,
      isComplete: false
    };
    saveTodo(newTodo)
      .then(({data}) => {
        this.setState({
          todos: this.state.todos.concat(data),
          currentTodo: ''
        });
      })
      .catch(() => {
        this.setState({ showError: true });
      })
  }

  handleRemoveTodo(id) {
    removeTodo(id)
      .then(() => this.setState({
        todos: this.state.todos.filter((todo) => todo.id != id)
      }));
  }

  render () {
    const remaining = this.state.todos.filter((todo) => !todo.isComplete).length;
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.showError ? <span className='error'>Error</span> : null}
            <TodoForm 
              currentTodo={this.state.currentTodo}
              handleNewTodoChange={this.handleNewTodoChange}
              handleTodoSubmit={this.handleTodoSubmit}
            />
          </header>
          <section className="main">
            <TodoList
              todos={this.state.todos}
              handleRemoveTodo={this.handleRemoveTodo}
            />
          </section>
          <Footer remaining={remaining}/>
        </div>
      </Router>
    )
  }
}
