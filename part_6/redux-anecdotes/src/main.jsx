import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App";
//import anecdoteReducer from "./reducers/anecdoteReducer";
//import filterReducer from "./reducers/filterReducer";
import rootReducer from "./reducers/rootReducer";

/*const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});*/

//const store = createStore(reducer);
const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
