import React from "react";
import { Card, Role } from "@components";
import Beautician from "@assets/lhanlee-beautician.png";
import Customer from "@assets/lhanlee-hiring.jpg";
import { useGetHiringsQuery } from "@api";

export default function () {
  const { data } = useGetHiringsQuery();
  const hiring = data?.details[0];

  return (
    <>
      <Card>
        <div className="grid items-center justify-center w-full h-full text-light-default dark:text-dark-default">
          <div className="relative grid items-center justify-center w-full grid-flow-col-dense grid-cols-2 gap-4 xl:bottom-10 md:bottom-5 h-fit">
            {hiring?.isHiring === true && hiring?.type === "Beautician" ? (
              <Role
                image={Beautician}
                imageName="Beautician"
                title="Become Our Lhanlee Beautician"
                description="We're thrilled to welcome expert beauticians and stylists who are interested in joining in Lhanlee Beauty Lounge! We understand that you may prefer to apply in person, and we're here to facilitate that process for you."
                buttonTitle="Register as Beautician"
                navigateTo="/beauticianSignUp"
              />
            ) : null}
            {hiring?.isHiring === true && hiring?.type === "Receptionist" ? (
              <Role
                image={Beautician}
                imageName="Beautician"
                title="Become Our Lhanlee Receptionist"
                description="We're looking for a receptionist to join our team at Lhanlee Beauty Lounge! As a receptionist, you'll be the first point of contact for our clients, providing exceptional customer service and ensuring smooth operations at the front desk."
                buttonTitle="Register as Receptionist"
                navigateTo="/receptionistSignUp"
              />
            ) : null}
            <Role
              image={Customer}
              imageName="Customer"
              title="Become Our Lhanlee Customer"
              description="Begin your journey today and enjoy exclusive perks just for you! As a member, you'll have access to our range of premium beauty treatments and products, designed to enhance your natural beauty and leave you feeling refreshed and revitalized."
              buttonTitle="Register as Customer"
              navigateTo="/customerSignUp"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
