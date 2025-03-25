"use client";
import "material-symbols";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "@/app/components/Modal";
import AddSubjectForm from "@/app/components/AddSubjectForm";
import SubjectList from "@/app/components/SubjectList";
import SubjectGrid from "@/app/components/SubjectGrid";
import Link from "next/link";
import WorkingLoader from "@/app/components/WorkingLoader";
import AiQuestion from "@/app/components/AiQuestion";
import UserInfo from "@/app/components/UserInfo";
import ErrorScreen from "@/app/components/ErrorScreen";
import MyLoader from "@/app/components/SkeletonLoader";

export default function Folder(asuntos: any) {
  const [subjects, setsubjects] = useState<any[]>([]);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [viewType, setViewType] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [question, setQuestion] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [enableBtn, setEnableBtn] = useState(true);
  const [answer, setAnswer] = useState<any[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [chbx_enabled, setChbx_enabled] = useState(false);
  const [radioValues, setRadioValues] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);

  const [categories, setCategories] = useState({
    EIDM: false,
    Licitaciones: false,
    Resumen: false,
    Carga: false,
    Aclaraciones: false,
    Controversia_Constitucional: false,
    Proyecto_de_Sentencia: false,
  });

  const changeViewList = () => {
    setViewType(false);
  };
  const changeViewGrid = () => {
    setViewType(true);
  };
  const changeOrder = () => {
    setOrder(!order);
  };

  useEffect(() => {
    setIsLoading(true);
    getFolder();
  }, []);

  //get the folder detail
  const getFolder = async () => {
    const folderDetailParam = {
      key: "idCarpeta",
      paramId: asuntos.params.id,
      urlSlug: "api/consultaCarpeta",
    };
    const { data } = await axios.post("/api/auth/endpoint", folderDetailParam);

    setsubjects(data.procesos);
    setFolderId(data.id);
    setFolderName(data.carpeta);
    setIsLoading(false);
  };

  const filterSort = subjects.sort(
    order === false
      ? (a, b) => (a.proceso < b.proceso ? 1 : -1)
      : (a, b) => (a.proceso > b.proceso ? 1 : -1)
  );

  //AI QUESTION////////////////////////////////////////////////////////////////////
  //tomar la pregunta del input
  const getTheQuestion = (e: any) => {
    setEnableBtn(false);
    setQuestion(e.target.value);
    setQuestionTitle(e.target.value);
  };

  //enviar la pregunta
  const sendTheQuestion = (e: any) => {
    e.preventDefault();
    setShowQuestion(true);
    setIsLoadingAi(true);
    getAnswer();
  };

  //get the checkbox values
  const onChangeCheckBox = (e: any) => {
    const { value, checked } = e.target;
    setRadioValues(prev => [...prev, value]);
  };

  //Obtener las preguntas de la API
  const getAnswer = async () => {
    if (chbx_enabled === true) {
      const resumeParam = {
        key: "ids_procesos",
        keyQuestion: "pregunta",
        paramId: radioValues.toString(),
        paramPregunta: question,
        urlSlug: "ai/preguntaIAProcesos",
      };
      await axios.post("/api/auth/endpoint", resumeParam).then((response) => {
        setAnswer(response.data.respuesta);
        setQuestion("");
        setIsLoadingAi(false);
      });
    }

    else {
      const resumeParam = {
        key: "carpeta",
        keyQuestion: "pregunta",
        paramId: folderName,
        paramPregunta: question,
        urlSlug: "ai/preguntaCarpeta",
      };
      await axios.post("/api/auth/endpoint", resumeParam).then((response) => {
        setAnswer(response.data.respuesta);
        setQuestion("");
        setIsLoadingAi(false);
      });
    }
  };
  /////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2">
            <span className="material-symbols-outlined">account_circle</span>
            <UserInfo />
          </h3>
          <p
            className="flex items-center text-custom-regular text-gray-seven dark:text-white-one bg-main-text-color dark:bg-secundary-c rounded-lg py-2 pl-1 pr-6 leading-[16px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined text-[30px] font-extralight">
              add
            </span>{" "}
            Agregar asunto
          </p>
        </div>
      </div>

      <div className="breadcumb">
        <div className="flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2">
          <Link className="flex gap-1 items-center" href={"/dashboard"}>
            <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
              hard_drive
            </span>{" "}
            Archivo
          </Link>{" "}
          /
          <Link
            className="flex gap-1 items-center"
            href={`/dashboard/${folderId}`}
          >
            <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
              folder
            </span>{" "}
            {folderName}
          </Link>
        </div>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-[15px]" />

      <div className="search-bar bg-main-text-color dark:bg-gray-three rounded-lg w-full">
        <form
          className="w-full flex items-center mb-3 border border-gray-three rounded-lg"
          action=""
        >
          <input
            type="text"
            className="w-full bg-main-text-color dark:bg-gray-three text-[17px] rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0"
            placeholder="Pregunta o da una instrucción a Noctua&reg;, En relación al contenido de carpetas"
            onChange={getTheQuestion}
            value={question}
          />

          <div className="bg-gray-one dark:bg-secundary-c rounded-lg h-[52px] p-2 flex items-center justify-center">
            <button
              className="flex items-center justify-center disabled:opacity-15"
              onClick={sendTheQuestion}
              disabled={enableBtn}
            >
              <span className="material-symbols-outlined text-[32px] text-gray-four">
                chat
              </span>
            </button>
          </div>
          <div className="toggle bg-gray-one dark:bg-secundary-c rounded-md py-3 px-2 ml-1 h-full uppercase">
            <label className="inline-flex gap-5 items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onClick={() => setChbx_enabled(!chbx_enabled)} />
              <div
                className="relative w-11 h-[14px] bg-white-one peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-3px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <p className="text-[12px] leading-[14px] text-white">Por asunto</p>
            </label>
          </div>
        </form>
      </div>

      {isLoading ? (
        <MyLoader />
      ) : subjects.length === 0 ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            file_copy_off
          </span>
          <h2 className="text-gray-three text-[36px] my-4">
            No hay archivos en esta carpeta
          </h2>
          <p className="text-custom-regular text-gray-three dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Consulta a tu administrador o carga un documento ahora.
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
          {showQuestion ? (
            isLoadingAi ? (
              <WorkingLoader />
            ) : answer === undefined ? (
              <ErrorScreen />
            ) : !chbx_enabled ? (
              answer.map((res) => (
                <AiQuestion
                  key={res.id_proceso}
                  pregunta={questionTitle}
                  idProceso={folderName}
                  proceso={res.proceso}
                  respuesta={res.respuesta}
                  fromFolder={true}
                />
              ))
            ) : <AiQuestion
              pregunta={questionTitle}
              respuesta={answer}
            />
          ) : (
            ""
          )}

          <div className="flex w-full justify-end">
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
            <div className="flex flex-wrap gap-3 mt-4">
              {subjects.map((subject) => (
                <SubjectGrid
                  key={subject.id_proceso}
                  id={subject.id_proceso}
                  title={subject.proceso}
                  urlSum={`/dashboard/${folderId}/summary/${subject.id_proceso}`}
                  urlRel={`/dashboard/${folderId}/relevant-points/${subject.id_proceso}`}
                  urlNotas={`/dashboard/${folderId}/notas/${subject.id_proceso}`}
                  thefolder={folderName}
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
              <div className="py-2 pl-2 pr-14 flex justify-between">
                <a
                  onClick={() => changeOrder()}
                  className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer"
                >
                  Nombre
                  <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                    sort_by_alpha
                  </span>
                </a>
                <a className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer">
                  Tipo
                </a>
                <a className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer">
                  Notas
                </a>
                <a className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer">
                  Fecha
                </a>
                <a className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer">
                  Estado
                </a>
              </div>
              {subjects.map((subject) => (
                <div key={subject.id_proceso} className="flex w-full">
                  <div className={`flex px-2 bg-main-text-color dark:bg-gray-five rounded-lg
                      ${chbx_enabled ? "" : "hidden"}
                      `}>
                    <input
                      type="checkbox"
                      onChange={onChangeCheckBox}
                      value={subject.id_proceso}
                    />
                  </div>
                  <SubjectList
                    key={subject.id_proceso}
                    id={subject.id_proceso}
                    title={subject.proceso}
                    urlSum={`/dashboard/${folderId}/summary/${subject.id_proceso}`}
                    urlRel={`/dashboard/${folderId}/relevant-points/${subject.id_proceso}`}
                    urlNotas={`/dashboard/${folderId}/notas/${subject.id_proceso}`}
                    thefolder={folderName}
                  />
                </div>
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
          )}
        </div>
      )}
      <Modal
        title="Agregar asunto"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <AddSubjectForm param_folder={folderName} />
      </Modal>
    </div>
  );
}
