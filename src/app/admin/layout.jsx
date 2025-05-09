import Image from "next/image";
import Sidebar from "../../../Components/AdminComponents/Sidebar";
import { assets } from "../../../Assests/assets";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium">Admin Panel</h3>
            <Image src={assets.profile_icon} width={40} alt="" />
          </div>
          {children}
        </div>
      </div>
      
    </>
  );
}
