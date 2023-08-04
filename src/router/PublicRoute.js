import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NewUser from "../Pages/NewUser";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<PrivateRoute />}>

                <Route path="/" element={<Dashboard />} exact />
            </Route>
            <Route path="/signup" element={<NewUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
    )
)

export { router };