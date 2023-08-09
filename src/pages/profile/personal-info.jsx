import React, { useState } from "react";
import Headers from "@/components/header";
import Footers from "@/components/footers";
import Aside from "@/components/Aside";

import Link from "next/link";
import cookieConfig from "@/helpers/cookieConfig";
import checkCredentials from "@/helpers/checkCredentials";
import { withIronSessionSsr } from "iron-session/next";
import { useSelector } from "react-redux";
import EditPersonalInfo from "@/components/EditPersonalInfo";

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

function PersonalInfo({ token }) {
  const profile = useSelector((state) => state.profile.data);
  const [modalOpen, setModalOpen] = React.useState(false);

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
            Personal Information
          </div>
          <div className="text-[#7A7886] mb-10">
            We got your personal information from the sign
            <br />
            up proccess. If you want to make changes on
            <br />
            your information, contact our support.
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg">
              <div className="flex flex-col">
                <div className="text-[#7A7886]">Full Name</div>
                <div className="text-[#514F5B] font-bold text-lg capitalize">
                  {profile?.fullName ? profile?.fullName : "not set"}
                </div>
              </div>
              <div className="font-medium text-primary hover:text-lg">
                <button onClick={openModal}>Edit</button>
              </div>
            </div>
            <div className="flex flex-col w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg">
              <div className="text-[#7A7886]">Verified E-mail</div>
              <div className="text-[#514F5B] font-bold text-lg">
                {profile?.email ? profile?.email : "not set"}
              </div>
            </div>
            <div className="flex justify-between items-center w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg">
              <div className="flex flex-col">
                <div className="text-[#7A7886]">Phone Number</div>
                <div className="text-[#514F5B] font-bold text-lg capitalize">
                  {profile?.phones?.length >= 1 ? profile?.phones : "not set"}
                </div>
              </div>
              <Link href="/profile/change-number">
                <div className="font-medium text-primary hover:text-lg">
                  Manage
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footers />
      </div>
      {modalOpen && <EditPersonalInfo visibleModal={modalOpen} token={token} />}
    </main>
  );
}

export default PersonalInfo;
