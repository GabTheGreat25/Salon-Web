import React from "react";
import { Card, CardImage } from "@components";
import { useGetEquipmentByIdQuery,useUpdateEquipmentMutation,  } from "@api";
import { editEquipmentValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { ImagePreview } from "@components";


export default function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const{ data, isLoading } = useGetEquipmentByIdQuery(id); 
  const equipment = data?.details;
  const [updateEquipment] = useUpdateEquipmentMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      equipment_name: equipment?.equipment_name || "",
      equipment_price: equipment?.equipment_price || "",
      purchased_date: equipment?.purchased_date || "",
      quantity: equipment?.quantity || "",
      image: equipment?.image ||  [],
    },
    validationSchema: editEquipmentValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("equipment_name", values?.equipment_name);
      formData.append("equipment_price", values?.equipment_price);
      formData.append("purchased_date", values?.purchased_date);
      formData.append("quantity", values?.quantity);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateEquipment({ id: equipment._id, payload: formData }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/equipments");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Equipment
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit Equipment Details at Lhanlee Beauty Lounge
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full h-full grid-flow-row-dense pr-12 gap-y-4"
                >

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.equipment_name &&
                        formik.errors.equipment_name &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Equipment Name:
                    </span>
                    <input
                      type="text"
                      id="equipment_name"
                      name="equipment_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.equipment_name}
                      className={`${
                        formik.touched.equipment_name &&
                        formik.errors.equipment_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Name"
                    />
                    {formik.touched.equipment_name &&
                      formik.errors.equipment_name && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.equipment_name}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.equipment_price &&
                        formik.errors.equipment_price &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Equipment Price:
                    </span>
                    <input
                      type="text"
                      id="equipment_price"
                      name="equipment_price"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.equipment_price}
                      className={`${
                        formik.touched.equipment_price &&
                        formik.errors.equipment_price
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Name"
                    />
                    {formik.touched.equipment_price &&
                      formik.errors.equipment_price && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.equipment_price}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.quantity &&
                        formik.errors.quantity &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Equipment Quantity:
                    </span>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      className={`${
                        formik.touched.quantity &&
                        formik.errors.quantity
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Quantity"
                    />
                    {formik.touched.quantity &&
                      formik.errors.quantity && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.quantity}
                        </div>
                      )}
                  </label>

                    <label className="block">
                    <span className={`xl:text-xl md:text-[1rem] font-semibold`}>
                      Upload Image:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      autoComplete="off"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "image",
                          Array.from(event.currentTarget.files)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      multiple
                      className={`${
                        formik.touched.image && formik.errors.image
                          ? "border-red-600"
                          : "border-light-default"
                      } block pt-3 mb-2 ml-6 xl:text-xl md:text-[1rem] w-full`}
                    />
                    <span className="grid items-center justify-center grid-flow-row grid-cols-5 gap-2 mt-8 gap-x-2">
                      {data?.details?.image?.map((image) => (
                        <span key={image?.public_id}>
                          <img
                            height={60}
                            width={75}
                            src={image?.url}
                            alt={image?.originalname}
                          />
                        </span>
                      ))}
                    </span>
                  </label>
                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem]  btn btn-primary text-light-default dark:text-dark-default ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Submit
                    </button>
                  </span>
                </form>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
