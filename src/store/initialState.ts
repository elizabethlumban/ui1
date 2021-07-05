import { IState } from "./types";

const initialState: IState = {
  loading: false,
  submittingChanges: false,
  items: [],
  originalUrl: "",
};

export default initialState;
