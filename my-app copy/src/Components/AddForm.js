import React from "react";
import { nanoid } from "nanoid";

class AddFrom extends React.Component {
    todoName = React.createRef();
    todoDescr = React.createRef();
  
    addItemOnList = e => {
      e.preventDefault();
      const todoItem = {
        id: nanoid(),
        name: this.todoName.current.value,
        description: this.todoDescr.current.value,
        isCompleted: false
      };
      this.props.addToDoItems(todoItem);
      e.currentTarget.reset();
    };
  
    render() {
      return (
        <form id="TodoInput" onSubmit={this.addItemOnList}>
          <input type="text" name="nameInput" placeholder="Name" ref={this.todoName} required />
          <input type="text" name="descrInput" placeholder="Description" ref={this.todoDescr} required />
          <button>Add</button>
        </form>
      );
    }
}

export default AddFrom;