import { fulfilled, failed, pending } from "lib/promiseMiddlewareTypes";
import initialState from "store/initialState";
import { GET_RECORD } from "actions/items";

const originalUrl = (state = initialState.originalUrl, action: any) => {
  switch (action.type) {
    case failed(GET_RECORD):
    case pending(GET_RECORD):
      return [];
    case fulfilled(GET_RECORD):
      return action.payload;
    default:
      return state;
  }
};

export default originalUrl;
