"use client";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import 'material-symbols';
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookies } from "../api/auth/logout/route";
import { Notification } from '../components/Notification';
import ThemeToggler from "../components/ThemeToggler";
import HelpButton from "../components/HelpButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [renderChildren, setRenderChildren] = useState<boolean>(false);
  const [modalExpiredOpen, setModalExpiredOpen] = useState<boolean>(false);
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getFolders();
  }, [])

  //SIDEBAR TOGGLE AND COLLAPSED----------------------------------------------
  const wrapperClasses = classNames(
    "h-screen px-4 pt-4 pb-4 flex justify-between flex-col bg-main-text-color dark:bg-secundary-c fixed left-0",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const bodyClasses = classNames(
    "w-full min-h-screen flex flex-col justify-between",
    {
      ["pl-80"]: !toggleCollapse,
      ["pl-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "pt-4 pb-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  //--------------------------------------------------------------------------

  //Obtener el listado de carpetas de la API
  const getFolders = async () => {
    const { data } = await axios.get('/api/auth/folders', {
      params: {
        urlSlug: "services/api/listaCarpetas"
      }
    });

    //Checar si el token ha expirado
    if (!data.code) {
      setRenderChildren(true);
    } else setModalExpiredOpen(true);
  }

  //redireccionar al login cuando el token esté vencido
  const logOut = async () => {
    deleteCookies();
    router.push('/login'); //redireccionar al dashboard
  };

  return (
    <main className="min-h-screen flex flex-row justify-start items-start bg-white dark:bg-main-c">
      <div
        className={wrapperClasses}
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex items-center justify-between relative pb-6 ">
          <button
            className={collapseIconClasses}
            onClick={handleSidebarToggle}
          >
            <span className="material-symbols-outlined dark:text-main-text-color text-gray-seven hover:text-blue-one text-[17px] font-light">
              keyboard_tab_rtl
            </span>
          </button>
        </div>
        <Sidebar />
      </div>
      <div className={bodyClasses} style={{ transition: "padding 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}>
        {
          renderChildren ?
            children
            :
            <div className="page-body py-2 px-4 w-full min-h-full"></div>
        }

        <div className="flex justify-end items-center px-4 gap-3">

          <ThemeToggler/>
          <HelpButton />

        </div>

      </div>

      <Notification isOpen={modalExpiredOpen} onClose={() => { setModalExpiredOpen(false) }}>
        <div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-error text-[45px]">
              warning
            </span>
            <div>
            <h3 className='text-secundary-c dark:text-main-text-color text-[20px] mb-2 font-bold'>Tu sesión ha expirado</h3>
            <p className='text-secundary-c dark:text-main-text-color text-[14px]'>Por favor inicia sesión nuevamente</p>
            </div>
          </div>
          <button
            onClick={() => logOut()}
            className="text-secundary-c mt-8 ml-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
          >
            Aceptar
          </button>
        </div>
      </Notification>

    </main>

  );
}