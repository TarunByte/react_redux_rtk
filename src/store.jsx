// import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// Define Action Types: stateDomain & the Event
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch";

const initialState = {
  task: [],
};

//Step 1: Create a simple reducer function
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      const updatedTask = state.task.filter((curTask, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        task: updatedTask,
      };

    case FETCH_TASKS:
      return {
        ...state,
        task: [...state.task, ...action.payload],
      };

    default:
      return state;
  }
};

//!(Old Style) Step 2: Create the Redux store using the reducer
// export const store = createStore(
//   taskReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
// console.log(store);

//! New Style
export const store = configureStore({
  reducer: {
    taskReducer,
  },
});

// Step 3: Log the initial state
// The getState method is a synchronous function that returns the current state of a Redux application. It includes the entire state of the application, including all the reducers and their respective states.
store.dispatch({ type: ADD_TASK, payload: "Buy Apple" });
console.log("Updated State:", store.getState());

store.dispatch({ type: ADD_TASK, payload: "Buy Mango" });
console.log("Updated State:", store.getState());

store.dispatch({ type: ADD_TASK, payload: "Buy Banana" });
console.log("Updated State:", store.getState());

// store.dispatch(addTask("Buy Grapes"));
// console.log("Updated State:", store.getState());

// step 5: Create action creators
export const addTask = (data) => {
  console.log("add task calling");
  return { type: ADD_TASK, payload: data };
};

export const deleteTask = (id) => {
  return { type: DELETE_TASK, payload: id };
};

export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );
      const task = await res.json();
      console.log(task);

      dispatch({
        type: FETCH_TASKS,
        payload: task.map((curTask) => curTask.title),
      });
    } catch (error) {
      console.log(error);
    }
  };
};
