// import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { thunk } from "redux-thunk";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define Action Types: stateDomain & the Event
// const ADD_TASK = "task/add";
// const DELETE_TASK = "task/delete";
// const FETCH_TASKS = "task/fetch";

const initialState = {
  task: [],
};

//!(Old Style) Step 2: Create the Redux store using the reducer
// export const store = createStore(
//   taskReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
// console.log(store);

//? RTK slice
const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {},
    deleteTask(state, action) {},
  },
});

const { addTask, deleteTask } = taskReducer.actions;

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
