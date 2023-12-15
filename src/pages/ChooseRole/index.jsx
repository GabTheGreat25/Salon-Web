import React from "react";
import { Card, Role } from "@components";
import BeauticianImg from "@assets/Beautician.png";
import CustomerImg from "@assets/Customer.png";

export default function () {
  return (
    <Card>
      <div className="grid items-center justify-center w-full h-full text-light-default dark:text-dark-default">
        <div className="relative grid w-full grid-cols-3 gap-4 xl:bottom-10 md:bottom-5 h-fit">
          <Role
            image={BeauticianImg}
            imageName="BeauticianImg"
            title="Become Our Lanlee Beautician"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut incidunt minima ab harum alias aliquam."
            buttonTitle="Register as Beautician"
            navigateTo="/beauticianSignUp"
          />
          <Role
            image={CustomerImg}
            imageName="CustomerImg"
            title="Become Our Lanlee Online Customer"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut incidunt minima ab harum alias aliquam."
            buttonTitle="Register as Online Customer"
            navigateTo="/onlineCustomerSignUp"
          />
          <Role
            image={CustomerImg}
            imageName="CustomerImg"
            title="Become Our Lanlee Walk-In Customer"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut incidunt minima ab harum alias aliquam."
            buttonTitle="Register as Walk-In Customer"
            navigateTo="/walkInCustomerSignUp"
          />
        </div>
      </div>
    </Card>
  );
}
