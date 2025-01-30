"use client";
import "material-symbols";
import axios from "axios";
import Link from "next/link";
import ProcesosList from "../components/ProcesosList";
import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import MyLoader from "../components/SkeletonLoader";

export default function Dashboard() {
  const [order, setOrder] = useState(false);
  const [procesos, setProcesos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProcess();
  }, []);


  //obtener el listado general de notas
  const getProcess = async () => {  

    const { data } = await axios.get("/api/auth/procesoscv", {});

    setProcesos(data);
    setIsLoading(false);
  };

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2">
            <span className="material-symbols-outlined">account_circle</span>
            <UserInfo />
          </h3>
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
          Procesos de CV
        </Link>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-3" />


      {isLoading ? (
        <MyLoader />
      ) : procesos.length === 0 ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            folder_off
          </span>
          <h2 className="text-gray-three text-[36px] my-4">
            Aun no hay procesos creados
          </h2>
          <p className="text-custom-regular text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Consulta a tu administrador o crea un proceso ahora.
          </p>
        </div>
      ) : (
        <div className="folders-list flex flex-col items-start justify-start">
          
          <div className="flex flex-col gap-3 w-full mt-3">
            <div className="p-2 grid grid-cols-3">
              <p
                className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer"
              >
                Procesos
              </p>
              <p
                className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer"
              >
              </p>
              <p className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer">Acciones</p>
            </div>
            {
            procesos.map((proceso, index) => (
              <ProcesosList
                key={index}
                id={proceso.id}
                nombre={proceso.nombre_consulta}
                perfil={proceso.perfilPuesto}
                respuesta={proceso.respuesta}
              />
            ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
