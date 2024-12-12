"use client";
import "material-symbols";
import axios from "axios";
import Link from "next/link";
import NotesList from "../components/NotesList";
import AddNotesForm from "../components/AddNotesForm";
import WorkingLoader from "../components/WorkingLoader";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import UserInfo from "../components/UserInfo";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [order, setOrder] = useState(false);
  const [notas, setNotas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getNotes();
  }, []);


  //obtener el listado general de notas
  const getNotes = async () => {
    const { data } = await axios.get("/api/auth/notes");
    setNotas(data);
    setIsLoading(false);
  };

  //Cambiar el orden del listado (Sort)--------------------------------------------------------------------------------------------------
  const changeOrder = () => {
    setOrder((prevCheck) => !prevCheck);
  };
  const filterSort = notas.sort(
    order === false
      ? (a, b) => (a.nota < b.nota ? 1 : -1)
      : (a, b) => (a.nota > b.nota ? 1 : -1)
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
            className="flex items-center text-custom-regular text-gray-seven dark:text-white-one bg-main-text-color dark:bg-secundary-c rounded-lg py-2 pl-1 pr-6 leading-[16px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined text-[30px] font-extralight">
              add
            </span>{" "}
            Agregar nota
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
          Notas
        </Link>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-3" />


      {isLoading ? (
        <WorkingLoader />
      ) : notas.length === 0 ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            folder_off
          </span>
          <h2 className="text-gray-three text-[36px] my-4">
            Aun no hay notas creadas
          </h2>
          <p className="text-custom-regular text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Consulta a tu administrador o crea un nota ahora.
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
          
          <div className="flex flex-col gap-3 w-full mt-3">
            <div className="p-2 grid grid-cols-3">
              <a
                onClick={() => changeOrder()}
                className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer"
              >
                Nombre
                <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                  sort_by_alpha
                </span>
              </a>
              <p
                className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer"
              >
                Fecha
              </p>
              <p className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer">Acciones</p>
            </div>
            {filterSort.map((nota, index) => (
              <NotesList
                key={index}
                id={nota.id_nota}
                text={nota.nota}
                fecha={nota.fecha_creacion}
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
        </div>
      )}
      <Modal
        title="Crear nota nueva"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <AddNotesForm slug={"api/guardarNota"} />
      </Modal>
    </div>
  );
}
