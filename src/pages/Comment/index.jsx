import React, { useRef, useEffect } from "react";
import { CustomerSidebar } from "@/components";
import { useNavigate } from "react-router-dom";
import { useGetCommentsQuery, useDeleteCommentMutation } from "@api";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import noPhoto from "@/assets/no-photo.jpg";
import { addDeletedItemId, getDeletedItemIds } from "@utils";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.user);

  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetCommentsQuery();
  const comments = data?.details || [];

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

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
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <CustomerSidebar />
            <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense mx-20 my-10 gap-y-8 ">
              {filteredDeletedComments?.map((comment) => (
                <div
                  key={comment?._id}
                  className="flex items-center w-full h-full px-8 py-6 rounded-lg bg-primary-t3"
                >
                  <div className="flex-grow">
                    <div className="grid grid-flow-col-dense">
                      <h2 className="pb-2 font-sans font-semibold xl:text-2xl lg:text-lg md:text-[.95rem]">
                        {`Date:
                        ${
                          comment?.transaction?.appointment?.date
                            ? new Date(comment.transaction.appointment.date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        } at
                        ${
                          comment?.transaction?.appointment?.time?.length > 0
                            ? comment.transaction.appointment.time.length === 1
                              ? `${comment?.transaction?.appointment?.time[0]}`
                              : `${
                                  comment.transaction.appointment.time[0]
                                } to ${
                                  comment.transaction.appointment.time[
                                    comment.transaction.appointment.time
                                      .length - 1
                                  ]
                                }`
                            : comment?.transaction?.appointment?.time || ""
                        }`}
                      </h2>
                      <div className="grid items-center justify-end">
                        <h1 className="grid grid-flow-col px-2 py-[.4rem] mb-2 gap-x-1 rounded-2xl  bg-dark-default dark:bg-light-default">
                          {Array.from(
                            { length: comment?.ratings },
                            (_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className="text-[#feca57] xl:text-2xl lg:text-lg md:text-[0.9rem]"
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - comment?.ratings },
                            (_, index) => (
                              <FontAwesomeIcon
                                key={`empty-${index}`}
                                icon={faStar}
                                className="xl:text-2xl lg:text-lg md:text-[0.9rem] text-light-default dark:text-dark-default"
                              />
                            )
                          )}
                        </h1>
                      </div>
                    </div>
                    <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid px-8">
                      <div className="grid 2xl:grid-cols-[15%_85%] xl:grid-cols-[20%_80%] md:grid-cols-[30%_70%] gap-x-4">
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
                            className="object-cover w-40 h-40 rounded-2xl"
                          />
                        </div>
                        <div>
                          <div className="grid grid-flow-row">
                            <h3 className="font-semibold xl:text-xl lg:text-base md:text-sm">
                              Description: {comment?.description}
                            </h3>
                            <p className="py-1 font-semibold xl:text-lg lg:text-base md:text-sm">
                              Suggestion: {comment?.suggestion}
                            </p>
                            <p className="font-semibold xl:text-xl lg:text-base md:text-sm">
                              Beautician:{" "}
                              {comment?.transaction?.appointment?.beautician
                                ?.length > 0
                                ? comment?.transaction?.appointment?.beautician
                                    .map((beautician) => beautician?.name)
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
                          navigate(`/customer/comment/edit/${comment?._id}`)
                        }
                        className="px-10 py-2 text-xl border rounded-lg cursor-pointer bg-primary-default border-light-default dark:border-dark-default hover:bg-primary-accent"
                      >
                        <button>Edit</button>
                      </div>
                      <div
                        onClick={() => handleDelete(comment._id)}
                        className="px-10 py-2 text-xl border rounded-lg cursor-pointer bg-primary-default border-light-default dark:border-dark-default hover:bg-primary-accent"
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
