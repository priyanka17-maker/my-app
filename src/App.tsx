import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Todo } from "./model"


const App: React.FC = () => {

const[todo, setTodo] = useState<string>("");
const [todos, setTodos] = useState<Todo[]>([]);
const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

const handleAdd = (e: React.FormEvent) => {
  e.preventDefault();

  if (todo) {
    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo("");
  }
};

  let name: string = "Priyanka"
  console.log('name>>', name)

  let age : number;
  age = 40;
  console.log('age>>', age)

  let age1 : number | string;
  age1 = "pri"
  console.log('age1>>', age1)

  let isStudent: boolean;
  isStudent = true;
  console.log('isStudent>>', isStudent)

  let hobbies: string[];
  hobbies = ['dance', 'singing']
  console.log('hobbies>>', hobbies)

  let role:[number, string]; //tuple
  role = [5, 'pri']
  console.log('role>>', role)

  // let printName: Function
  let printName: (name: string) => number;
  // function printName(name:string){
  //   console.log('name>>', name)
  // }
  // printName('pri')

  type Person = {
    name:string;
    age?:number;  //optional
  }

  let person: Person = {
    name:'pri',
  }
  console.log('person>>', person)


  type Person1 = 
    {
      name:string;
      age?:number;  //optional
    }


  let lotsOfPeople: Person1 [] = [
  {name:'pri'},
  {name:'tile',age:45}
]; //array of person objetc
  console.log('lotsOfPeople>>', lotsOfPeople)


  //Extending Types with Intersection
  type Person2 = {
    name: string;
    age?: number;
  };
  

 //Extend an Interface
  // type Employee = Person2 & {
  //   position: string;
  //   salary: number;
  // };
  
  // const employee: Employee = {
  //   name: "John",
  //   age: 30,
  //   position: "Developer",
  //   salary: 50000,
  // };
  
  // console.log('Employee>>', employee);


  // interface Person1 {
  //   name: string;
  //   age?: number;
  // }
  
  // interface Employee extends Person1 {
  //   position: string;
  //   salary: number;
  // }
  
  // const employee: Employee = {
  //   name: "John",
  //   age: 30,
  //   position: "Developer",
  //   salary: 50000,
  // };
  
  // console.log('Employee>>', employee);

  // Extending a type with an interface
  // interface Person {
  //   name: string;
  //   age?: number;
  // }
  
  // type Employee = Person & {
  //   position: string;
  //   salary: number;
  // };
  
  // const employee: Employee = {
  //   name: "Alice",
  //   age: 28,
  //   position: "Designer",
  //   salary: 70000,
  // };
  
  // console.log('Employee>>', employee);

  
  // Extending an interface with a type
  // type Person = {
  //   name: string;
  //   age?: number;
  // };
  
  // interface Employee extends Person {
  //   position: string;
  //   salary: number;
  // }
  
  // const employee: Employee = {
  //   name: "Bob",
  //   age: 35,
  //   position: "Manager",
  //   salary: 90000,
  // };
  
  // console.log('Employee>>', employee);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
     <span className='heading'>Taskify</span>
     <InputField todo= {todo} setTodo ={setTodo} handleAdd={handleAdd} />
     <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
    </div>
    </DragDropContext>
  );
}

export default App;
