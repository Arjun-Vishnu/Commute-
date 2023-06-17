import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./Component/Register";
import Logout from "./Component/Logout";

const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: '/signup', element: <Register/> },
    { path: '/logout', element: <Logout/> },
    
]);

export default router;