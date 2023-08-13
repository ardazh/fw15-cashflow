import React from "react";
import Headers from "@/components/header";
import Footers from "@/components/footers";
import Aside from "@/components/Aside";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import checkCredentials from "@/helpers/checkCredentials";
import cookieConfig from "@/helpers/cookieConfig";
import defaultPict from "../../assets/profile1.png";
import PinInput from "@/components/PinInput";
import { clearTransferState } from "@/redux/reducers/transfer";
import http from "@/helpers/http";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTransactions } from "@/redux/reducers/transactions";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, "/auth/login");
    return {
      props: { token },
    };
  },
  cookieConfig
);

function Confirmation({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const recipient = useSelector((state) => state.transfer.user);
  const amount = useSelector((state) => state.transfer.amount);
  const note = useSelector((state) => state.transfer.note);
  const profile = useSelector((state) => state.profile.data);
  const [pin, setPin] = React.useState("");
  const balanceLeft = profile.balance - amount;

  const notifyWarnReq = (data) => toast.warn(data);

  const transactionList = React.useCallback(async () => {
    const { data } = await http(token).get("/transactions", {
      params: { limit: 10 },
    });
    dispatch(setTransactions(data.results));
  }, [token, dispatch]);

  React.useEffect(() => {
    if (!recipient) {
      router.replace("/transactions/transfer");
    }
  }, [recipient, router]);

  const doTransfer = async () => {
    try {
      const form = new URLSearchParams({
        recipientId: recipient.id,
        notes: note,
        amount,
        pin,
      });
      await http(token).post("/transactions/transfer", form);
      dispatch(clearTransferState());
      transactionList();
      if (data.results) {
        router.replace("/transactions/" + data.results.id);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message === "transfer_wrong_pin") {
        notifyWarnReq("Opss! Wrong PIN");
      } else {
        notifyWarnReq(message);
      }
    }
  };

  return (
    <main className="bg-[#E5E5E5]">
      <div>
        <Headers token={token} />
      </div>
      <div className="flex">
        <Aside token={token} />
        <div className="flex flex-col bg-[#FFFFFF] rounded-xl w-[850px] h-full px-[30px] pt-[30px] mx-5 my-10">
          <div className="p-2 flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
              <div className="text-lg text-neutral font-semibold">
                Transfer To
              </div>
            </div>
            <div className="w-full h-[600px] flex flex-col items-start justify-start gap-11">
              <div className="w-full h-28 flex items-center justify-start p-2 rounded-xl shadow-md shadow-[#EAEAEA]">
                <div className="w-full h-full flex items-center justify-start gap-5 text-[#7A7886]">
                  <div>
                    {recipient.picture ? (
                      <Image
                        className="object-cover w-16 h-16 rounded-xl"
                        width={150}
                        height={150}
                        src={recipient.picture}
                        alt="userImage"
                      />
                    ) : (
                      <Image
                        className="object-cover w-16 h-16 rounded-xl"
                        width={150}
                        height={150}
                        src={defaultPict}
                        alt="defaultUser"
                      />
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-neutral text-base font-semibold ${
                        recipient?.fullName ? "capitalize" : ""
                      }`}
                    >
                      {recipient?.fullName || recipient?.username}
                    </div>
                    <div className="">
                      {recipient?.phones ? recipient.phones : recipient?.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-start rounded-xl shadow-md shadow-[#EAEAEA]">
                <div className="self-start w-full lg:w-[50%] text-[#7A7886] pl-5">
                  Details
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-11 pl-5">
                  <div className="w-full flex flex-col items-start justify-start">
                    <div className="text-base">Amount</div>
                    <div className="text-xl text-neutral font-semibold">
                      {amount && `Rp${Number(amount).toLocaleString("id")}`}
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="text-base">Balance Left</div>
                    <div className="text-xl text-neutral font-semibold">
                      {balanceLeft &&
                        `Rp${Number(balanceLeft).toLocaleString("id")}`}
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="text-base">Date & Time</div>
                    <div className="text-xl text-neutral font-semibold">
                      {moment(new Date()).format("MMMM Do, YYYY - HH.mm")}
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="text-base">Notes</div>
                    <div className="text-xl text-neutral font-semibold">
                      {note}
                    </div>
                  </div>
                </div>
                <div className="w-full text-end mt-5">
                  <button
                    onClick={() => window.my_modal_1.showModal()}
                    className="btn btn-primary capitalize text-white w-full lg:w-[170px]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <dialog id="my_modal_1" className="modal">
              <form
                method="dialog"
                className="modal-box flex flex-col gap-6 bg-white"
              >
                <h3 className="font-bold text-primary text-lg">
                  Enter PIN to Transfer
                </h3>
                <p className="py-4 pr-28 text-left">
                  Enter your 6 digits PIN for confirmation to continue
                  transferring money.{" "}
                </p>
                <PinInput onChangePin={setPin} />
                <div className="modal-action">
                  <button
                    onClick={doTransfer}
                    disabled={!(pin.length >= 6)}
                    type="submit"
                    className="btn btn-primary w-full h-full lg:w-36 normal-case rounded-xl text-md"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </dialog>
            <div className="pt-2">
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </div>
          </div>
        </div>
      </div>
      <Footers />
    </main>
  );
}

export default Confirmation;
