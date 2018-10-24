import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { getAllProducts } from "./actions";
import App from "./containers/App.jsx";
import "./index.css";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

store.dispatch(getAllProducts());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
