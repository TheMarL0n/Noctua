import "material-symbols";
import axios from "axios";
import { useState, useEffect } from "react";
import Moment from "moment";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Modal } from "./Modal";
import WorkingLoader from "./WorkingLoader";
import ReactMarkdown from "react-markdown";
import ComboBoxFolders from "./ComboBoxFolders";

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
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [theStatus, setTheStatus] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [comparison, setComparison] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [theFolder, setTheFolder] = useState("");

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
      setProgress((progress) => progress + 25);

      if (data.procesando === false) {
        clearInterval(interval);
      }
    }, 5000);
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

  const comparaGlobal = async () => {
    setIsLoading(true);
    const comparaParam = {
      key: "id_proceso",
      paramId: id,
      urlSlug: "ai/comparaProcesoSuscripcion",
    };
    await axios.post("/api/auth/endpoint", comparaParam).then((response) => {
      setComparison(response.data.respuesta);
      setIsLoading(false);
    });
  };

  //obtener carpetas para la comparacion
  const getFolders = async () => {
    const { data } = await axios.get("/api/auth/folders", {
      params: {
        urlSlug: "services/api/listaCarpetas",
      },
    });
    setFolders(data);
  };

  const startFolderCompare = () => {
    setIsModalFormOpen(true);
    getFolders();
  };

  const handleFolderList = (e: any) => {
    setTheFolder(e.target.value);
  };

  const comparaPorCarpeta = async () => {
    setIsModalFormOpen(false);
    setIsLoading(true);
    const comparaParam = {
      key: "id_proceso",
      paramId: id,
      keyQuestion: "carpeta",
      paramPregunta: theFolder,
      urlSlug: "ai/comparaProcesoCarpeta",
    };
    await axios.post("/api/auth/endpoint", comparaParam).then((response) => {
      setComparison(response.data.respuesta);
      setIsLoading(false);
    });
  };

  return (
    <div
      className={
        procesando === false
          ? `bg-main-text-color dark:bg-gray-five rounded-lg px-2 hover:bg-white-one hover:dark:bg-gray-three`
          : "bg-main-text-color dark:bg-gray-five rounded-lg px-2 cursor-not-allowed"
      }
    >
      <div className="flex gap-8 justify-between items-center">
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
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-green">
                  keep
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-start">
                <p className="text-[10px] text-gray-six font-extralight">
                  Procesando: {theStatus}
                </p>
                <div className="w-full bg-gray-one rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="bg-blue-one h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
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
                <div
                  onClick={comparaGlobal}
                  className="cursor-pointer w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    compare_arrows
                  </span>
                  Comparar asunto
                </div>

                <div
                  onClick={startFolderCompare}
                  className="cursor-pointer w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    compare_arrows
                  </span>
                  Comparar asunto por carpeta
                </div>

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

        <Modal
          title="Selecciona una carpeta"
          isOpen={isModalFormOpen}
          onClose={() => {
            setIsModalFormOpen(false);
          }}
        >
          <div>
            <div className="flex gap-2 justify-center">
              <select
                id="folder-list"
                name="folder-list"
                required
                autoComplete="folder-list"
                className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-text-color focus:outline-0 focus:ring-0"
                onChange={handleFolderList}
              >
                {folders.map((folder) => (
                  <option value={folder.carpeta}>{folder.carpeta}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                onClick={comparaPorCarpeta}
              >
                Confirmar
              </button>
              <button
                className="text-blue-one mt-12 flex justify-center bg-secundary-c py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-blue-one hover:text-main-c"
                onClick={() => {
                  setIsModalFormOpen(false);
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

      {
        //COMPARACIONES
        isLoading ? (
          <WorkingLoader />
        ) : (
          comparison.map((comp) => (
            <div
              key={comp.id_proceso}
              className="my-4 bg-gray-nine dark:bg-gray-nine rounded-lg p-6"
            >
              <Link
                href={`/${comp.id_proceso}`}
                className="uppercase text-blue-one text-[12px] flex gap-2 items-center w-fit ml-auto"
              >
                Ir al proceso{" "}
                <span className="material-symbols-outlined font-light">
                  chevron_right
                </span>
              </Link>
              {comp.comparacion
                .split("\n\n")
                .map(function (item: any, idx: any) {
                  return (
                    <div key={idx} className="text-white-one">
                      <ReactMarkdown>{item}</ReactMarkdown>
                      <br />
                    </div>
                  );
                })}
            </div>
          ))
        )
      }
    </div>
  );
}
