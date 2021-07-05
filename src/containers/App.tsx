import React from "react";
import { useSelector } from "react-redux";
import { IState } from "store/types";
import Basic from "./Form/index";
import URList from "./URList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "../components/app-bar/AppBar";

export const App = () => {
  const submittingChanges = useSelector((state: IState) => state.submittingChanges);
  return (
    <Router>
      <AppBar />
      <div>
        {submittingChanges && (
          <div className={submittingChanges ? "changes-in-progess-overlay" : ""}>
            <div className="loader" />
          </div>
        )}
        <Route path="/" component={Basic}></Route>
        <Route path="/:hashId" component={URList}></Route>
      </div>
    </Router>
  );
};
