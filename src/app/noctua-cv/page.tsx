"use client";
import "material-symbols";
import axios from "axios";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import WorkingLoader from "../components/WorkingLoader";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Modal } from "../components/Modal";

export default function Dashboard() {
  const [answer, setAnswer] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [description, setDescription] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const user = localStorage.getItem("current-user");

  //tomar la info de los input
  const getTheDescription = (e: any) => {
    setEnableBtn(false);
    setDescription(e.target.value);
  };

  const getTheUrl = (e: any) => {
    setDriveUrl(e.target.value);
  };

  const getTheNumber = (e: any) => {
    setAmount(e.target.value);
  };

  //enviar la pregunta
  const sendTheInfo = (e: any) => {
    e.preventDefault();
    setLoading(true);
    getAnswer();
  };

  //Obtener las preguntas de la API
  const getAnswer = async () => {
    const resumeParam = {
      key: "perfilPuesto",
      paramId: description,
      keyQuestion: "linkDrive",
      paramPregunta: driveUrl,
      keyThird: "numCandidatos",
      paramThird: amount,
      urlSlug: "test/procesaCVS",
    };

    await axios
      .post("/api/auth/endpoint", resumeParam)
      .then((response) => {
        setAnswer(response.data.respuesta);
        setLoading(false);
        setDescription("");
        setDriveUrl("");
        setAmount("");
      })
      .catch((err) => {
        setIsModalOpen(true);
        //console.log(`ERROR: ${err.message}`);
      });
  };

  //añadir la consulta como nota
  const addToNote = async (nota: any) => {
    const saveParam = {
      key: "nota",
      paramId: nota,
      urlSlug: "api/guardarNota",
    };
    await axios.post("/api/auth/endpoint", saveParam).then((response) => {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1000);
    });
  };

  //descargar documento
  const downloadTxtFile = (e: any) => {
    const element = document.createElement("a");
    const file = new Blob([e], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `respuesta_cv.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  //Mostrar notificacion de cpiado
  const showCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full mt-5">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2">
            <span className="material-symbols-outlined">account_circle</span>
            {user}
          </h3>
        </div>
      </div>

      <div className="breadcumb mt-3">
        <Link
          className="flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2"
          href="/dashboard"
        >
          <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
            clinical_notes
          </span>{" "}
          Noctua CVs
        </Link>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-3" />

      <div className="w-full flex items-center gap-2">
        <form className="w-full flex flex-col items-center" action="">
          <div className="flex mb-2 rounded-lg w-full">
            <textarea
              rows={6}
              className="w-full bg-main-text-color dark:bg-gray-three text-[17px] rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0"
              placeholder="Descripción de la vacante"
              onChange={getTheDescription}
              value={description}
            />
          </div>

          <div className="flex rounded-lg gap-2 w-full">
            <input
              type="text"
              className="w-[70%] bg-main-text-color dark:bg-gray-three text-[17px] rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0"
              placeholder="URL de Google drive"
              onChange={getTheUrl}
              value={driveUrl}
            />

            <input
              type="number"
              className="w-[30%] bg-main-text-color dark:bg-gray-three text-[17px] rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0"
              placeholder="Cantidad de candidatos"
              onChange={getTheNumber}
              value={amount}
            />

            <div className="bg-gray-one dark:bg-secundary-c border border-gray-one dark:border-gray-three rounded-lg h-[52px] p-2 flex items-center justify-center">
              <button
                className="flex items-center justify-center disabled:opacity-15"
                onClick={sendTheInfo}
                disabled={enableBtn}
              >
                <span className="material-symbols-outlined text-[32px] text-gray-four">
                  chat
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {loading === true ? (
        <WorkingLoader />
      ) : answer.length > 0 ? (
        <div className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md">
          <div className="header flex justify-between items-center px-4 py-2">
            <h2 className="text-[25px] text-bg-gray-five dark:text-main-text-color flex gap-2 items-center">
              <span className="material-symbols-outlined text-[32px] text-bg-gray-five dark:text-white font-extralight">
                mark_chat_read
              </span>
              Respuesta
            </h2>
            <div className="flex gap-1 items-center">
              <span
                onClick={() => downloadTxtFile(answer)}
                className="material-symbols-outlined text-[32px] text-gray-nine font-extralight cursor-pointer"
              >
                download
              </span>
              <span
                onClick={() => addToNote(answer)}
                className="material-symbols-outlined text-[32px] text-gray-nine font-extralight"
              >
                note_add
              </span>
              <CopyToClipboard text={answer} onCopy={() => showCopied()}>
                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">
                  file_copy
                </span>
              </CopyToClipboard>
            </div>
          </div>
          <div className="body px-12 pt-2 pb-6">
            {answer.split("\n\n").map(function (item: any, idx: any) {
              return (
                <div key={idx}>
                  <ReactMarkdown className="text-[18px] leading-{18px} text-gray-seven dark:text-white-one">
                    {item}
                  </ReactMarkdown>
                  <br />
                </div>
              );
            })}
          </div>
          {isAdded ? (
            <div className="fixed bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]">
              <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">
                done_all
              </span>
              <p className="text-main-text-color">Añadido a las notas</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <></>
      )}

      {answer.length === 0 && loading !== true ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            clinical_notes
          </span>
          <h2 className="text-gray-three text-[36px] my-4">
            Encuentra los mejores candidatos para la vacante con Noctua
          </h2>
          <p className="text-custom-regular text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Consulta a tu administrador o haz una pregunta ahora.
          </p>
        </div>
      ) : (
        <></>
      )}

      {isAdded ? (
        <div className="fixed bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]">
          <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">
            done_all
          </span>
          <p className="text-main-text-color">Añadido a las notas</p>
        </div>
      ) : (
        ""
      )}

      {isCopied ? (
        <div className="absolute bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]">
          <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">
            done_all
          </span>
          <p>Copiado al portapapeles</p>
        </div>
      ) : (
        ""
      )}

      <Modal
        title="Tiempo de espera agotado"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div>
          <p className=" text-white text-[18px] text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[18px]">
              warning
            </span>{" "}
            El tiempo de espera de la solicitud ha sido agotado, <br />
            por favor, intente nuevamente más tarde
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-secundary-c mt-12 mx-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
        >
          Aceptar
        </button>
      </Modal>
    </div>
  );
}
