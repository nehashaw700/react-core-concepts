import ReactDOM from "./node_modules/react-dom/client"
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import Error from "./src/components/Error";
import ToDo from "./src/components/ToDo";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    )
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/ToDo",
                element: <ToDo />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);