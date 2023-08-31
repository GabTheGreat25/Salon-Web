import React from "react";
import { Welcome } from "@components";
import Logo3 from "@assets/Logo-3.png";

export default function () {
  return (
    <>
      <Welcome
        leftArrow={true}
        navigateLeft="/becomeEmployee"
        title={`Become a Lanlee <br /> Customer!`}
        description={`Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Ut erat mauris, rhoncus br non <br /> nibh in, commodo viverra elit.`}
        buttonTitle="Learn More"
        navigateTo="/ChooseRole"
        logo={Logo3}
        logoTitle="Logo3"
        rightArrow={false}
      />
    </>
  );
}
