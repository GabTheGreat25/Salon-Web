import { React, useState, useEffect } from "react";
import { useGetFeedbacksQuery } from "@api";
import { FadeLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";

export default function () {
  const { data, isLoading } = useGetFeedbacksQuery();
  const feedback = data?.details;

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (feedback && feedback) {
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
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={items?.length}
          next={fetchMoreFeedbacks}
          hasMore={hasMore}
          loader={<h3>Loading...</h3>}
          endMessage={<p>No more feedbacks</p>}
        >
          <div className="w-full min-h-screen py-6 rounded-lg bg-light-default dark:bg-dark-default">
            <div className="px-8">
              <h1 className="pb-4 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                Lhanlee Beauty Lounge Feedback
              </h1>
              <div className="grid grid-flow-row-dense gap-y-8">
                {feedback?.map((f) => (
                  <div
                    key={f?._id}
                    className="px-8 py-4 rounded-md bg-primary-default"
                  >
                    <div className="grid items-center justify-center grid-flow-col-dense w-fit gap-x-6">
                      <div>
                        <h1 className="pb-2 font-semibold xl:text-lg md:text-base">
                          {f.isAnonymous
                            ? f.name.charAt(0) + "*".repeat(f.name?.length - 1)
                            : f.name}
                        </h1>

                        <h1 className="py-4 text-lg text-justify">
                          {f.description}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
