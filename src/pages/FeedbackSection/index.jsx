import React, { useState, useRef, useEffect } from "react";
import { useGetFeedbacksQuery } from "@api";
import { FadeLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";

export default function () {
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetFeedbacksQuery();
  const feedback = data?.details;

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

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (feedback) {
      setItems(feedback.slice(0, 5));
      setHasMore(feedback?.length > 5);
    }
  }, [feedback]);

  const fetchMoreFeedbacks = () => {
    const currentLength = items?.length;
    const newItems = feedback.slice(currentLength, currentLength + 5) || [];

    if (newItems?.length > 0) {
      setItems([...items, ...newItems]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={items?.length}
          next={fetchMoreFeedbacks}
          hasMore={hasMore}
          loader={<h3>Loading...</h3>}
        >
          <div className="w-full min-h-screen py-6 rounded-lg bg-light-default dark:bg-dark-default">
            <div className="px-8">
              <h1 className="pb-6 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                Lhanlee Beauty Lounge Feedback
              </h1>
              <div className="grid grid-flow-row-dense gap-y-8">
                {items.map((f, index) => (
                  <div
                    key={f?._id}
                    className="px-8 py-4 rounded-md bg-primary-default"
                  >
                    <div className="grid items-center justify-center grid-flow-col-dense w-fit gap-x-6">
                      <div>
                        <h1 className="pb-2 font-semibold xl:text-2xl md:text-lg">
                          {f.isAnonymous
                            ? f.name.charAt(0) + "*".repeat(f.name?.length - 1)
                            : f.name}
                        </h1>
                        <h1 className="py-4 text-justify xl:text-3xl md:text-xl">
                          {f.description}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!hasMore && items?.length === 0 && (
                    <p className="text-4xl font-bold text-center text-primary-accent">
                      No feedbacks yet
                    </p>
                  )}
                </div>
                {!hasMore && items?.length > 0 && (
                  <p className="mb-10 text-4xl font-bold text-center text-primary-accent">
                    No more feedbacks
                  </p>
                )}
              </div>
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
