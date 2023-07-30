import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NewUser from "../Pages/NewUser";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<PrivateRoute />}>

                <Route path="/" element={<Dashboard />} exact />
            </Route>
            <Route path="/signup" element={<NewUser />} />
        </Route>
    )
)

export { router };