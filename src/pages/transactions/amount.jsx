import React from "react";
import Headers from "@/components/Header";
import Footers from "@/components/Footers";
import Aside from "@/components/Aside";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import cookieConfig from "@/helpers/cookieConfig";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";
import { setAmount, setNote } from "@/redux/reducers/transfer";
import defaultPict from "../../assets/profile1.png";

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

function Amount({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const recipient = useSelector((state) => state.transfer.user);
  const amount = useSelector((state) => state.transfer.amount);
  const note = useSelector((state) => state.transfer.note);

  React.useEffect(() => {
    if (!recipient) {
      router.replace("/transactions/transfer");
    }
  }, [recipient, router]);

  const chackAmount = (amount) => {
    amount = parseInt(amount);
    if (amount > profile.balance) {
      return profile.balance;
    }
    return amount;
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
        <div className="flex flex-col bg-[#FFFFFF] rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10">
          <div className="p-5 flex flex-col items-start justify-start gap-9">
            <div className="w-full flex items-center justify-between">
              <div className="text-lg text-neutral font-semibold">
                Transfer Money
              </div>
            </div>
            <div className="w-full h-[600px] flex flex-col items-start justify-start gap-11">
              <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
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
                <div className="self-start w-full lg:w-[50%] text-[#7A7886]">
                  Type the amount you want to transfer and then press continue
                  to the next steps.
                </div>
                <form className="w-full h-full flex flex-col items-center justify-center gap-11">
                  <div className="w-[70%] text-center">
                    <input
                      type="number"
                      className="w-full h-24 text-4xl font-semibold text-center outline-none"
                      placeholder="0.00"
                      onChange={(e) => dispatch(setAmount(e.target.value))}
                      value={chackAmount(amount)}
                    />
                    <div className="text-lg text-neutral font-semibold pt-2">
                      {!profile?.balance
                        ? "0"
                        : `${Number(profile?.balance).toLocaleString("id", {
                            style: "currency",
                            currency: "IDR",
                          })}`}
                      ,-
                    </div>
                  </div>
                  <div className="w-[70%] text-center relative">
                    <input
                      type="text"
                      className="w-full h-12 text-xl font-semibold pl-11 outline-none"
                      placeholder="Add some notes"
                      onChange={(e) => dispatch(setNote(e.target.value))}
                    />
                    <div className="text-lg text-neutral font-semibold pt-2 absolute top-2 left-4">
                      <i>
                        <BsPencil />
                      </i>
                    </div>
                  </div>
                  <div className="w-full text-end">
                    <button
                      type="button"
                      className="btn btn-primary capitalize text-white w-full lg:w-[170px]"
                      onClick={() =>
                        router.replace("/transactions/confirmation")
                      }
                      disabled={amount < 10000}
                    >
                      Continue
                    </button>
                  </div>
                </form>
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

export default Amount;
