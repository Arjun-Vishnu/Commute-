import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./Component/Register";
import Home from "./Component/Home";

const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: '/signup', element: <Register/> },
    { path: '/home', element: <Home/> },
    
]);

export default router;