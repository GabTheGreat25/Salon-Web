import React from "react";
import { Welcome } from "@components";
import Logo1 from "@assets/testImg1.jpeg";

export default function () {
  return (
    <>
      <Welcome
        leftArrow={false}
        title={`Looking for a <br /> Salon?`}
        description={`Step into a world of personalized beauty at Lhanlee Beauty Lounge.<br /> Sign up today and embark on a journey of self-care and confidence with Lhanlee Beauty Lounge. <br /> Let us be your partner in achieving your beauty goals.`}
        buttonTitle="Learn More"
        navigateTo="/login"
        logo={Logo1}
        logoTitle="Logo1"
        rightArrow={true}
        navigateRight="/becomeBeautician"
      />
    </>
  );
}
