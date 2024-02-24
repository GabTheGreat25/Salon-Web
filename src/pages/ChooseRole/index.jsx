import React from "react";
import { Card, Role } from "@components";
import LogoOne from "@assets/Logo-1.png";
import CustomerOne from "@assets/walkincustomer-logo.png";
import { useSelector } from "react-redux";

export default function () {
  const hiring = useSelector((state) => state.hiring);

  return (
    <>
      <Card>
        <div className="grid items-center justify-center w-full h-full text-light-default dark:text-dark-default">
          <div className="relative grid w-full grid-flow-col-dense gap-4 xl:bottom-10 md:bottom-5 h-fit">
            {hiring.hiringData.isHiring === true ? (
              <Role
                image={LogoOne}
                imageName="LogoOne"
                title="Become Our Lhanlee Beautician"
                description="We're thrilled to welcome expert beauticians and stylists who are interested in joining in Lhanlee Beauty Lounge! We understand that you may prefer to apply in person, and we're here to facilitate that process for you."
                buttonTitle="Register as Beautician"
                navigateTo="/beauticianSignUp"
              />
            ) : null}
            <Role
              image={CustomerOne}
              imageName="CustomerOne"
              title="Become Our Lhanlee Customer"
              description="Thank you for choosing Lhanlee Beauty Lounge! Whether you book in advance or walk in spontaneously, we're committed to ensuring your experience with us is seamless and satisfying."
              buttonTitle="Register as Customer"
              navigateTo="/customerSignUp"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
