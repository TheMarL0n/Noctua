"use client";
import "material-symbols";
import axios from "axios";
import Moment from "moment";
import { useEffect, useState } from "react";
import { dashboardTour } from "../components/TheTour";
import { Modal } from "../components/Modal";
import Link from "next/link";
import UpdateUserForm from "../components/UpdateUserForm";
import RegisterUserForm from "../components/RegisterUserForm";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('')
  const [folders, setFolders] = useState<any[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const firstimer = window.localStorage.getItem("firstimer");
  const { tour } = dashboardTour();
  const historySS: [] = JSON.parse(
    localStorage.getItem(`history-${user}`) ?? "[]"
  );

  const getUser = async () => {
    const { data } = await axios.get("/api/auth/user");
    localStorage.setItem("current-user", data.nombre_usuario); //crear el firstimer en localstorage
    setUser(data);
  };

  useEffect(() => {
    if (firstimer === null || firstimer.length === 0) {
      localStorage.setItem("firstimer", "false"); //crear el firstimer en localstorage
      tour.start(); //start the tour for the first time
    }
  }, [firstimer]);

  useEffect(() => {
    getUser();
    getFolders();
  }, []);

  //Obtener el listado de carpetas de la API
  const getFolders = async () => {
    const { data } = await axios.get("/api/auth/folders", {
      params: {
        urlSlug: "services/api/listaCarpetas",
      },
    });

    if (!data.code && data.length !== 0) {
      setFolders(data);
    }
  };

  //ordenar por fecha
  const filterSort = folders.sort((a, b) =>
    a.fecha_creacion > b.fecha_creacion ? 1 : -1
  );

  const openUpdate =()=>{
    setIsModalOpen(true)
    setModalType('update')
  }

  const openRegister =()=>{
    setIsModalOpen(true)
    setModalType('register')
  }

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-seven dark:text-white-one text-[22px]">
            <span className="capitalize">{user ? user.nombre : 'usuario'}</span>, Bienvenido a Noctua
            <sup>&reg;</sup> Ai
          </h3>
        </div>
        <h3 className="text-gray-seven dark:text-white-one text-[20px]">
          Resumen de tareas
        </h3>
        <p className="text-gray-seven dark:text-white-one text-[14px] mb-4">
          Consulta el estatus de tu cuenta y actualizaciones de la misma.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
          <div className="flex flex-col">
            <div className="p-4 rounded-t-md flex gap-4 bg-blue-one">
              <span className="material-symbols-outlined text-[40px] leading-[40px] text-gray-ten text-center">
                folder
              </span>
              <div>
                <h3 className="text-secundary-c text-[20px] font-bold">
                  Carpetas
                </h3>
                <p className="text-secundary-c text-custom-regular">
                  Las carpetas que nos has compartido están listas.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-b-md flex justify-between bg-main-text-color dark:bg-gray-ten gap-4">
              <p className="text-gray-seven dark:text-white-one text-custom-regular">
                Cantidad de carpetas creadas: <strong>{folders.length}</strong>
              </p>
              <Link
                className="underline text-gray-seven dark:text-white-one text-custom-regular"
                href={`/dashboard`}
              >
                Consultar
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="p-4 rounded-t-md flex gap-4 bg-blue-one">
              <span className="material-symbols-outlined text-[40px] leading-[40px] text-gray-ten text-center">
                draft
              </span>
              <div>
                <h3 className="text-secundary-c text-[20px] font-bold">
                  Asuntos
                </h3>
                <p className="text-secundary-c text-custom-regular">
                  Los asuntos que nos has compartido están listos.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-b-md flex justify-between bg-main-text-color dark:bg-gray-ten gap-4">
              <p className="text-gray-seven dark:text-white-one text-custom-regular">
                Cantidad de asuntos en total:{" "}
                <strong>
                  {folders.reduce((a, v) => (a = a + v.procesos.length), 0)}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="p-4 rounded-t-md flex gap-4 bg-blue-one">
              <span className="material-symbols-outlined text-[40px] leading-[40px] text-gray-ten text-center">
                engineering
              </span>
              <div>
                <h3 className="text-secundary-c text-[20px] font-bold">
                  {user ? user.nombre : 'usuario'} {user ? user.apellido : ''}
                </h3>
                <p className="text-secundary-c text-custom-regular">
                  {user ? user.email : ''}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-b-md flex justify-between items-start bg-main-text-color dark:bg-gray-ten gap-4">
              <button onClick={openUpdate} className="underline text-gray-seven dark:text-white-one text-custom-regular">
                Actualizar peril
              </button>
              <button onClick={openRegister} className="underline text-gray-seven dark:text-white-one text-custom-regular">
                Registrar usuario
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-gray-seven dark:text-white-one text-[20px] mt-12">
          Resumen de tu cuenta
        </h3>
        <p className="text-gray-seven dark:text-white-one text-[14px] mb-4">
          Revisa el balance de tu presupuesto, agrega fondos, revisa tus
          comparativa de actividades en Noctua<sup>&reg;</sup>.
        </p>

        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row flex-wrap gap-3">
          <div className="p-4 rounded-md bg-main-text-color dark:bg-gray-five gap-4 sm:min-w-[476px] md:min-w-[476px] lg:min-w-[476px]">
            <div className="flex justify-between mb-4">
              <p className="text-gray-seven dark:text-white-one text-[18px]">
                Resumen de actividades
              </p>
              <Link
                href={`/dashboard`}
                className="uppercase text-blue-one text-[12px] flex gap-2 items-center"
              >
                ver detalle{" "}
                <span className="material-symbols-outlined font-light">
                  chevron_right
                </span>
              </Link>
            </div>

            {filterSort.slice(0, 3).map((folder) => (
              <div
                id={folder.id}
                key={folder.id}
                className="flex justify-between border-b border-b-gray-three pb-2 mb-2"
              >
                <p className="text-gray-seven dark:text-white-one text-custom-regular flex gap-2 items-center">
                  <span className="material-symbols-outlined text-[20px] leading-[20px] text-gray-seven dark:text-white-one text-center">
                    folder
                  </span>
                  Carga de carpeta
                </p>
                <p className="text-gray-seven dark:text-white-one text-custom-regular">
                  {Moment(folder.fecha_creacion).format("DD/MM/yy hh:mm")}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-md bg-main-text-color dark:bg-gray-five gap-4 sm:min-w-[476px] md:min-w-[476px] lg:min-w-[476px]">
            <div className="flex justify-between mb-4">
              <p className="text-gray-seven dark:text-white-one text-[18px]">
                Resumen de consultas a la IA
              </p>
              <Link
                href={`/history`}
                className="uppercase text-blue-one text-[12px] flex gap-2 items-center"
              >
                ver detalle{" "}
                <span className="material-symbols-outlined font-light">
                  chevron_right
                </span>
              </Link>
            </div>

            {historySS.slice(0, 3).map((history, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b border-b-gray-three pb-2 mb-2"
              >
                <p className="text-gray-seven dark:text-white-one text-custom-regular flex gap-2 items-center">
                  <span className="material-symbols-outlined text-[20px] leading-[20px] text-gray-seven dark:text-white-one text-center">
                    auto_awesome
                  </span>
                  {history.pregunta}
                </p>
                <p className="text-gray-seven dark:text-white-one text-custom-regular"></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        title={modalType === 'update' ? `Actualizar perfil de ${user.nombre}` : "Registrar nuevo usuario"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        {modalType === 'update' ? <UpdateUserForm usuario={user.nombre_usuario} /> : <RegisterUserForm/>}
      </Modal>
    </div>
  );
}
