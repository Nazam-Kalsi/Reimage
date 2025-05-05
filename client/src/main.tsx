import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { About, Home, OTPverification, SignIn, SignUp } from "./pages";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

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
      { path: "/about", Component: About },
      { path: "/sign-in", Component: SignIn },
      { path: "/sign-up", Component: SignUp },
      { path: "/verify", Component: OTPverification },
    ],
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{
          baseTheme:dark,
        }}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
  </StrictMode>
);
