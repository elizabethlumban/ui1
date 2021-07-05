import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./containers/App";
import store from "./store";
import { ThemeProvider } from "@material-ui/core/styles";
import { defaultTheme } from "./theme/material";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
