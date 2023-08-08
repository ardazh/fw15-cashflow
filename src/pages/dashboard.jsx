import React from "react";
import Header from "@/components/Header";
import Footers from "@/components/Footers";
import Aside from "@/components/Aside";

import Link from "next/link";
import Image from "next/image";
import graphic from "../assets/graphic.png";
import defaultPict from "../assets/profile1.png";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlinePlus,
} from "react-icons/ai";
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "@/helpers/cookieConfig";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import TopUp from "@/components/TopUp";
import { setTransactions } from "@/redux/reducers/transactions";
import http from "@/helpers/http";
import checkCredentials from "@/helpers/checkCredentials";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, "/auth/login");
    return {
      props: {
        token,
      },
    };
  },
  cookieConfig
);

function Dashboard({ token }) {
  const profile = useSelector((state) => state.profile.data);
  const [modalOpen, setModalOpen] = React.useState(false);
  const transaction = useSelector((state) => state.transactions.data);
  const dispatch = useDispatch();

  const openModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
      setTimeout(() => {
        setModalOpen(true);
      }, 100);
    } else {
      setModalOpen(true);
    }
  };

  const transactionList = React.useCallback(async () => {
    const { data } = await http(token).get("/transactions", {
      params: { limit: 5 },
    });
    dispatch(setTransactions(data.results));
  }, [token, dispatch]);

  React.useEffect(() => {
    transactionList();
  }, [transactionList]);

  return (
    <main className="bg-[#E5E5E5]">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <Header token={token} />
      </div>
      <div className="flex">
        <div>
          <Aside token={token} />
        </div>
        <div>
          <div className="flex justify-between bg-primary border rounded-xl shadow-xl w-[850px] h-[190px] mt-[40px] ml-5 py-[30px] px-[30px]">
            <div className="flex flex-col">
              <div className="text-lg text-[#E0E0E0] mb-2.5">Balance</div>
              <div className="text-4xl font-bold text-[#FFFFFF] mb-[15px]">
                {!profile?.balance
                  ? "0"
                  : `${Number(profile?.balance).toLocaleString("id", {
                      style: "currency",
                      currency: "IDR",
                    })}`}
                ,-
              </div>
              <div className="text-sm font-semibold">+62 813-9387-7946</div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Link
                  href="/transfer"
                  className="btn btn-secondary text-[#FFFFFF] normal-case font-bold text-lg"
                >
                  <i>
                    <AiOutlineArrowUp size={28} />
                  </i>
                  Transfer
                </Link>
              </div>
              <button
                onClick={() => {
                  openModal();
                }}
                className="btn btn-secondary text-[#FFFFFF] normal-case font-bold text-lg"
              >
                <i>
                  <AiOutlinePlus size={28} />
                </i>
                Top Up
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="bg-[#FFFFFF] w-[463px] h-[468px] rounded-xl shadow-xl px-[30px] py-[30px] ml-5 mt-5">
              <div className="flex justify-between mb-[50px]">
                <div className="flex flex-col gap-2.5">
                  <i>
                    <AiOutlineArrowDown className="text-[#1EC15F]" size={28} />
                  </i>
                  <div className="text-[#6A6A6A] ">Income</div>
                  <div className="text-[#3A3D42] text-lg font-bold">
                    Rp2.120.000
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <i>
                    <AiOutlineArrowUp className="text-[#FF5B37]" size={28} />
                  </i>
                  <div className="text-[#6A6A6A] ">Expense</div>
                  <div className="text-[#3A3D42] text-lg font-bold">
                    Rp1.560.000
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image src={graphic} alt="grapic.png" />
              </div>
            </div>
            <div className="flex flex-col gap-10 bg-[#FFFFFF] rounded-xl w-[367px] h-[468px] px-[30px] py-[30px] ml-5 mt-5">
              <div className="flex justify-between items-center pr-2">
                <div className="font-bold text-lg text-[#3A3D42]">
                  Transaction History
                </div>
                <div className="font-semibold text-sm text-primary hover:text-base">
                  <Link href="/history">See All</Link>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {transaction.map((item) => {
                  return (
                    <div
                      className="flex justify-between"
                      key={`transactions-list-${item?.id}`}
                    >
                      {item.type === "TOP-UP" && (
                        <div className="flex items-center justify-start gap-2">
                          <div className="">
                            {item.recipient.picture ? (
                              <Image
                                width={150}
                                height={150}
                                className="object-cover w-10 h-10 rounded-xl overflow-hidden"
                                src={item.recipient.picture}
                                alt="userImage"
                              />
                            ) : (
                              <Image
                                className="object-cover w-10 h-10 rounded-xl overflow-hidden"
                                src={defaultPict}
                                alt="user"
                              />
                            )}
                          </div>
                          <div className="">
                            <div
                              className={`text-neutral text-base font-semibold ${
                                item?.recipient?.fullName ? "capitalize" : ""
                              }`}
                            >
                              {item?.recipient?.fullName ||
                                item?.recipient?.email}
                            </div>
                            <div className="text-">Topup</div>
                          </div>
                        </div>
                      )}

                      {item.type === "TRANSFER" && (
                        <div className="flex items-center justify-start gap-3">
                          <div className="">
                            {item.recipient.picture ? (
                              <Image
                                width={150}
                                height={150}
                                className="object-cover w-10 h-10 rounded-xl overflow-hidden"
                                src={item.recipient.picture}
                                alt="userImage"
                              />
                            ) : (
                              <Image
                                className="object-cover w-10 h-10 rounded-xl overflow-hidden"
                                src={defaultPict}
                                alt="user"
                              />
                            )}
                          </div>
                          <div className="">
                            <div
                              className={`text-neutral text-base font-semibold ${
                                item?.recipient?.fullName ? "capitalize" : ""
                              }`}
                            >
                              {item?.recipient?.fullName ||
                                item?.recipient?.email}
                            </div>
                            <div className="text-">Outcome</div>
                          </div>
                        </div>
                      )}

                      {item.recipient.id === profile.id && (
                        <div className="flex items-center justify-start gap-3">
                          <div className="">
                            {item.recipient.picture ? (
                              <Image
                                width={150}
                                height={150}
                                className="object-cover w-10 h-10 rounded-xl overflow-hidden"
                                src={item.recipient.picture}
                                alt="userImage"
                              />
                            ) : (
                              <Image
                                className="object-cover w-10 h-10 rounded-xl overflow-hidden"
                                src={defaultPict}
                                alt="user"
                              />
                            )}
                          </div>
                          <div className="">
                            <div
                              className={`text-neutral text-base font-semibold ${
                                item?.recipient?.fullName ? "capitalize" : ""
                              }`}
                            >
                              {item?.recipient?.fullName ||
                                item?.recipient?.email}
                            </div>
                            <div className="text-">Topup</div>
                          </div>
                        </div>
                      )}

                      {item?.type === "TOP-UP" && (
                        <div className="text-base font-semibold text-blue-500">
                          +
                          {item.amount &&
                            `Rp${Number(item.amount).toLocaleString("id")}`}
                        </div>
                      )}
                      {item?.type === "TRANSFER" &&
                        (item.sender.id !== profile.id ? (
                          <div className="text-base font-semibold text-green-500">
                            +
                            {item.amount &&
                              `Rp${Number(item.amount).toLocaleString("id")}`}
                          </div>
                        ) : (
                          <div className="text-base font-semibold text-primary">
                            -
                            {item.amount &&
                              `Rp${Number(item.amount).toLocaleString("id")}`}
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footers />
        {modalOpen && <TopUp visibleModal={modalOpen} token={token} />}
      </div>
    </main>
  );
}

export default Dashboard;
