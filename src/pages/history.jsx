import React from "react";
import Headers from "@/components/header";
import Footers from "@/components/footers";
import Aside from "@/components/Aside";

import Image from "next/image";
import profile5 from "../assets/profile5.png";

function History() {
  return (
    <main className="bg-[#E5E5E5]">
      <div>
        <Headers />
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
            <div className="font-semibold text-sm text-primary">
              <button className="btn btn-info text-black normal-case">
                -- Select FIlter --
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-[15px]">
                  <Image src={profile5} alt="profile5.png" />
                </div>
                <div className="flex flex-col gap-[9px] mr-[59px]">
                  <div className="font-bold text-[#4D4B57]">Samuel Suhi</div>
                  <div className="text-sm text-[#7A7886]">Accept</div>
                </div>
              </div>
              <div className="flex items-center text-bold text-[#1EC15F]">
                +Rp50.000
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-[15px]">
                  <Image src={profile5} alt="profile5.png" />
                </div>
                <div className="flex flex-col gap-[9px] mr-[59px]">
                  <div className="font-bold text-[#4D4B57]">Samuel Suhi</div>
                  <div className="text-sm text-[#7A7886]">Accept</div>
                </div>
              </div>
              <div className="flex items-center text-bold text-[#1EC15F]">
                +Rp50.000
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-[15px]">
                  <Image src={profile5} alt="profile5.png" />
                </div>
                <div className="flex flex-col gap-[9px] mr-[59px]">
                  <div className="font-bold text-[#4D4B57]">Samuel Suhi</div>
                  <div className="text-sm text-[#7A7886]">Accept</div>
                </div>
              </div>
              <div className="flex items-center text-bold text-[#1EC15F]">
                +Rp50.000
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-[15px]">
                  <Image src={profile5} alt="profile5.png" />
                </div>
                <div className="flex flex-col gap-[9px] mr-[59px]">
                  <div className="font-bold text-[#4D4B57]">Samuel Suhi</div>
                  <div className="text-sm text-[#7A7886]">Accept</div>
                </div>
              </div>
              <div className="flex items-center text-bold text-[#1EC15F]">
                +Rp50.000
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-[15px]">
                  <Image src={profile5} alt="profile5.png" />
                </div>
                <div className="flex flex-col gap-[9px] mr-[59px]">
                  <div className="font-bold text-[#4D4B57]">Samuel Suhi</div>
                  <div className="text-sm text-[#7A7886]">Accept</div>
                </div>
              </div>
              <div className="flex items-center text-bold text-[#1EC15F]">
                +Rp50.000
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-[15px]">
                  <Image src={profile5} alt="profile5.png" />
                </div>
                <div className="flex flex-col gap-[9px] mr-[59px]">
                  <div className="font-bold text-[#4D4B57]">Samuel Suhi</div>
                  <div className="text-sm text-[#7A7886]">Accept</div>
                </div>
              </div>
              <div className="flex items-center text-bold text-[#1EC15F]">
                +Rp50.000
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

export default History;
