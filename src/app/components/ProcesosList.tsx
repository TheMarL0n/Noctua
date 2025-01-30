import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ProcesosList({ id, nombre, perfil, respuesta }: any) {
  const [isCopied, setIsCopied] = useState(false);

  //Mostrar notificacion de cpiado
  const showCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
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

  //eliminar nota
  const deleteProceso = async (id: any) => {
    const deleteParam = {
      key: "id",
      paramId: id,
      urlSlug: "eliminaProcesoCVS",
    };
    await axios
      .post("/api/auth/deleteEndpoint", deleteParam)
      .then((response) => {
        window.location.reload();
      });
  };

  return (
    <div className="bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex gap-4">
      <div className="p-1 flex-1">
        <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2 my-5">
          Proceso {nombre}
        </h3>

        <p className="flex gap-1">
          Perfil del puesto{" "}
          <span>
            <hr className="h-[1px] border-0 w-52 bg-gray-three my-3" />
          </span>
        </p>

        {perfil.split("\n\n{").map(function (item: any, idx: any) {
          return (
            <div key={idx}>
              <ReactMarkdown className="text-[14px] leading-{14px} text-gray-seven dark:text-white-one">
                {item}
              </ReactMarkdown>
              <br />
            </div>
          );
        })}

        <p className="flex gap-1">
          Respuesta de la IA{" "}
          <span>
            <hr className="h-[1px] border-0 w-52 bg-gray-three my-3" />
          </span>
        </p>

        {respuesta.split("\n\n{").map(function (item: any, idx: any) {
          return (
            <div key={idx}>
              <ReactMarkdown className="text-[14px] leading-{14px} text-gray-seven dark:text-white-one">
                {item}
              </ReactMarkdown>
              <br />
            </div>
          );
        })}
      </div>

      <div className="p-2 text-gray-six text-[25px] leading-[16px] flex gap-2">
        <span
          onClick={() => downloadTxtFile(id, respuesta)}
          className="cursor-pointer material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center hover:text-white"
        >
          download
        </span>

        <CopyToClipboard text={respuesta} onCopy={() => showCopied()}>
          <span className="material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center cursor-pointer hover:text-white">
            file_copy
          </span>
        </CopyToClipboard>

        <span
          onClick={() => deleteProceso(id, respuesta)}
          className="cursor-pointer material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center hover:text-white"
        >
          delete
        </span>
      </div>

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
    </div>
  );
}
