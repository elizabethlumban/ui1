import { post } from "lib/fetch";

export const POST_RECORD1 = "items/POST_RECORD";

export const insertRecord1 = (body: any) => ({
  type: POST_RECORD1,
  payload: post(`/v1/items`, body),
});
