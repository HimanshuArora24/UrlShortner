import { useAuthContext } from "../hooks/useAuthContext";
import { useUrlsContext } from "./useUrlContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: urlsDispatch } = useUrlsContext();

  const logout = () => {
    // remove user form storage
    localStorage.removeItem("user");

    //  dispatch logout action
    dispatch({ type: "LOGOUT" });
    urlsDispatch({ type: "SET_URLS", payload: null });
  };

  return { logout };
};
