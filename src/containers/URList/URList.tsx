import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "store/types";
import { getRecord } from "actions/items";
interface IUrlParams {
  hashId: string;
}
export const URList = () => {
  const originalUrl = useSelector((state: IState) => state.originalUrl);
  const paramObj: IUrlParams = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecord(paramObj.hashId));
  }, [dispatch, paramObj.hashId]);

  // perform redirection
  //example url: localhost:3000/ZgPXITBjSSmIkSxI0adt1
  // add delay here
  //window.location.href = originalUrl;
  setTimeout(() => {
    window.location.href = originalUrl;
  }, 3000);

  return <div></div>;
};
export default URList;
