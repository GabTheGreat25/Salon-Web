import React from "react";
import { Welcome } from "@components";
import Logo1 from "@assets/Logo-1.png";

export default function () {
  return (
    <>
      <Welcome
        leftArrow={false}
        title={`Looking for a <br /> Salon?`}
        description={`Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Ut erat mauris, rhoncus br non <br /> nibh in, commodo viverra elit.`}
        buttonTitle="Learn More"
        navigateTo="/asdasd"
        logo={Logo1}
        logoTitle="Logo1"
        rightArrow={true}
        navigateRight="/becomeEmployee"
      />
    </>
  );
}
