import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Test } from "@/pages";
import { RootLayout, NotFound, Welcome } from "@/layouts";
import { FacebookMessenger } from "@/components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/*Public Routes*/}
      <Route path="*" element={<NotFound />} />
      <Route index element={<Welcome />} />
      <Route path="test" element={<Test />} />
      {/*Private Routes*/}
    </Route>
  )
);

export default function () {
  return (
    <>
      <RouterProvider router={router} />
      <FacebookMessenger />
    </>
  );
}
