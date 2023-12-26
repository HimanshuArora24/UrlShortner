import { createContext } from "react";
import { useReducer } from "react";

export const UrlsContext = createContext();

export const urlsReducer = (state, action) => {
  switch (action.type) {
    case "SET_URLS":
      return {
        urls: action.payload
      };
    case "CREATE_URL":
      return {
        urls: [action.payload, ...state.urls]
      };
    case "DELETE_URL":
      return {
        urls: state.urls.filter((u) => u._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const UrlsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(urlsReducer, {
    urls: null,
  });

  return (
    <UrlsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UrlsContext.Provider>
  );
};
