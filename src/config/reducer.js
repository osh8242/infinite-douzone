import React from "react";
import { connect } from "react-redux";
import { setPk } from "./pkActions";

const PKComponent = ({ pk, setPkValue }) => (
  <div>
    <p>Current PK: {pk}</p>
    <button onClick={() => setPkValue(Math.random())}>Set Random PK</button>
  </div>
);

const mapStateToProps = (state) => ({
  pk: state,
});

const mapDispatchToProps = (dispatch) => ({
  setPkValue: (pk) => dispatch(setPk(pk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PKComponent);

export const CUR_TAB = "CUR_TAB";
export const setCurTab = (tabId) => ({ type: CUR_TAB, tabId });

const rootReducer = (state = { tabId: "news" }, action) => {
  switch (action.type) {
    case CUR_TAB:
      return {
        ...state,
        pkV: action.tabId,
      };
    default:
      return state;
  }
};
