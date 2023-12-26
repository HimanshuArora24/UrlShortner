import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

function App() {
  const { user } = useAuthContext();
  const path = window.location.pathname;
  const short_id = path.substring(1);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/Login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound short_id={short_id} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
