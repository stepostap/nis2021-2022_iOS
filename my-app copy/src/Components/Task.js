import React from "react";

class Task extends React.Component {
  

    checkbox = event => {
      const updateTodo = {
        ...this.props.todoItems,
        [event.currentTarget.name]: event.currentTarget.checked
      };
      this.props.updateTodos(this.props.index, updateTodo);
    };
  
    render() {
      return (
        <div>
          
          <li className={this.props.todoItems.isCompleted ? "done" : null}>
            <input
              type="checkbox"
              name="isCompleted"
              checked={this.props.todoItems.isCompleted}
              onChange={this.checkbox}
            />
            <h3 className="TaskName">{this.props.todoItems.name}</h3>
            <p className="TaskDescr">{this.props.todoItems.description}</p>
          </li>
        </div>
        
      );
    }
}

export default Task;