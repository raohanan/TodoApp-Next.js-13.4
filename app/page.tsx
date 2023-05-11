"use client";

import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState({ title: "", desc: "" }); // In the useState Hook, The setTodo variable is a function that can be used to update the todo state variable.

  const addTodo = () => {
    //The addTodo function is called when the user clicks a button to add a new todo item.
    let todos = localStorage.getItem("todos"); // It first checks if there are any existing todo items in the localStorage using the getItem method.
    if (todos) {
      // If there are existing todos.
      let todosJson = JSON.parse(todos); // it parses the JSON string into an array using JSON.parse.
      if (
        todosJson.filter((value: { title: string }) => {
          // It is a filter function that checks if the title property of each todo item in todosJson is equal to the title property of the current todo object.
          return value.title == todo.title;
        }).length > 0
      ) {
        alert("Todo with this title already exists");
      } else {
        todosJson.push(todo); // Adds the new todo to the array using the push method
        localStorage.setItem("todos", JSON.stringify(todosJson)); // And then stores the updated array back in localStorage using the setItem method.
        alert("Todo has been added");
      }
    } else {
      localStorage.setItem("todos", JSON.stringify(todo)); // If there are no existing todos, it creates a new array with the current todo object and stores it in localStorage using setItem
      setTodo({ title: "", desc: "" }); // Resets the todo state variable to its initial state of an empty title and desc properties using setTodo.
    }
  };

  const onChange = (e: any) => {
    // The onChange function is called whenever the user types into an input field for the title or desc properties of the todo object
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo); // It uses the spread operator (...) to copy the existing todo object, and then updates the value of the property that corresponds to the name attribute of the input field using the square bracket notation. Finally, it calls setTodo with the updated todo object to update the state variable.
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Add a Todo
            </h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Todo Title
              </label>
              <input
                value={todo.title}
                onChange={onChange}
                type="text"
                id="title"
                name="title"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Todo Description
              </label>
              <input
                value={todo.desc}
                onChange={onChange}
                type="text"
                id="desc"
                name="desc"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={addTodo}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-indigo-600 rounded text-lg"
            >
              Add Todo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
