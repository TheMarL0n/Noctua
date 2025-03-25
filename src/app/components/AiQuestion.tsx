import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function AiQuestion({
  pregunta,
  idProceso,
  respuesta,
  fromFolder,
  proceso, //en caso de ser una pregunta desde carpeta
}: any) {
  const [isAdded, setIsAdded] = useState(false);

  //añadir la consulta como nota
  const addToNote = async (nota: any) => {
    const saveParamFromSubject = {
      key: "nota",
      keyQuestion: "proceso_id",
      paramId: nota,
      paramPregunta: idProceso,
      urlSlug: "api/creaNotaProceso/",
    };
    const saveParamFromFolder = {
      key: "nota",
      paramId: nota,
      keyQuestion: "carpeta",
      paramPregunta: idProceso,
      urlSlug: "api/creaNotaCarpeta/",
    };
    if (!fromFolder) {
      //si la llamada a la funcion viene desde un proceso dentro de una carpeta
      await axios
        .post("/api/auth/endpoint", saveParamFromSubject)
        .then((response) => {
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 1000);
        });
    } else {
      //si la llamada a la funcion viene desde una pregunta dentro de una carpeta
      await axios
        .post("/api/auth/endpoint", saveParamFromFolder)
        .then((response) => {
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 1000);
        });
    }
  };

  //descargar documento
  const downloadTxtFile = (id: any, e: any) => {
    const element = document.createElement("a");
    const file = new Blob([e], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${id}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  //Mostrar notificacion de cpiado
  const showCopied = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md w-full">
      <div className="header flex justify-between items-center px-4 py-2">
        <h2 className="text-[25px] text-bg-gray-five dark:text-main-text-color flex gap-2 items-center">
          <span className="material-symbols-outlined text-[32px] text-bg-gray-five dark:text-white font-extralight">
            mark_chat_read
          </span>
          {proceso !== "" ? proceso : " "}
          {proceso !== "" ? ": " : " "}
          {pregunta}
        </h2>
        <div className="flex gap-1 items-center">
          <span
            onClick={() => downloadTxtFile(idProceso, respuesta)}
            className="material-symbols-outlined text-[32px] text-gray-nine font-extralight cursor-pointer"
          >
            download
          </span>
          <CopyToClipboard text={respuesta} onCopy={() => showCopied()}>
            <span className="material-symbols-outlined text-[30px] text-gray-nine font-extralight cursor-pointer">
              file_copy
            </span>
          </CopyToClipboard>
          <Popover className="relative">
            <PopoverButton className="ml-auto flex flex-col justify-center">
              <span className="material-symbols-outlined text-gray-two text-[25px]">
                more_vert
              </span>
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[200px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">
                <button
                  onClick={() => addToNote(respuesta)}
                  className="w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    note_add
                  </span>
                  Agregar a notas
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three mb-3" />

      <div className="body px-12 pt-2 pb-6">
        {respuesta.split("\n\n").map(function (item: any, idx: any) {
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
          <p className="text-main-text-color">Acción exitosa</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
