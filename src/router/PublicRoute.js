import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NewUser from "../Pages/NewUser";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<NewUser />} />
        </Route>
    )
)

export { router };