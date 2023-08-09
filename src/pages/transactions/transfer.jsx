import React from "react";
import Headers from "@/components/Header";
import Footers from "@/components/Footers";
import Aside from "@/components/Aside";

import Image from "next/image";
import defaultPict from "../../assets/profile1.png";
import { AiOutlineSearch } from "react-icons/ai";
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "@/helpers/cookieConfig";
import checkCredentials from "@/helpers/checkCredentials";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import http from "@/helpers/http";
import { setRecipient as setRecipientAction } from "@/redux/reducers/transfer";
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

function Transfer({ token }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [recipient, setRecipient] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState({});
  const recipientRedux = useSelector((state) => state.transfer.user);

  const getUsers = React.useCallback(
    async (page = 1, search = "", limit = 5) => {
      const { data } = await http(token).get("/users", {
        params: {
          page,
          search,
          limit,
        },
      });
      setRecipient(data);
      setPage(data.pageInfo);
    },
    [token]
  );

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  React.useEffect(() => {
    getUsers(1, search);
  }, [search, getUsers]);

  React.useEffect(() => {
    if (recipientRedux) {
      router.push("/transactions/amount");
    }
  }, [recipientRedux, router]);

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
          <div className="flex flex-col gap-5 w-[790px]">
            <form className="w-full">
              <div className="font-bold text-lg text-[#3A3D42]">
                Search Receiver
              </div>
              <div className="h-14 w-full flex items-center gap-2 border-2 rounded-xl mb-[50px]">
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
            </form>
          </div>
          <div className="flex flex-col gap-6 w-full h-[650px]">
            {recipient.results &&
              recipient.results.map((item) => (
                <div
                  onClick={() => dispatch(setRecipientAction(item))}
                  key={`recipient-list${item.id}`}
                  className="flex justify-between"
                >
                  <div className="flex items-center">
                    <div className="mr-[15px]">
                      {item.picture ? (
                        <Image
                          width={150}
                          height={150}
                          className="object-cover rpunded-2xl w-16 h-16"
                          src={item.picture}
                          alt="userImage"
                        />
                      ) : (
                        <Image
                          width={150}
                          height={150}
                          className="object-cover rpunded-2xl w-16 h-16"
                          src={defaultPict}
                          alt="defaultUser"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-[9px] mr-[59px]">
                      <Link
                        href="/transactions/amount"
                        className="text-neutral text-base font-semibold capitalize"
                      >
                        {!item.fullName || item.fullName === undefined
                          ? "user"
                          : item.fullName}
                      </Link>
                      <div>{item.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex gap-6 justify-center w-full">
              <button
                onClick={() => getUsers(page.page - 1)}
                disabled={page.page <= 1}
                className="btn btn-secondary shadow-md normal-case"
              >
                Prev
              </button>
              <label className="flex justify-center items-center font-[500] text-md text-secondary">
                {page.page} of {page.totalPage}
              </label>
              <button
                onClick={() => getUsers(page.page + 1)}
                disabled={page.page === page.totalPage}
                className="btn btn-secondary shadow-md normal-case"
              >
                Next
              </button>
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

export default Transfer;
