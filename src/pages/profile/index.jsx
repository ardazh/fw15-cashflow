import React, { useState } from "react";
import Headers from "@/components/header";
import Footers from "@/components/footers";
import Aside from "@/components/Aside";

import Link from "next/link";
import Image from "next/image";
import defaultPict from "../../assets/profile1.png";
import { LuEdit2, LuArrowRight } from "react-icons/lu";
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "@/helpers/cookieConfig";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/redux/reducers/profile";
import http from "@/helpers/http";
import checkCredentials from "@/helpers/checkCredentials";

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

function Profile({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [pictureURI, setPictureURI] = React.useState("");
  const [selectedPicture, setSelectedPicture] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fileToDataUrl = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPictureURI(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const changePicture = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    fileToDataUrl(file);
  };

  const doChangePicture = async (values) => {
    setLoading(true);
    const form = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });
    if (selectedPicture) {
      form.append("picture", selectedPicture);
    }
    if (token) {
      const { data } = await http(token).patch("/profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setProfile(data.results));
      setLoading(false);
      setPictureURI("");
    }
  };

  const doLogout = async () => {
    await axios.get("/api/logout");
    router.replace("/auth/login");
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
        <div className="flex flex-col gap-10 bg-[#FFFFFF] shadow-xl rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10">
          <div className="flex flex-col items-center">
            {pictureURI && (
              <div className="border w-20 h-20 rounded-xl overflow-hidden object-cover mb-2.5">
                <Image
                  className=""
                  src={pictureURI}
                  alt="selected-picture"
                  width={80}
                  height={80}
                />
              </div>
            )}
            {!pictureURI && (
              <div className="border w-20 h-20 rounded-xl overflow-hidden object-cover mb-2.5">
                {profile?.picture ? (
                  <Image
                    className=""
                    src={profile?.picture}
                    alt="profile-user-img"
                    width={80}
                    height={80}
                  />
                ) : (
                  <Image
                    className=""
                    src={defaultPict}
                    alt="profile-user-default"
                    width={80}
                    height={80}
                  />
                )}
              </div>
            )}
            <label className="flex items-center gap-3 text-[#7A7886] mb-[15px] hover:text-secondary">
              {!pictureURI ? (
                <>
                  <i>
                    <LuEdit2 />
                  </i>
                  <input
                    type="file"
                    className="hidden"
                    onChange={changePicture}
                  />
                  Edit
                </>
              ) : null}
            </label>
            {pictureURI && (
              <div className="flex items-start gap-2">
                <button
                  onClick={doChangePicture}
                  className="font-[500] text-accent hover:text-secondary"
                  type="button"
                >
                  Save
                </button>
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </div>
            )}
            <div className="flex flex-col justify-center items-center text-[#3A3D42] gap-2.5 mb-[50px]">
              <div
                className={`text-lg font-bold ${
                  profile?.fullName ? "capitalize" : "lowercase"
                }`}
              >
                {!profile?.fullName ? profile?.email : profile?.fullName}
              </div>
              <div className="text-[13px]">
                {profile?.phones?.length >= 1 ? profile?.phones : "-"}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Link href="/profile/personal-info">
                <button className="btn btn-info normal-case flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] ">
                  Personal Information
                  <i>
                    <LuArrowRight size={28} />
                  </i>
                </button>
              </Link>
              <Link href="/profile/change-password">
                <button className="btn btn-info normal-case flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] ">
                  Change Password
                  <i>
                    <LuArrowRight size={28} />
                  </i>
                </button>
              </Link>
              <Link href="/profile/change-pin">
                <button className="btn btn-info normal-case flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] ">
                  Change PIN
                  <i>
                    <LuArrowRight size={28} />
                  </i>
                </button>
              </Link>
              <button
                onClick={doLogout}
                className="btn btn-info normal-case flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] hover:text-red-500 "
              >
                Logout
                <i>
                  <FiLogOut size={28} />
                </i>
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

export default Profile;
