import React from "react";
import Headers from "@/components/header";
import Footers from "@/components/footers";
import Aside from "@/components/Aside";

import Image from "next/image";
import defaultPict from "../assets/profile1.png";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import cookieConfig from "@/helpers/cookieConfig";
import { useSelector } from "react-redux";
import http from "@/helpers/http";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";

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

function History({ token }) {
  const profile = useSelector((state) => state.profile.data);
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [history, setHistory] = React.useState([]);
  // const [page, setPage] = React.useState({});
  const [sortList, setSortList] = React.useState("ASC");

  const toggleSortOrder = () => {
    const newSortOrder = sortList === "asc" ? "desc" : "asc";
    setSortList(newSortOrder);

    const sorted = history.results.slice().sort((a, b) => {
      const fullNameA = (a.recipient?.fullName || "").toLowerCase();
      const fullNameB = (b.recipient?.fullName || "").toLowerCase();

      if (newSortOrder === "asc") {
        return fullNameA.localeCompare(fullNameB);
      } else {
        return fullNameB.localeCompare(fullNameA);
      }
    });

    setHistory({ ...history, results: sorted });
  };

  const getUsersTransaction = React.useCallback(
    async (page = 1, searchTerm = "", filter = "all", type = "all") => {
      try {
        const { data } = await http(token).get("/transactions", {
          params: {
            page,
            search: searchTerm,
            filter,
            type,
          },
        });
        setHistory(data);
        setFilter(data);
      } catch (error) {
        console.error("Error data transactions:", error);
      }
    },
    [token]
  );

  React.useEffect(() => {
    getUsersTransaction();
  }, [getUsersTransaction]);

  React.useEffect(() => {
    getUsersTransaction(1, search);
  }, [search, getUsersTransaction]);

  const handleSort = (value) => {
    setFilter(value);
    if (value === "income") {
      getTransaction(1, search, "all", "TOP-UP");
    } else {
      getTransaction(1, search, value);
    }
  };

  return (
    <main className="bg-[#E5E5E5]">
      <div>
        <Headers token={token} />
      </div>
      <div className="flex">
        <div>
          <Aside />
        </div>
        <div className="flex flex-col gap-10 bg-[#FFFFFF] rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg text-[#3A3D42]">
              Transaction History
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="h-14 w-full flex items-center gap-2 border-2 rounded-xl">
              <i className="pl-5">
                <AiOutlineSearch size={24} />
              </i>
              <div>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  name="searchName"
                  className="outline-none w-full"
                  placeholder="Search receiver here"
                />
              </div>
            </div>
            <div>
              <button
                onClick={toggleSortOrder}
                className="btn w-50% btn-secondary capitalize text-white"
              >
                Sort {sortList === "asc" ? "Descending" : "Ascending"}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between font-bold">
              Search for: {search}
            </div>
            <div>
              {history.results && (
                <div className="flex flex-col gap-4">
                  {history.results.length === 0 ? (
                    <p className="text-[#7a7878]">You have`t data yet</p>
                  ) : (
                    history.results
                      .filter((item) => {
                        const fullName = (
                          (item.recipient && item.recipient.fullName) ||
                          ""
                        ).toLowerCase();
                        return fullName.includes(search.toLowerCase());
                      })
                      .map((item) => {
                        return (
                          <div
                            className="flex justify-between"
                            key={`history-list-${item?.id}`}
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
                                      item?.recipient?.fullName
                                        ? "capitalize"
                                        : ""
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
                              <>
                                {item.recipient.id !== profile.id && (
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
                                          item?.recipient?.fullName
                                            ? "capitalize"
                                            : ""
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
                                          item?.recipient?.fullName
                                            ? "capitalize"
                                            : ""
                                        }`}
                                      >
                                        {item?.recipient?.fullName ||
                                          item?.recipient?.email}
                                      </div>
                                      <div className="text-">Income</div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            {item?.type === "TOP-UP" && (
                              <div className="text-base font-semibold text-blue-500">
                                +
                                {item.amount &&
                                  `Rp${Number(item.amount).toLocaleString(
                                    "id"
                                  )}`}
                              </div>
                            )}
                            {item?.type === "TRANSFER" &&
                              (item.sender.id !== profile.id ? (
                                <div className="text-base font-semibold text-green-500">
                                  +
                                  {item.amount &&
                                    `Rp${Number(item.amount).toLocaleString(
                                      "id"
                                    )}`}
                                </div>
                              ) : (
                                <div className="text-base font-semibold text-primary">
                                  -
                                  {item.amount &&
                                    `Rp${Number(item.amount).toLocaleString(
                                      "id"
                                    )}`}
                                </div>
                              ))}
                          </div>
                        );
                      })
                  )}
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() =>
                        getUsersTransaction(
                          history.pageInfo.page - 1,
                          search,
                          filter
                        )
                      }
                      disabled={history.pageInfo.page <= 1}
                      className="btn btn-primary"
                    >
                      <AiOutlineArrowLeft />
                    </button>
                    <div className="font-bold">
                      page {history.pageInfo.page} of{" "}
                      {history.pageInfo.totalPage}
                    </div>
                    <button
                      onClick={() =>
                        getUsersTransaction(
                          history.pageInfo.page + 1,
                          search,
                          filter
                        )
                      }
                      disabled={
                        history.pageInfo.page >= history.pageInfo.totalPage
                      }
                      className="btn btn-primary"
                    >
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              )}
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

export default History;
