import * as yup from "yup";

const isPhilippineContactNumber = (value) => {
  const regex = /^(\+63|0|63)?[9]\d{9}$/;
  return regex.test(value);
};

export default yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  age: yup
    .number("Enter your age")
    .required("Age is required")
    .min(13, "Age should be of minimum 13 years"),
  contact_number: yup
    .string("Enter your contact number")
    .required("Contact number is required")
    .min(11, "Contact number should be exactly 11 digits")
    .max(11, "Contact number should be exactly 11 digits")
    .test(
      "isPhilippineContactNumber",
      "Invalid Philippine contact number",
      isPhilippineContactNumber
    ),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "custom-validation",
      "Please ensure your description includes essential details such as hair length (e.g., 'Long Hair', 'Short Hair'), eye and hair colors (e.g., black, white), and gender ('Male' or 'Female') to facilitate accurate service matching. Thank you for your cooperation.",
      function (value) {
        const pattern =
          /long\s+hair|short\s+hair|black|white|red|pink|blue|green|yellow|orange|purple|brown|gray|grey|beige|cyan|maroon|navy|olive|teal|violet|indigo|turquoise|lavender|magenta|coral|crimson|gold|silver|plum|tan|salmon|ivory|peach|lime|ruby|sapphire|emerald|taupe|chartreuse|periwinkle|mauve|amber|fuchsia|orchid|sepia|cobalt|topaz|jade|cerulean|rust|khaki|umber|saffron|ochre|rose|vermilion|buff|copper|cream|indigo|auburn|chestnut|strawberry\s+blonde|ginger|platinum\s+blonde|dirty\s+blonde|light\s+brown|dark\s+brown|black\s+brown|silver\s+blonde|ash\s+blonde|ash\s+brown|ash\s+blond|ash\s+brunette|chocolate\s+brown|caramel\s+brown|bronze\s+brown|bronze\s+blonde|copper\s+red|fiery\s+red|russet\s+red|mahogany\s+brown|mahogany\s+red|burgundy\s+red|auburn\s+brown|auburn\s+red|auburn\s+blonde|strawberry\s+blonde|red\s+blonde|red\s+brown|blonde\s+red|brunette\s+red|brown\s+red|auburn\s+blonde|auburn\s+brown|auburn\s+brunette|auburn\s+blond|auburn\s+red|auburn\s+copper|blonde\s+brown|blond\s+brown|blond\s+brunette|blond\s+brunet|blond\s+blonde|brown\s+blond|brown\s+brunette|brown\s+brunet|brunet\s+blonde|brunet\s+brown|brunet\s+brunette|auburn\s+blonde|auburn\s+brown|auburn\s+brunette|auburn\s+blond|auburn\s+red|auburn\s+copper|auburn\s+orange/i;
        return pattern.test(value);
      }
    ),
});
