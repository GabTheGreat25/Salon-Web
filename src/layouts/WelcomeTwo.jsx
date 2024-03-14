import React from "react";
import { Welcome } from "@components";
import Logo2 from "@assets/lhanlee-hiring.jpg";
import { useGetHiringsQuery } from "@api";

export default function () {
  const { data } = useGetHiringsQuery();
  const hiring = data?.details[0];

  const defaultTitle = `Become a Lhanlee <br /> Employee!`;
  const hiringTitle = `Were Hiring A <br/>${hiring?.type}<br/> Apply now! <br/>`;

  const hiringDate = hiring?.date ? new Date(hiring.date) : null;
  const hiringDateFormatted = hiringDate
    ? hiringDate.toISOString().split("T")[0]
    : "";

  const msg = `Are you passionate about beauty and wellness?  <br /> Turn your passion into a rewarding career  <br /> as a employee at Lhanlee Beauty Lounge..`;
  const hiringMsg = `Hiring Date: ${hiringDateFormatted} <br/> Hiring Time Slot: ${hiring?.time}  <br/> Bring a Valid ID <br/> Bring Your Own Resume with Updated: </br>  contact
  information, education, and relevant work experience.`;

  const title = hiring?.isHiring === false ? defaultTitle : hiringTitle;
  const info = hiring?.isHiring === false ? msg : hiringMsg;

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
