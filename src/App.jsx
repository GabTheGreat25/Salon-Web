import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { FacebookMessenger } from "@/pages";
import { RootLayout, NotFound } from "@/layouts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/*Public Routes*/}
      <Route path="*" element={<NotFound />} />
      <Route index element={<FacebookMessenger />} />
      {/*Private Routes*/}
    </Route>
  )
);

export default function () {
  return <RouterProvider router={router} />;
}
