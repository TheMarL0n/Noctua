import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { deleteCookies } from "../api/auth/logout/route";
import { usePathname } from "next/navigation";
import axios from "axios";

const Sidebar = ({ collapsed, notCollapsed }: any) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const logOut = async () => {
    deleteCookies();
    router.push("/login"); //redireccionar al dashboard
  };

  const [menuItems, setMenuItems] = useState([]);

  const getMenuItems = async () => {
    const { data } = await axios.get("/api/auth/menu");
    setMenuItems(data);
    console.log(data);
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative mb-8 pb-8 border-b border-gray-two">
          <div className="flex items-end pl-1 gap-4">
            <Image
              src="/logo-collapsed.svg"
              alt="button"
              width={34}
              height={34}
              priority
              className={collapsed}
            />
            <span className={`text-lg font-medium text-text ${notCollapsed}`}>
              <Image
                src="/logo.svg"
                alt="button"
                width={162}
                height={34}
                priority
                className="hidden dark:block"
              />
              <Image
                src="/logo-dark.svg"
                alt="button"
                width={162}
                height={34}
                priority
                className="block dark:hidden"
              />
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start">
          {menuItems.length > 0
            ? menuItems.map(({ ...menu }) => {
                const isActive = pathName.startsWith(menu.link);
                return (
                  <div
                    id={menu.id}
                    key={menu.id}
                    className="flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
                  >
                    <Link
                      className={`sidebar-links flex gap-2 py-4 px-3 items-center w-full h-full ${
                        isActive
                          ? "text-blue-one"
                          : "text-gray-seven hover:text-blue-one"
                      }`}
                      href={menu.link}
                    >
                      <div
                        style={{ width: "4rem" }}
                        className="flex items-center"
                      >
                        <span
                          className={`material-symbols-outlined text-[32px] font-light leading-[30px]`}
                        >
                          {menu.icon}
                        </span>
                      </div>
                      <span
                        className={`text-md font-medium text-text ${notCollapsed}`}
                      >
                        {menu.label}
                      </span>
                    </Link>
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div className="flex flex-col">
        <Link
          id="menu-item-6"
          className="sidebar-links flex gap-2 items-center cursor-pointer hover:text-blue-one text-gray-seven rounded w-full overflow-hidden whitespace-nowrap px-3 py-4"
          href="#"
        >
          <div style={{ width: "4rem" }} className="flex items-center">
            <span className="material-symbols-outlined text-[32px] font-light leading-[30px] border-y border-y-gray-seven py-4">
              settings
            </span>
          </div>
          <span className={`text-md font-medium text-text ${notCollapsed}`}>
            Preferencias
          </span>
        </Link>

        <button
          onClick={() => logOut()}
          type="submit"
          className="flex gap-2 items-center cursor-pointer hover:text-blue-one text-gray-seven rounded w-full overflow-hidden whitespace-nowrap px-3 py-2"
        >
          <div style={{ width: "4rem" }} className="flex items-center">
            <span className="material-symbols-outlined text-[32px] font-light leading-[30px]">
              logout
            </span>
          </div>
          <span className={`text-md font-medium text-text ${notCollapsed}`}>
            Cerrar sesión
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
