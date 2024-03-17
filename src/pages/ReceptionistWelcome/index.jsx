import React, { useState } from "react";
import {
  useGetAppointmentsQuery,
  useGetTimesQuery,
  useGetUsersQuery,
} from "@api";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Autosuggest from "react-autosuggest";
import { customerSlice } from "@customer";
import { useDispatch } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetAppointmentsQuery();
  const appointment = data?.details;
  const { data: timesData, isLoading: timesLoading } = useGetTimesQuery();
  const times = timesData?.details;
  const { data: user, isLoading: usersLoading } = useGetUsersQuery();
  const users = user?.details;

  const filteredUsers = users?.filter((user) =>
    user?.roles.includes("Customer")
  );

  const today = new Date();
  const utcOffset = 8 * 60;
  const phTime = new Date(today.getTime() + utcOffset * 60000);
  //! Uncomment the line below if you want to test the time
  // const phTime = new Date(
  //   today.getTime() + utcOffset * 60000 + 9 * 60 * 60 * 1000
  // );

  const formattedDateWithTime = phTime.toISOString();
  const currentTime = formattedDateWithTime.slice(11, 19);
  const formattedDate = phTime.toISOString().split("T")[0];
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    };
    return new Date(dateString).toLocaleDateString("en-PH", options);
  };

  const formattedDatePH = formatDate(formattedDate);

  const appointmentToday = appointment?.filter((a) => {
    const appointmentDate = new Date(a?.date).toISOString().split("T")[0];
    return appointmentDate === formattedDate;
  });

  const appointmentTimes = appointmentToday?.flatMap((a) => a.time);
  const availableTimes = times?.filter(
    (t) => !appointmentTimes?.includes(t.time)
  );

  const filteredTimes = availableTimes?.filter((time) => {
    const appointmentTime = time?.time;
    const timeParts = appointmentTime.split(" ");
    const [hour, minute] = timeParts[0].split(":");
    const isPM = timeParts[1] === "PM";
    let hour24 = parseInt(hour, 10);

    if (isPM && hour24 !== 12) {
      hour24 += 12;
    } else if (!isPM && hour24 === 12) {
      hour24 = 0;
    }

    const currentHour24 = parseInt(currentTime.slice(0, 2), 10);
    const currentMinute = parseInt(currentTime.slice(3, 5), 10);

    return (
      hour24 > currentHour24 ||
      (hour24 === currentHour24 && parseInt(minute, 10) >= currentMinute)
    );
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const suggestions =
      inputValue.length === 0
        ? filteredUsers
        : filteredUsers.filter((user) =>
            user.name.toLowerCase().startsWith(inputValue)
          );

    return suggestions;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const suggestions = getSuggestions(inputValue);
    setSuggestions(suggestions);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSearchTerm(suggestion.name);
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.name;
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div className="z-[1000] text-xl p-2 font-semibold bg-primary-accent cursor-pointer hover:bg-primary-default">
        {suggestion.name}
      </div>
    );
  };

  const inputProps = {
    placeholder: "Search by name...",
    value: searchTerm,
    onChange: (event, { newValue }) => setSearchTerm(newValue),
    className:
      "rounded-md w-full text-lg border double border-4 border-primary-accent font-bold text-left px-3 py-2 hover:cursor-text placeholder:text-primary-variant text-primary-accent focus:outline-none focus:ring-primary-accent focus:border-primary-accent",
  };

  const handleSelectCustomer = (customerId) => {
    const selectedCustomer = filteredUsers.find(
      (user) => user._id === customerId
    );

    if (selectedCustomer) {
      dispatch(
        customerSlice.actions.customerForm({
          customerId,
          allergy: Array.isArray(selectedCustomer?.information?.allergy)
            ? selectedCustomer?.information?.allergy
            : [],
          othersMessage: selectedCustomer?.information?.othersMessage,
        })
      );
    }

    navigate(`/receptionist/services`);
  };

  return (
    <>
      {isLoading || timesLoading || usersLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="min-h-screen py-10 mx-auto max-w-screen-2xl">
            <h3 className="text-3xl font-semibold text-center">
              Available Time for Today: {formattedDatePH}
            </h3>
            <React.Fragment>
              {filteredTimes?.length > 0 ? (
                <div className="grid grid-cols-3 gap-6 p-12">
                  {filteredTimes.map((time) => (
                    <div
                      key={time?._id}
                      className="p-3 rounded-lg bg-primary-default"
                    >
                      <div className="text-center">
                        <h3 className="text-xl font-bold">{time?.time}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-12">
                  <h1 className="text-3xl text-center font-base">
                    All Slots Are Occupied For Today
                  </h1>
                </div>
              )}
            </React.Fragment>
            <div className="grid items-center pb-6 px-96">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </div>
            <React.Fragment>
              {searchTerm ? (
                suggestions.length > 0 ? (
                  <div className="grid gap-4 px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {suggestions.map((c) => (
                      <div
                        key={c?._id}
                        className="flex flex-col justify-center w-full h-full px-2 pt-2 pb-6 rounded-lg bg-primary-default"
                      >
                        <div className="self-center p-2 m-2">
                          {c?.image && c?.image.length > 0 && (
                            <img
                              className="w-64 h-64 rounded-full"
                              src={
                                c?.image[
                                  Math.floor(Math.random() * c?.image.length)
                                ]?.url
                              }
                              alt={c?.image.originalname}
                              key={c?._id}
                            />
                          )}
                        </div>
                        <div className="px-4 mt-2">
                          <h3 className="pb-2 text-xl font-bold text-center">
                            Customer Details
                          </h3>
                          <p className="pb-2 text-xl font-bold capitalize">
                            Name:
                            <span className="ml-1 text-lg">
                              {c?.name?.length > 24
                                ? `${c?.name.substring(0, 24)}..`
                                : c?.nme}
                            </span>
                          </p>
                          <p className="pb-2 text-xl font-bold">
                            Customer Age:
                            <span className="ml-1 text-lg">{c?.age}</span>
                          </p>
                          <p className="pb-4 text-xl font-bold">
                            Mobile Number:
                            <span className="ml-1 text-lg">
                              {c?.contact_number}
                            </span>
                          </p>
                        </div>
                        <div className="grid grid-cols-2 px-2 gap-x-6">
                          <span>
                            <button
                              onClick={() =>
                                navigate(`/receptionist/customer/${c?._id}`)
                              }
                              className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-primary-t2"
                            >
                              View
                            </button>
                          </span>
                          <span>
                            <button
                              onClick={() => handleSelectCustomer(c?._id)}
                              className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-primary-t2"
                            >
                              Select
                            </button>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="my-12">
                    <h1 className="text-3xl text-center font-base">
                      No Customer Found
                    </h1>
                  </div>
                )
              ) : filteredUsers.length > 0 ? (
                <div className="grid gap-4 px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredUsers.map((c) => (
                    <div
                      key={c?._id}
                      className="flex flex-col justify-center w-full h-full px-2 pt-2 pb-6 rounded-lg bg-primary-default"
                    >
                      <div className="self-center p-2 m-2">
                        {c?.image && c?.image.length > 0 && (
                          <img
                            className="w-64 h-64 rounded-full"
                            src={
                              c?.image[
                                Math.floor(Math.random() * c?.image.length)
                              ]?.url
                            }
                            alt={c?.image.originalname}
                            key={c?._id}
                          />
                        )}
                      </div>
                      <div className="px-4 mt-2">
                        <h3 className="pb-2 text-xl font-bold text-center">
                          Customer Details
                        </h3>
                        <p className="pb-2 text-xl font-bold capitalize">
                          Name:
                          <span className="ml-1 text-lg">
                            {c?.name?.length > 24
                              ? `${c?.name.substring(0, 24)}..`
                              : c?.name}
                          </span>
                        </p>
                        <p className="pb-2 text-xl font-bold">
                          Customer Age:
                          <span className="ml-1 text-lg">{c?.age}</span>
                        </p>
                        <p className="pb-4 text-xl font-bold">
                          Mobile Number:
                          <span className="ml-1 text-lg">
                            {c?.contact_number}
                          </span>
                        </p>
                      </div>
                      <div className="grid grid-cols-2 px-2 gap-x-6">
                        <span>
                          <button
                            onClick={() =>
                              navigate(`/receptionist/customer/${c?._id}`)
                            }
                            className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-primary-t2"
                          >
                            View
                          </button>
                        </span>
                        <span>
                          <button
                            onClick={() => handleSelectCustomer(c?._id)}
                            className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-primary-t2"
                          >
                            Select
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-12">
                  <h1 className="text-3xl text-center font-base">
                    No Customer Records
                  </h1>
                </div>
              )}
            </React.Fragment>
          </div>
        </>
      )}
    </>
  );
}
