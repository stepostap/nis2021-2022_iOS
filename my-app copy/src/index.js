import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const TASKS = [
  { id: "todo-0", name: "Learn how to write websites", description: "(-_-)", isCompleted: true },
  { id: "todo-1", name: "Get a grade on the course", description: "I wish it would be 10!", isCompleted: false },
  { id: "todo-2", name: "Forget how to write websites", description: ":)", isCompleted: true },
  { id: "todo-3", name: "Learn how to write iOS-apps", description: "As fast as possible", isCompleted: false },
  { id: "todo-4", name: "Become an iOS-developer", description: "Чрезвычайно поучительно видеть, как с подъемом настроения снижаются претензии на остроумие. Именно настроение заменяет остроумие, равно как и остроумию надобно стремиться заменить настроение, при котором дают о себе знать в противном случае заторможенные возможности наслаждения, в том числе удовольствие от бессмыслицы.", isCompleted: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
