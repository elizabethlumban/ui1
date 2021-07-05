import { get, post } from "lib/fetch";

export const GET_ITEMS = "items/GET";
export const POST_RECORD = "items/POST_RECORD";
export const GET_RECORD = "items/GET_RECORD";

export const getItems = () => ({
  type: GET_ITEMS,
  payload: get("/v1/items"),
});
/* payload: get("/v1/ruleseditor/templates"), */
/* export const insertRecord = (body: any) => ({
  type: POST_RECORD,
  payload: post(`/v1/items`, body),
}); */

export const insertRecord = (body: any) => ({
  type: POST_RECORD,
  payload: post(`/v1/items`, body),
});

export const getRecord = (hashId: string) => ({
  type: GET_RECORD,
  payload: get(`/v1/items/${hashId}`),
});
