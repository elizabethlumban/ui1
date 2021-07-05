import { combineReducers } from "redux";
import loading from "./loading";
import submittingChanges from "./submittingChanges";
import items from "./items";
import originalUrl from "./originalUrl";

export default () =>
  combineReducers({
    submittingChanges,
    loading,
    items,
    originalUrl,
  });
