import React from "react";
import { Card, Role } from "@components";
import LogoOne from "@assets/Logo-1.png";
import CustomerOne from "@assets/Logo-3.png";
import CustomerTwo from "@assets/customerTwo.png";
import { useSelector } from "react-redux";

export default function () {
  const hiring = useSelector((state) => state.hiring);

  return (
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
            image={CustomerTwo}
            imageName="CustomerTwo"
            title="Become Our Online Customer"
            description="Thank you for choosing Lhanlee Beauty Lounge! Whether you book in advance or walk in spontaneously, we're committed to ensuring your experience with us is seamless and satisfying."
            buttonTitle="Register as Online Customer"
            navigateTo="/onlineCustomerSignUp"
          />
          <Role
            image={CustomerOne}
            imageName="CustomerOne"
            title="Become Our Walk-in Customer"
            description="We're thrilled that you've decided to visit us! While our appointments system helps streamline our service, we understand that sometimes you need assistance on the spot. That's why we're here to accommodate walk-in customers like you."
            buttonTitle="Register as Walk-in Customer"
            navigateTo="/walkInCustomerSignUp"
          />
        </div>
      </div>
    </Card>
  );
}
