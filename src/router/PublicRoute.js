import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Dashboard />} />
        </Route>
    )
)

export { router };