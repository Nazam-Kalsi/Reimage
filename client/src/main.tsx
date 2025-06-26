import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  DashboardContainer,
  Home,
  ImageUpload,
  OTPverification,
  RemoveBg,
  SignIn,
  SignUp,
  VideoUpload,
  ViewAll,
} from "./pages";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { PrivateRoute } from "./components/customComponents";
import NotFound from "./pages/notFound.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/sign-in", Component: SignIn },
      { path: "/sign-up", Component: SignUp },
      { path: "/verify", Component: OTPverification },
      { path: "*", Component: NotFound },
      
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardContainer />
          </PrivateRoute>
        ),
        children: [
          { index: true, Component: ViewAll },
          { path: "upload-image", Component: ImageUpload },
          { path: "upload-video", Component: VideoUpload },
          { path: "remove-bg", Component: RemoveBg },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{ baseTheme: dark }}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </Provider>
  </StrictMode>
);
