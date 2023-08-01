"use client";
import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

export default function () {
  return (
    <>
      <FacebookProvider appId="1000144684738483" chatSupport>
        <CustomChat pageId="127317223684561" minimized="true" />
      </FacebookProvider>
    </>
  );
}
