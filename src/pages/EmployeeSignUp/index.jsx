import React from "react";
import { SignUp } from "@components";

export default function () {
  return (
    <>
      <SignUp
        title="Sign Up"
        description="Get us some of your information to get a free access to our Lhanlee Beauty Lounge website."
        name="Full name"
        email="Email address"
        data="Job role"
        contactNumber="Contact number"
        password="Password"
        confirmPassword="Confirm password"
      />
    </>
  );
}
