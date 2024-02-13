import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { waiverSlice } from "@waiver";
import { useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const dispatch = useDispatch();

  const sigCanvas = useRef({});

  const clearSignature = () => {
    sigCanvas.current.clear();
    dispatch(waiverSlice.actions.resetWaiver());
  };

  const saveSignature = () => {
    const toastProps = {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    };
    if (sigCanvas.current.isEmpty()) {
      toast.warning("Please provide a signature first.", toastProps);
      return;
    }

    const base64Data = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    dispatch(waiverSlice.actions.waiverForm(base64Data));
    sigCanvas.current.clear();
    window.history.back();
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 m-6 border-2 rounded-lg border-dark-default dark:border-light-default">
      <div>
        <button onClick={goBack}>
          <FaArrowLeft size={40} />
        </button>
        <h2 className="my-4 text-5xl font-bold text-center">
          Salon Waiver Agreement
        </h2>
        <p className="mb-4 text-4xl font-normal text-justify">
          I, acknowledge that I am voluntarily receiving services from Lhanlee
          Beauty Lounge, located at 22 Calleja Steet Central Signal Village 1630
          Taguig, Philippines. Before proceeding with the services, I have read
          and understood the terms of this waiver agreement.
        </p>
        <p className="mb-4 text-4xl font-normal text-justify">
          Ingredients Disclosure:
          <br /> I understand that the products and materials used in the salon
          may contain various ingredients, including but not limited to
          chemicals, dyes, and fragrances. These ingredients may pose risks of
          allergic reactions or sensitivities. The salon staff will provide
          information about the ingredients upon request. The salon is not liable for any adverse reactions or
          consequences arising from undisclosed allergies.
        </p>
        <p className="mb-4 text-4xl font-normal text-justify">
          Salon's Limited Liability:
          <br /> I understand and agree that Lhanlee Beauty Lounge and its staff
          are not liable for any injuries, damages, or losses that may occur
          during or as a result of the services provided. This includes but is
          not limited to allergic reactions, skin irritations, or injuries
          resulting from negligence. I release Lhanlee Beauty Lounge and its
          staff from any liability arising from the services rendered.
        </p>
        <p className="mb-4 text-4xl font-normal text-justify">
          Assumption of Risk:
          <br /> I acknowledge that salon services may involve inherent risks,
          including but not limited to chemical exposure, burns, or other
          injuries. I voluntarily assume all risks associated with receiving
          salon services and waive any claims against Lhanlee Beauty Lounge and
          its staff for any injuries or damages incurred. Signature: By signing
          below, I acknowledge that I have read, understood, and agree to the
          terms of this waiver agreement. I consent to receive salon services
          knowing the risks involved.
        </p>
        <div className="grid items-center justify-end grid-flow-row-dense gap-y-6">
          <span className="w-full border-2 rounded-lg border-dark-default dark:border-light-default">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ width: 300, height: 150, className: "sigCanvas" }}
            />
          </span>
          <div className="grid items-center justify-center grid-flow-col-dense gap-x-4">
            <button
              className="self-end px-4 py-2 mr-2 font-bold bg-blue-500 rounded text-light-default dark:text-dark-default hover:bg-blue-700"
              onClick={saveSignature}
            >
              Save Signature
            </button>
            <button
              className="self-end px-4 py-2 font-bold bg-red-500 rounded text-light-default dark:text-dark-default hover:bg-red-700"
              onClick={clearSignature}
            >
              Clear Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
