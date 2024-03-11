import React from "react";
import { Welcome } from "@components";
import Logo2 from "@assets/lhanlee-hiring.jpg";
import { useGetHiringsQuery } from "@api";

export default function () {
  const { data } = useGetHiringsQuery();
  const hiring = data?.details[0];

  const defaultTitle = `Become a Lhanlee <br /> Beautician!`;
  const hiringTitle = `Were Hiring A <br/>${hiring.type}<br/> Apply now! <br/>`;

  const msg = `Are you passionate about beauty and wellness?  <br /> Turn your passion into a rewarding career  <br /> as a beautician at Lhanlee Beauty Lounge..`;
  const hiringMsg = `Hiring Date: ${
    new Date(hiring?.date).toISOString().split("T")[0]
  } <br/> Hiring Time Slot: ${
    hiring?.time
  }  <br/> Bring a Valid ID <br/> Bring Your Own Resume with Updated: </br>  contact
  information, education, and relevant work experience.`;

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
