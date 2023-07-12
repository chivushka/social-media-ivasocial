import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftPanel from "./components/leftPanel/LeftPanel";
import RightPanel from "./components/rightPanel/RightPanel";
import Home from "./pages/home/Home";
import ProfileCover from "./components/profileCover/profileCover";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Liked from "./pages/liked/Liked";
import Follows from "./pages/follows/Follows";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import Gallery from "./pages/gallery/Gallery";
import Search from "./pages/search/Search";
import SearchCover from "./pages/search/SearchCover";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
              <LeftPanel />
              <div style={darkMode ? { flex: 7, background: "#333", height: "auto" } : { flex: 7, background: "#f6f3f3", height: "auto" }} >
                <Outlet />
              </div>
              <RightPanel />
            </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute user={currentUser}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <ProfileCover />
        },
        {
          path: "/updateProfile",
          element: <UpdateProfile />
        },
        {
          path: "/search/:text",
          element: <SearchCover />
        },
        {
          path: "/liked",
          element: <Liked />
        },
        {
          path: "/follows",
          element: <Follows />
        },
        {
          path: "/gallery/:name",
          element: <Gallery />
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;