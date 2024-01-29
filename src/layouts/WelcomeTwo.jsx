import React from "react";
import { Welcome } from "@components";
import Logo2 from "@assets/Logo-2.png";
import { selectDate, selectTime, selectIsHiring } from "@hiring";
import { useSelector } from "react-redux";

export default function () {
  const date = useSelector(selectDate);
  const time = useSelector(selectTime);
  const hiring = useSelector(selectIsHiring);

  const defaultTitle = `Become a Lhanlee <br /> Beautician!`;
  const hiringTitle = `Were Hiring! <br/>Apply now!`;

  const msg = `Are you passionate about beauty and wellness?  <br /> Turn your passion into a rewarding career  <br /> as a beautician at Lhanlee Beauty Lounge..`;
  const hiringMsg = `Hiring Date: ${date} <br/> Appointed Time Slot ${time}`;

  const title = hiring ? hiringTitle : defaultTitle;
  const info = hiring ? hiringMsg : msg;

  return (
    <>
      <Welcome
        leftArrow={true}
        navigateLeft="/"
        title={title}
        description={info}
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
