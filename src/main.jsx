import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { AuthLayout, Login } from "./components/index.js";

import AddPost from "./pages/AddPost";
import Signup from "./pages/SignUp";
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ],
    },
]);
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
