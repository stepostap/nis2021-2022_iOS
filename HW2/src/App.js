import React, { Component } from "react";
import "./App.css";
import AddForm from "./Components/AddForm";
import Task from "./Components/Task";
import { nanoid } from "nanoid";

class App extends Component {
  TASKS = [
    { id: "item-0", name: "Buy food", description: "Milk, bread, sweets, cheese", isCompleted: true },
    { id: "item-1", name: "Midday nap", description: "Sleep a little after studying", isCompleted: false },
    { id: "item-2", name: "Finish homework", description: "Just do it", isCompleted: true },
    { id: "item-3", name: "A really long task", description: "This is the description of the task, This is the description of the task, This is the description of the task.", isCompleted: false },
    { id: "item-4", name: "Beep-Boop", description: "Boooooooooooooooooooop", isCompleted: false }
  ];

  state = {
    todoItems: this.TASKS
  };

  addTodo = item => {
    const items = { ...this.state.todoItems };
    items[item.id] = item;
    this.setState({
      todoItems: items
    });
  };

  update = (key, updatedTodo) => {
    const todos = { ...this.state.todoItems };
    todos[key] = updatedTodo;
    this.setState({ todoItems: todos });
  };

  render() {
    return (
      <div className="App">
        <AddForm addToDoItems={this.addTodo} />
        <ul>
          {Object.keys(this.state.todoItems).map(key => (
            <Task
              key={key}
              index={key}
              todoItems={this.state.todoItems[key]}
              updateTodos={this.update}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
