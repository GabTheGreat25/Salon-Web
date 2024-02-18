import { React } from "react";
import { useSelector } from "react-redux";

export default function () {
  const user = useSelector((state) => state?.user);
  console.log(user);

  return (
    <>
    <h3>this is just a test to fetch user allergy..</h3>
    </>
  )
}
