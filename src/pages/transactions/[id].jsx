import React from "react";
import Headers from "@/components/header";
import Footers from "@/components/footers";
import Aside from "@/components/Aside";
import { AiOutlineCheck } from "react-icons/ai";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import cookieConfig from "@/helpers/cookieConfig";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import defaultPict from "../../assets/profile1.png";
import http from "@/helpers/http";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

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

function Status({ token }) {
  const {
    query: { id },
  } = useRouter();

  const profile = useSelector((state) => state.profile.data);
  const [transaction, setTransaction] = React.useState({});
  const [recipient, setRecipient] = React.useState({});
  const router = useRouter();
  const balanceLeft = profile.balance - transaction.amount;

  const getDataStatus = React.useCallback(async () => {
    const { data } = await http(token).get("/transactions/" + id);
    if (data.results) {
      setTransaction(data.results);
      setRecipient(data.results.recipient);
    }
  }, [id, token]);

  React.useEffect(() => {
    getDataStatus();
  }, [getDataStatus]);

  return (
    <main className="bg-[#E5E5E5]">
      <div>
        <Headers token={token} />
      </div>
      <div className="flex">
        <div>
          <Aside token={token} />
        </div>
        <div className="flex flex-col bg-[#FFFFFF] rounded-xl w-[850px] h-full px-[30px] pt-[30px] mx-5 my-10">
          <div className="p-2 flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
              <div className="w-10 h-10 bg-[#1EC15F] flex items-center justify-center rounded-full">
                <i>
                  <AiOutlineCheck size={40} className="text-white" />
                </i>
              </div>
              <div className="text-lg text-neutral font-semibold">
                Transfer To
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start gap-11">
              <div className="w-full h-full flex flex-col items-center justify-start gap-5 rounded-xl">
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start gap-5">
                    <div className="text-base">Amount</div>
                    <div className="text-xl text-neutral font-semibold">
                      {transaction.amount &&
                        `Rp${Number(transaction.amount).toLocaleString("id")}`}
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start gap-5">
                    <div className="text-base">Balance Left</div>
                    <div className="text-xl text-neutral font-semibold">
                      {profile?.balance &&
                        `Rp${Number(profile?.balance).toLocaleString("id")}`}
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start gap-5">
                    <div className="text-base">Date & Time</div>
                    <div className="text-xl text-neutral font-semibold">
                      {moment(transaction.createdAt).format(
                        "MMMM Do, YYYY - HH.mm"
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                  <div className="w-full h-full flex flex-col items-start justify-start gap-5">
                    <div className="text-base">Notes</div>
                    <div className="text-xl text-neutral font-semibold">
                      {transaction.notes}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-28 flex items-center justify-start p-5 rounded-xl shadow-md shadow-[#EAEAEA]">
                <div className="w-full flex items-center justify-start gap-5">
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
              <div className="w-full text-end mt-5 flex flex-col md:flex-row items-center justify-end gap-5">
                <div className="w-full lg:w-[170px]">
                  <button className="btn btn-accent capitalize text-white w-full ">
                    Download PDF
                  </button>
                </div>
                <div className="w-full lg:w-[170px]">
                  <Link
                    href="/dashboard"
                    className="btn btn-primary capitalize text-white w-full"
                  >
                    Finish Transaction
                  </Link>
                </div>
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

export default Status;
