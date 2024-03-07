import React  from "react"
import { LuWallet2, LuPieChart, LuSun } from 'react-icons/lu';
import {
  PiToolboxDuotone,
  PiStorefrontBold,
  PiClipboardTextLight,
  PiUserCircle
} from "react-icons/pi";

import Logo from '../../../images/logo.png'
import Profile from  '../../../images/profile.jpg'

export const LeftSideBar: React.FC = () => {
  return (
    <div className="flex flex-col h-screen p-3 bg-white shadow w-60"  >
      <div className="space-y-3">
        <div className="flex  items-center p-2 space-x-3 rounded-md" >
          {/* <h2 className= font-bold">Dashboard</h2> */}
          <img src={Logo} alt="logo" className="bg-customBlue-500 w-6 h-6  rounded-full "   />
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <a
                href="/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <LuPieChart
                  className="w-6 h-6" fill="none"
                  viewBox="0 0 24 24"
                />


                <span>Home</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                href="/mails"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                < LuWallet2
                  className="w-6 h-6" fill="none"
                  viewBox="0 0 24 24"
                />

                <span>Carteira</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                href="/products"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <PiToolboxDuotone
                  className="w-6 h-6"

                />
                <span>Products</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                href="setting"
                className="flex items-center p-2 space-x-3 rounded-md"
              >

                <PiStorefrontBold className="w-6 h-6" />
                <span>Loja</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                href="logout"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <PiClipboardTextLight className="w-6 h-6" />
                <span>prancheta</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '40px' }} >
        <ul className="pt-2 pb-4 space-y-1 text-sm" >
          <li>
            <a
              href="logout"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <PiUserCircle className="w-6 h-6" />
              <span>usuário</span>
            </a>


          </li>
        </ul>
        <ul className="pt-2 pb-4 space-y-1 text-sm" >
          <li>
            <a
              href="logout"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <LuSun className="w-6 h-6" />
              <span>Tema</span>
            </a>


          </li>
        </ul>
        <ul className="pt-2 pb-4 space-y-1 text-sm" >
          <li>
            <a
              href="logout"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
             <img src={Profile} alt="logo" className="bg-customBlue-500 w-6 h-6  rounded-full "   />
              <span>Eu</span>
            </a>


          </li>
        </ul>
      </div>
    </div>
  )
}