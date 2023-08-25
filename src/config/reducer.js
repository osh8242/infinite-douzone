export const CUR_TAB = "CUR_TAB";
export const setCurTab = (tabId) => ({ type: CUR_TAB, tabId });

const rootReducer = (state = { tabId: "news" }, action) => {
  switch (action.type) {
    case CUR_TAB:
      return {
        ...state,
        tabId: action.tabId,
      };
    default:
      return state;
  }
};
