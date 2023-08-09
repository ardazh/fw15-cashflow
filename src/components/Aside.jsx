import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import TopUp from "./TopUp";

function Aside(props) {
  const { token } = props;
  console.log("asside", token);
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

  const router = useRouter();
  const doLogout = async () => {
    await axios.get("/api/logout");
    router.replace("/auth/login");
  };
  return (
    <>
      <aside className="text-[#3A3D42CC] text-lg font-bold w-[270px] h-[678px] border rounded-xl shadow-lg bg-[#FFFFFF] ml-[150px] my-[40px] py-[40px]">
        <div className="flex flex-col gap-[52px] mb-[286px] w-full">
          <div className="flex items-center text-primary border-l-4 border-primary gap-[23px] w-full px-[35px] h-9">
            <i>
              <RxDashboard size={28} />
            </i>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="flex items-center gap-[23px] px-[35px] h-9">
            <i>
              <AiOutlineArrowUp size={28} />
            </i>
            <div className="">
              <Link href="/transactions/transfer">Transfer</Link>
            </div>
          </div>
          <div className="flex items-center gap-[23px] px-[35px] h-9">
            <i>
              <AiOutlinePlus size={28} />
            </i>
            <button
              onClick={() => {
                openModal();
              }}
            >
              Top Up
            </button>
          </div>
          <div className="flex items-center gap-[23px] px-[35px] h-9">
            <i>
              <AiOutlineUser size={28} />
            </i>
            <Link href="/profile">Profile</Link>
          </div>
        </div>
        <button
          onClick={() => window.my_modal_5.showModal()}
          className="flex items-center gap-[23px] px-[35px] h-9 hover:text-red-500"
        >
          <i>
            <FiLogOut size={28} />
          </i>
          <div>Logout</div>
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
          <form method="dialog" className="modal-box bg-white ">
            <h3 className="font-bold text-lg">Log Out</h3>
            <p className="py-4">Are you sure you want to logout?</p>
            <div className="modal-action">
              <button
                type="button"
                onClick={doLogout}
                className="btn btn-error"
              >
                Ok
              </button>
              <button className="btn btn-info">Close</button>
            </div>
          </form>
        </dialog>
        {modalOpen && <TopUp visibleModal={modalOpen} token={token} />}
      </aside>
    </>
  );
}

export default Aside;
