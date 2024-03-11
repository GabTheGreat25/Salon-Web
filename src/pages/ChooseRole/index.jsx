import React from "react";
import { Card, Role } from "@components";
import Beautician from "@assets/lhanlee-beautician.png";
import Customer from "@assets/lhanlee-hiring.jpg";
import { useSelector } from "react-redux";

export default function () {
  const hiring = useSelector((state) => state.hiring);

  return (
    <>
      <Card>
        <div className="grid items-center justify-center w-full h-full text-light-default dark:text-dark-default">
          <div className="relative grid items-center justify-center w-full grid-flow-col-dense grid-cols-2 gap-4 xl:bottom-10 md:bottom-5 h-fit">
            {hiring.hiringData.isHiring === true ? (
              <Role
                image={Beautician}
                imageName="Beautician"
                title="Become Our Lhanlee Beautician"
                description="We're thrilled to welcome expert beauticians and stylists who are interested in joining in Lhanlee Beauty Lounge! We understand that you may prefer to apply in person, and we're here to facilitate that process for you."
                buttonTitle="Register as Beautician"
                navigateTo="/beauticianSignUp"
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
