import "material-symbols";
import axios from "axios";
import { useState, useEffect } from "react";
import Moment from "moment";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Modal } from "./Modal";

export default function SubjectList({
  title,
  id,
  urlSum,
  urlRel,
  urlNotas,
  thefolder,
}: any) {
  const [fecha, setFecha] = useState("");
  const [notas, setNotas] = useState<any[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [tipoProceso, setTipoProceso] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [theStatus, setTheStatus] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubjectInfo();
    getSubjectStatus();
    getSubjectFiles();
  }, []);

  //get the subject info given the subject id
  const getSubjectInfo = async () => {
    const folderDetailParam = {
      key: "id_proceso",
      paramId: id,
      urlSlug: "api/consultaProceso",
    };
    const { data } = await axios.post("/api/auth/endpoint", folderDetailParam);
    setFecha(data.fecha_creacion);
    if (data.notas) {
      setNotas(data.notas);
      setTipoProceso(data.tipo_proceso);
    }
  };

  //get the subject status given the subject id
  const getSubjectStatus = async () => {
    setLoading(true);
    await axios.get("/api/auth/status", { params: { id } }).then((response) => {
      setLoading(false);
      setProcesando(response.data.procesando);
    });

    let interval = setInterval(async () => {
      const { data } = await axios.get("/api/auth/status", { params: { id } });
      setProcesando(data.procesando);
      setTheStatus(data.estatus);

      if (data.procesando === false) {
        clearInterval(interval);
      }
    }, 10000);
  };

  //get the subject files
  const getSubjectFiles = async () => {
    const folderDetailParam = {
      key: "id_proceso",
      paramId: id,
      urlSlug: "ai/obtenArchivo",
    };
    const { data } = await axios.post("/api/auth/endpoint", folderDetailParam);
    setFileUrl(data.url);
  };

  //eliminar proceso
  const deleteSubject = async () => {
    const deleteParam = {
      key: "carpeta",
      keyTwo: "proceso",
      paramId: thefolder,
      paramTwo: title,
      urlSlug: "eliminaProceso",
    };
    await axios
      .post("/api/auth/deleteEndpoint", deleteParam)
      .then((response) => {
        setIsDeleted(true);
        localStorage.removeItem(`rpoints_${id}`);
        localStorage.removeItem(`firstvisit_${id}`);
        window.location.reload();
      });
  };

  return (
    <div
      className={
        procesando === false
          ? `bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex gap-8 justify-between items-center hover:bg-white-one hover:dark:bg-gray-three`
          : "bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex gap-8 justify-between items-center cursor-not-allowed"
      }
    >
      <Link
        href={procesando === false ? urlRel : ""}
        className="flex flex-1 justify-between items-center"
      >
        <div className="p-1 flex gap-2 items-center flex-1">
          <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-two text-center">
            draft
          </span>
          <p className="text-[14px] text-gray-seven dark:text-white-one">
            {title}
          </p>
        </div>
        <p className="p-1 text-gray-six text-[14px] leading-[16px] flex-1">
          <span>{tipoProceso}</span>
        </p>
        <p className="p-1 text-gray-six text-[14px] leading-[16px] flex-1">
          <span>{notas.length}</span>
        </p>
        <p className="p-1 text-gray-six text-[14px] leading-[16px] flex-1">
          <span>
            {fecha !== "" ? Moment(fecha).format("DD/MM/yy hh:mm") : ""}
          </span>
        </p>

        <div className="p-1 flex-1">
          {loading ? (
            ""
          ) : procesando === false ? (
            <div className="rounded-lg w-[15px] h-[15px] border-2 border-green flex items-center justify-center">
              <div className="rounded-lg w-[7px] h-[7px] bg-green m-auto"></div>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="rounded-lg w-[15px] h-[15px] border-2 border-error flex items-center justify-center">
                <div className="rounded-lg w-[7px] h-[7px] bg-error m-auto"></div>
              </div>
              <p className="text-[12px] text-blue-one font-extralight">
                {theStatus}
              </p>
            </div>
          )}
        </div>
      </Link>

      {procesando === false ? (
        <Popover className="relative">
          <PopoverButton className="ml-auto flex flex-col justify-center">
            <span className="material-symbols-outlined text-gray-two text-[25px]">
              more_vert
            </span>
          </PopoverButton>
          <PopoverPanel
            transition
            className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[240px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">
              <Link
                href={urlSum}
                className="w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  article
                </span>
                Resumen
              </Link>
              <Link
                href={urlNotas}
                className="w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  content_paste
                </span>
                Notas
              </Link>
              <Link
                href={fileUrl}
                className="w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  download
                </span>
                Descargar archivos
              </Link>
              <hr className="mx-4" />
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full hover:bg-error hover:text-main-text-color px-4 py-2 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  delete
                </span>
                Eliminar
              </button>
            </div>
          </PopoverPanel>
        </Popover>
      ) : (
        <span className="material-symbols-rounded animate-spin">
          progress_activity
        </span>
      )}

      <Modal
        title="Eliminar asunto"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div>
          <p className="text-center mb-2 text-main-c dark:text-main-text-color">
            <span className="material-symbols-outlined">warning</span>
            <br />
            Está a punto de eliminar el asunto{" "}
            <strong className="italic">"{title}"</strong>
            <br /> con todo sus elementos
          </p>
          <div className="flex gap-2 justify-center">
            <button
              className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
              onClick={deleteSubject}
            >
              Confirmar
            </button>
            <button
              className="text-blue-one mt-12 flex justify-center bg-secundary-c py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-blue-one hover:text-main-c"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {isDeleted ? (
        <div className="fixed bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]">
          <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">
            done_all
          </span>
          <p className="text-main-text-color">Asunto eliminado</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
