import React from "react";
import { Welcome } from "@components";
import Logo2 from "@assets/Logo-2.png";

export default function () {
  return (
    <>
      <Welcome
        leftArrow={true}
        navigateLeft="/"
        title={`Become a Lanlee <br /> Beautician!`}
        description={`Are you passionate about beauty and wellness?  <br /> Turn your passion into a rewarding career  <br /> as a beautician at Lhanlee Beauty Lounge..`}
        buttonTitle="Learn More"
        navigateTo="/ChooseRole"
        logo={Logo2}
        logoTitle="Logo2"
        rightArrow={true}
        navigateRight="/becomeCustomer"
      />
    </>
  );
}
