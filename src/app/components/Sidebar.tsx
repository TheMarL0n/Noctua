import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { deleteCookies } from "../api/auth/logout/route";

const menuItems = [
  { id: "menu-item-1", label: "Inicio", icon: "home", link: "/desktop" },
  { id: "menu-item-2", label: "Archivo", icon: "hard_drive", link: "/dashboard" },
  { id: "menu-item-3", label: "Ai", icon: "auto_awesome", link: "/noctua-ai" },
  { id: "menu-item-4", label: "Historial", icon: "pace", link: "/history" },
  { id: "menu-item-5", label: "Notas", icon: "content_paste", link: "/notes" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const router = useRouter();

  const logOut = async () => {
    deleteCookies();
    router.push('/login'); //redireccionar al dashboard
  };

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
              className={classNames("", {
                hidden: !toggleCollapse,
              })}
            />
            <span
              className={classNames("text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
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
          {menuItems.map(({ ...menu }) => {
            return (
              <div id={menu.id} key={menu.id} className="flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap">
                <Link className="sidebar-links flex py-8 px-3 items-center w-full h-full dark:text-main-text-color text-gray-seven hover:text-blue-one" href={menu.link}>
                  <div style={{ width: "4rem" }} className="flex items-center">
                    <span className="material-symbols-outlined text-[32px] font-light leading-[30px]">
                      {menu.icon}
                    </span>
                  </div>
                  {!toggleCollapse && (
                    <span
                      className={classNames(
                        "text-md font-medium dark:text-main-text-color text-gray-seven"
                      )}
                    >
                      {menu.label}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">


        <Link id="menu-item-6" className="sidebar-links flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap px-3 py-4 hover:text-blue-one" href="#">
          <div style={{ width: "4rem" }} className="flex items-center">
            <span className="material-symbols-outlined dark:text-main-text-color text-gray-seven text-[32px] font-light leading-[30px] border-y border-y-gray-seven py-4">
              settings
            </span>
          </div>
          {!toggleCollapse && (
            <span className={classNames("text-md font-medium dark:text-main-text-color text-gray-seven")}>
              Preferencias
            </span>
          )}
        </Link>

        <button
          onClick={() => logOut()}
          type="submit"
          className="flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap px-3 py-2 hover:text-blue-one">
          <div style={{ width: "4rem" }} className="flex items-center">
            <span className="material-symbols-outlined text-blue-one text-[32px] font-light leading-[30px]">
              logout
            </span>
          </div>
          {!toggleCollapse && (
            <span className={classNames("text-md font-medium dark:text-main-text-color text-gray-seven")}>
              Cerrar sesión
            </span>
          )}
        </button>

      </div>

    </div>

  );
};

export default Sidebar;