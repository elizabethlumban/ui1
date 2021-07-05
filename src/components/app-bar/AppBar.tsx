import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import "./app-bar.css";

const StyledToolbar = styled(Toolbar)`
  padding-left: 0rem !important;
  margin-left: 80px;
  height: 115px;
`;

const AppHeader = () => {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <h2>URL Shortener</h2>
      </StyledToolbar>
    </AppBar>
  );
};

export default AppHeader;
