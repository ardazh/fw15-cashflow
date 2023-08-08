import React from "react";
import Headers from "@/components/Header";
import Footers from "@/components/Footers";
import Aside from "@/components/Aside";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import cookieConfig from "@/helpers/cookieConfig";
import { BsCheckCircleFill, BsTelephone } from "react-icons/bs";
import PinInput from "@/components/PinInput";
import { useRouter } from "next/router";
import http from "@/helpers/http";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session.token;
    checkCredentials(token, res, "/auth/login");
    return {
      props: {
        token: req.session.token,
      },
    };
  },
  cookieConfig
);

function ChangePin({ token }) {
  const [oldPin, setOldPin] = React.useState("");
  const [newPin, setNewPin] = React.useState("");
  const [confirmPin, setConfirmPin] = React.useState("");
  const [formOldPin, setFormOldPin] = React.useState(true);
  const [formNewPin, setformNewPin] = React.useState(false);
  const [formConfirmPin, setformConfirmPin] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const router = useRouter();

  const doOldPin = () => {
    setErrorMessage("");
    if (oldPin.length === 6) {
      setFormOldPin(false);
      setformNewPin(true);
      console.log("oldPin :" + oldPin);
    } else {
      setErrorMessage("Pin must be 6 digits");
    }
  };

  const doNewPin = () => {
    setErrorMessage("");
    if (newPin.length === 6) {
      setformNewPin(false);
      setformConfirmPin(true);
      console.log("newPin :" + newPin);
    } else {
      setErrorMessage("Pin must be 6 digits");
    }
  };
  const doChangePin = async () => {
    setErrorMessage("");
    if (newPin === oldPin) {
      setErrorMessage("Pin must be different from the old pin");
      setFormOldPin(true);
      setformNewPin(false);
      setformConfirmPin(false);
      setOldPin("");
      setNewPin("");
      setConfirmPin("");
    }
    if (newPin !== confirmPin) {
      setErrorMessage("Confirm Pin does not match");
    } else if (newPin.length === 6 && newPin !== oldPin) {
      console.log("confirm :" + confirmPin);
      const form = new URLSearchParams({
        oldPin: oldPin,
        newPin: newPin,
        confirmPin: confirmPin,
      }).toString();

      try {
        const { data } = await http(token).patch("/profile/change-pin", form);
        console.log(data);
        if (data) {
          setSuccessMessage(true);
          setformNewPin(false);
          setformConfirmPin(false);
          setFormOldPin(true);
          setOldPin("");
          setNewPin("");
          setConfirmPin("");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    } else if (confirmPin.length < 6) {
      setErrorMessage("Pin must be 6 digits");
    }
  };

  const handleSubmitOldPin = (e) => {
    e.preventDefault();
    doOldPin();
  };

  const handleSubmitNewPin = (e) => {
    e.preventDefault();
    doNewPin();
  };

  const handleSubmitChangePin = (e) => {
    e.preventDefault();
    doChangePin();
  };

  return (
    <main className="bg-[#E5E5E5]">
      <div>
        <Headers token={token} />
      </div>
      <div className="flex">
        <div>
          <Aside token={token} />
        </div>
        <div className="flex flex-col bg-[#FFFFFF] shadow-xl rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10">
          <div className="font-bold text-lg text-[#3A3D42] mb-[25px]">
            Change PIN
          </div>
          <div className="text-[#7A7886] mb-[100px]">
            Enter your current 6 digits CashFlow PIN below
            <br />
            to continue to the next steps.
          </div>
          <div className="flex flex-col gap-12 items-center pt-12 px-4">
            <div className="w-[400px] flex flex-col gap-6">
              <div className="flex gap-4 justify-between">
                {formOldPin && (
                  <form
                    onSubmit={handleSubmitOldPin}
                    className="w-full flex flex-col gap-7 items-center justify-center"
                  >
                    {successMessage && (
                      <div className="w-full flex flex-row justify-center text-white text-lg">
                        <BsCheckCircleFill
                          className="text-green-400"
                          size={60}
                        />
                      </div>
                    )}
                    <div className="w-full flex flex-row justify-center text-black font-semibold text-base">
                      Input Your Old PIN
                    </div>
                    {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setOldPin} />
                    <button
                      type="submit"
                      className="btn btn-primary w-full normal-case"
                    >
                      Continue
                    </button>
                  </form>
                )}
                {formNewPin && (
                  <form
                    onSubmit={handleSubmitNewPin}
                    className="w-full flex flex-col gap-7 items-center justify-center"
                  >
                    {successMessage && (
                      <div className="w-full flex flex-row justify-center text-white text-lg">
                        <BsCheckCircleFill
                          className="text-green-400"
                          size={60}
                        />
                      </div>
                    )}
                    <div className="w-full flex flex-row justify-center text-black font-semibold text-base">
                      Input Your New PIN
                    </div>
                    {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setNewPin} />
                    <button
                      type="submit"
                      className="btn btn-primary w-full normal-case"
                    >
                      Continue
                    </button>
                  </form>
                )}
                {formConfirmPin && (
                  <form
                    onSubmit={handleSubmitChangePin}
                    className="w-full flex flex-col gap-7 items-center justify-center"
                  >
                    {successMessage && (
                      <div className="w-full flex flex-row justify-center text-white text-lg">
                        <BsCheckCircleFill
                          className="text-green-400"
                          size={60}
                        />
                      </div>
                    )}
                    <div className="w-full flex flex-row justify-center text-black font-semibold text-base">
                      Confirm Your New PIN
                    </div>
                    {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setConfirmPin} />
                    <button
                      type="submit"
                      className="btn btn-primary w-full normal-case"
                    >
                      Continue
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footers />
      </div>
    </main>
  );
}

export default ChangePin;
