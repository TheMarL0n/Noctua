"use client";

import "material-symbols";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import FolderGrid from "../components/FolderGrid";
import FolderList from "../components/FolderList";
import AddFolderForm from "../components/AddFolderForm";
import { Modal } from "../components/Modal";
import UserInfo from "../components/UserInfo";
import MyLoader from "../components/SkeletonLoader";
import { useIsMobile } from "../components/useIsMobile";

export default function Dashboard() {
  const [folders, setFolders] = useState<any[]>([]);
  const [viewType, setViewType] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [toggleDate, setToggleDate] = useState(false);
  const [toggleName, setToggleName] = useState(false);
  const [criteria, setCriteria] = useState("dateUp");
  const isMobileDevice = useIsMobile();

  useEffect(() => {
    setViewType(isMobileDevice);
    console.log("TEST: " + isMobileDevice)
    setIsLoading(true);
    getFolders();
  }, []);

  //Obtener el listado de carpetas de la API
  const getFolders = async () => {
    const { data } = await axios.get("/api/auth/folders", {
      params: {
        urlSlug: "services/api/listaCarpetas",
      },
    });

    //Checar si el token no ha expirado y si existe data
    if (!data.code && data.length !== 0) {
      setFolders(data);
      setUser(data[0].usuario);
    } else {
      setUser("");
    }
    setIsLoading(false);
  };

  //Cambiar las vistas de GRID a LIST--------------------------------------------------------------------------------------------------
  const changeViewList = () => {
    setViewType(false);
  };
  const changeViewGrid = () => {
    setViewType(true);
  };

  //Cambiar el orden del listado (Sort)--------------------------------------------------------------------------------------------------
  const setCriteriaName = () => {
    setToggleName(!toggleName);
    setCriteria(toggleName ? "nameUp" : "nameDown");
  };

  const setCriteriaDate = () => {
    setToggleDate(!toggleDate);
    setCriteria(toggleDate ? "dateUp" : "dateDown");
  };

  const folderSorted = folders.sort(
    criteria === "dateUp"
      ? (a, b) => (a.fecha_creacion < b.fecha_creacion ? 1 : -1)
      : criteria === "dateDown"
      ? (a, b) => (a.fecha_creacion > b.fecha_creacion ? 1 : -1)
      : criteria === "nameUp"
      ? (a, b) => (a.carpeta > b.carpeta ? 1 : -1)
      : (a, b) => (a.carpeta < b.carpeta ? 1 : -1)
  );

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2">
            <span className="material-symbols-outlined">account_circle</span>
            <UserInfo />
          </h3>
          <a
            className="flex items-center text-custom-regular text-gray-seven dark:text-white-one bg-main-text-color dark:bg-secundary-c rounded-lg py-2 pl-1 pr-1 sm:pr-6 md:pr-6 lg:pr-6 leading-[16px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined text-[30px] font-extralight">
              add
            </span>{" "}
            <span className="hidden sm:block md:block lg:block">
              Agregar carpeta
            </span>
          </a>
        </div>
      </div>
      <div className="breadcumb">
        <Link
          className="flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2"
          href="/dashboard"
        >
          <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
            hard_drive
          </span>{" "}
          Archivo
        </Link>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-[15px]" />

      {isLoading ? (
        <MyLoader />
      ) : folders.length === 0 ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            folder_off
          </span>
          <h2 className="text-gray-three text-[36px] my-4">
            No hay carpetas en este proyecto
          </h2>
          <p className="text-custom-regular dark:text-white text-gray-five flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Consulta a tu administrador o crea una carpeta ahora.
          </p>
          <a
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full my-5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
              add
            </span>
          </a>
        </div>
      ) : (
        <div className="folders-list flex flex-col items-start justify-start">
          <div className="flex justify-end w-full mb-4">
            <div className="flex gap-2">
              <button
                onClick={changeViewList}
                className={
                  viewType
                    ? "bg-main-text-color dark:bg-gray-five p-2 flex items-center justify-center text-gray-seven dark:text-white-one hover:text-main-c hover:bg-blue-one"
                    : "bg-blue-one p-2 flex items-center justify-center text-main-c hover:text-main-c hover:bg-blue-one"
                }
              >
                <span className="material-symbols-outlined text-[25px] leading-[24px] font-extralight">
                  reorder
                </span>
              </button>
              <button
                onClick={changeViewGrid}
                className={
                  !viewType
                    ? "bg-main-text-color dark:bg-gray-five p-2 flex items-center justify-center text-gray-seven dark:text-white-one hover:text-main-c hover:bg-blue-one"
                    : "bg-blue-one p-2 flex items-center justify-center text-main-c hover:text-main-c hover:bg-blue-one"
                }
              >
                <span className="material-symbols-outlined text-[25px] leading-[24px] font-extralight">
                  grid_view
                </span>
              </button>
            </div>
          </div>

          {viewType ? (
            <div className="flex flex-wrap gap-3">
              {folders.map((folder) => (
                <FolderGrid
                  key={folder.id}
                  id={folder.id}
                  title={folder.carpeta}
                  asuntos={folder.procesos}
                  notas={folder.notas.length}
                />
              ))}
              <a
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full ml-3 my-auto cursor-pointer"
              >
                <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                  add
                </span>
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full mt-3">
              <div className="py-2 pl-2 pr-8 flex justify-between">
                <a
                  onClick={() => setCriteriaName()}
                  className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer"
                >
                  Nombre
                  <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                    sort_by_alpha
                  </span>
                </a>
                <p className="hidden sm:flex md:flex lg:flex flex-1 text-[12px] text-gray-seven dark:text-white-one items-center leading-[12px] gap-4 cursor-pointer">
                  Asuntos
                </p>
                <p className="hidden sm:flex md:flex lg:flex flex-1 text-[12px] text-gray-seven dark:text-white-one items-center leading-[12px] gap-4 cursor-pointer">
                  Notas
                </p>
                <p
                  onClick={() => setCriteriaDate()}
                  className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer justify-end sm:justify-start md:justify-start lg:justify-start"
                >
                  Fecha
                  <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                    sort_by_alpha
                  </span>
                </p>
              </div>
              {folderSorted.map((folder) => (
                <FolderList
                  key={folder.id}
                  id={folder.id}
                  title={folder.carpeta}
                  asuntos={folder.procesos}
                  fecha={folder.fecha_creacion}
                  notas={folder.notas.length}
                />
              ))}
              <a
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-[42px] h-[42px] sm:w-[72px] sm:h-[72px] md:w-[72px] md:h-[72px] lg:w-[72px] lg:h-[72px] bg-blue-one rounded-full ml-3 my-auto cursor-pointer"
              >
                <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                  add
                </span>
              </a>
            </div>
          )}
        </div>
      )}

      <Modal
        title="Crear carpeta"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <AddFolderForm />
      </Modal>
    </div>
  );
}
