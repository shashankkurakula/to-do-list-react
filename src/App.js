import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import uuid from "uuid/v4";
import axios from 'axios'

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header";
import About from "./components/pages/About";

import "./App.css";

class App extends Component {
  state = {
    todos: [] 
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data }))
  }

  //Marks a Todo as completed
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //Deletes a Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ 
      todos: [...this.state.todos.filter((todo) => todo.id !== id)]
    }))
  };

  // adds a Todo 
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
              )} />

            <Route exact path="/about" component={About} />  
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// state = {
//   todos: [
//     {
//       id: uuid,
//       title: "Take out the trash",
//       completed: false,
//     },
//     {
//       id: uuid,
//       title: "Go on a date",
//       completed: false,
//     },
//     {
//       id: uuid,
//       title: "Meeting with boss",
//       completed: false,
//     },
//   ]
// };

  // delTodo = (id) => {
  //   this.setState({
  //     todos: [...this.state.todos.filter((todo) => todo.id !== id)],
  //   });
  // };


  // addTodo = (title) => {
  //   const newTodo = {
  //     id: uuid,
  //     title,
  //     completed: false,
  //   };
  //   this.setState({ todos: [...this.state.todos, newTodo] });
  // };