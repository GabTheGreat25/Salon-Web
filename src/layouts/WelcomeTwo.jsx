import React from "react";
import { Welcome } from "@components";
import Logo2 from "@assets/Logo-2.png";

export default function () {
  return (
    <>
      <Welcome
        leftArrow={true}
        navigateLeft="/"
        title={`Become a Lanlee <br /> Employee!`}
        description={`Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Ut erat mauris, rhoncus br non <br /> nibh in, commodo viverra elit.`}
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
