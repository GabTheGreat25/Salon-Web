import React from "react";
import { Welcome } from "@components";
import Logo3 from "@assets/walkincustomer-logo.png";

export default function () {
  return (
    <>
      <Welcome
        leftArrow={true}
        navigateLeft="/becomeBeautician"
        title={`Become a Lanlee <br /> Customer!`}
        description={`Ready to experience the ultimate in beauty and relaxation? <br /> Discover a haven of luxury and indulgence at Lhanlee Beauty Lounge. <br />Step into a world of exquisite treatments and personalized care tailored just for you.`}
        buttonTitle="Learn More"
        navigateTo="/ChooseRole"
        logo={Logo3}
        logoTitle="Logo3"
        rightArrow={false}
      />
    </>
  );
}
