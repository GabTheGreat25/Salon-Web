import React from "react";
import { OnlineCustomerSidebar, WalkInCustomerSidebar } from "@/components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCommentsQuery, useDeleteCommentMutation } from "@api";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import noPhoto from "@/assets/no-photo.jpg";
import { addDeletedItemId, getDeletedItemIds } from "@utils";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");

  const { data, isLoading } = useGetCommentsQuery();
  const comments = data?.details || [];

  const filteredComments = comments.filter((comment) => {
    const appointmentCustomerID =
      comment?.transaction?.appointment?.customer?._id;
    const authID = auth?._id;
    return appointmentCustomerID === authID;
  });

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const deletedCommentIds = getDeletedItemIds("comment");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const response = await deleteComment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("comment", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const filteredDeletedComments = filteredComments?.filter(
    (comment) => !deletedCommentIds.includes(comment?._id)
  );

  return (
    <>
      {isLoading || isDeleting ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            {isOnlineCustomer ? (
              <OnlineCustomerSidebar />
            ) : isWalkInCustomer ? (
              <WalkInCustomerSidebar />
            ) : null}
            <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense mx-20 my-10 gap-y-8 ">
              {filteredDeletedComments?.map((comment) => (
                <div
                  key={comment?._id}
                  className="flex items-center w-full h-full px-8 py-6 rounded-lg bg-primary-default"
                >
                  <div className="flex-grow">
                    <div className="grid grid-flow-col-dense">
                      <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                        Appointment schedule:{" "}
                        {comment?.transaction?.appointment?.date
                          ? new Date(comment.transaction.appointment.date)
                              .toISOString()
                              .split("T")[0]
                          : ""}{" "}
                        {comment?.transaction?.appointment?.time?.length > 0
                          ? `${comment.transaction.appointment.time[0]} to ${
                              comment.transaction.appointment.time[
                                comment.transaction.appointment.time.length - 1
                              ]
                            }`
                          : comment?.transaction?.appointment?.time || ""}{" "}
                      </h2>
                      <div className="grid items-center justify-end">
                        <h1 className="grid grid-flow-col px-2 py-[.4rem] mb-2 gap-x-1 rounded-2xl lg:text-lg md:text-sm bg-dark-default dark:bg-light-default">
                          {Array.from(
                            { length: comment?.ratings },
                            (_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className="text-[#feca57] lg:text-2xl"
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - comment?.ratings },
                            (_, index) => (
                              <FontAwesomeIcon
                                key={`empty-${index}`}
                                icon={faStar}
                                className="lg:text-2xl text-light-default dark:text-dark-default"
                              />
                            )
                          )}
                        </h1>
                      </div>
                    </div>
                    <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid grid-cols-2 px-8">
                      <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                        <div className="grid items-center justify-center">
                          <img
                            src={
                              comment?.image && comment?.image?.length
                                ? comment?.image[
                                    Math.floor(
                                      Math.random() * comment?.image?.length
                                    )
                                  ]?.url
                                : noPhoto
                            }
                            alt={comment?.image?.originalname}
                            key={comment?.image?.public_id}
                            className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                          />
                        </div>
                        <div>
                          <div className="grid grid-flow-row">
                            <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                              Description: {comment?.description}
                            </h3>
                            <p className="py-1 font-semibold xl:text-lg lg:text-base md:text-sm">
                              Suggestion: {comment?.suggestion}
                            </p>
                            <p className="font-semibold xl:text-xl lg:text-base md:text-sm">
                              Beautician:{" "}
                              {comment?.transaction?.appointment?.beautician
                                ?.length > 0
                                ? comment.transaction.appointment.beautician
                                    .map((beautician) => beautician.name)
                                    .join(", ")
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid items-center justify-end grid-flow-col-dense gap-x-4">
                      <div
                        onClick={() =>
                          navigate(
                            `${
                              isOnlineCustomer
                                ? "/onlineCustomer"
                                : "/walkInCustomer"
                            }/comment/edit/${comment._id}`
                          )
                        }
                        className="px-10 py-2 text-xl border rounded-lg cursor-pointer border-light-default dark:border-dark-default hover:bg-blue-500"
                      >
                        <button>Edit</button>
                      </div>
                      <div
                        onClick={() => handleDelete(comment._id)}
                        className="px-10 py-2 text-xl border rounded-lg cursor-pointer border-light-default dark:border-dark-default hover:bg-red-500"
                      >
                        <button>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
