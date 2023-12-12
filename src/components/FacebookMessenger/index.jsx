import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
import { useMediaQuery } from "react-responsive";

const MOBILE_BREAKPOINT = 767;

export default function () {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT });

  return (
    <>
      {isMobile ? null : (
        <FacebookProvider appId="625328572915568" chatSupport>
          <CustomChat pageId="127317223684561" minimized="true" />
        </FacebookProvider>
      )}
    </>
  );
}
