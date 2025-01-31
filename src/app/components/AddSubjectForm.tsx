import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function AddSubjectForm({ param_folder }: any) {
  const [success, setSuccess] = useState(false);
  const [enabler, setEnabler] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');
  const [subject, setSubject] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [arrSubjectType, setArrSubjectType] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theFiles, setTheFiles] = useState<File[]>([]);

  const handleName = (e: any) => {
    setSubject(e.target.value);
  };
  const handleType = (e: any) => {
    setSubjectType(e.target.value);
  };

  const handleFiles = (e: any) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files: File[] = Array.from(e.target.files);
      setTheFiles(_files);
      let fileSize: number = _files.reduce((a, v) => (a = a + v.size), 0);

      if (fileSize < 100000000) { //20 archivos o 100MB
        setEnabler(true);
        setNotif(false);
      } else {
        setEnabler(false);
        setNotif(true);
        setNotifMessage('Ha excedido el límite permitido en subida archivos');
      }

      if(fileSize > 100000000){
        setNotifMessage('Peso máximo en archivos exedido');
      }
    }
  };

  //get the subject type
  const getType = async () => {
    const { data } = await axios.get("/api/auth/type");
    setArrSubjectType(data);
  };

  useEffect(() => {
    getType();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    /////////////////////////////////////////////////////////////////////////////
    const formData = new FormData();

    for (let i = 0; i < theFiles.length; i++) {
      formData.append("archivos", theFiles[i]);
    }

    formData.append("carpeta", param_folder);
    formData.append("proceso", subject);
    formData.append("tipoProceso", subjectType);

    /////////////////////////////////////////////////////////////////////////////

    await axios.post("/api/auth/addSubject", formData).then((response) => {
      setIsLoading(false);
      setSuccess(true);
      console.log("resultData", response);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

  };

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/loading.svg"
            alt="loading"
            width={100}
            height={100}
            priority
          />
        </div>
      ) : success ? (
        <div className="flex flex-col items-center justify-center mb-6">
          <span className="material-symbols-outlined text-blue-one text-[90px] text-center">
            check
          </span>
          <p className="text-center text-main-text-color text-custom-regular">
            El asunto ha sido creado
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Escribe el nombre de tu asunto"
              className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
              onChange={handleName}
            />
            <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
              list_alt
            </span>
          </div>

          <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
            <select
              id="sub-type"
              name="sub-type"
              required
              autoComplete="sub-type"
              className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-text-color focus:outline-0 focus:ring-0"
              onChange={handleType}
            >
              <option value="">Selecciona el tipo de asunto</option>
              {arrSubjectType.map((stype) => (
                <option key={stype.tipo_proceso} value={stype.tipo_proceso}>
                  {stype.desc_tipo_proceso}
                </option>
              ))}
            </select>
          </div>
          <input
            id="dropzone-file"
            multiple
            type="file"
            accept="application/pdf, .docx, .doc, .zip"
            className="hidden"
            onChange={handleFiles}
          />
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-one border-dashed rounded-lg cursor-pointer bg-main-text-color dark:bg-main-c dark:hover:bg-secundary-c dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {theFiles.length > 0 ? (
                <div className="flex flex-col items-center justify-center p-6">
                  <span className="material-symbols-outlined text-gray-three text-[90px]">
                    draft
                  </span>
                  <ul className="text-main-c dark:text-main-text-color text-custom-regular text-center">
                    {theFiles &&
                      theFiles.length > 0 &&
                      theFiles.map((item: any, index: any) => {
                        return (
                          <li key={index}>
                            {index + 1} - {item.name}
                          </li>
                        );
                      })}
                    <br />
                    <li>Total de archivos: {theFiles.length}</li>
                    <li>
                      Peso total de archivos:{" "}
                      {Math.round(
                        theFiles.reduce((a, v) => (a = a + v.size), 0) / 1048576
                      ).toFixed(2)}{" "}
                      MB
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center p-6">
                    <span className="material-symbols-outlined text-gray-three text-[90px]">
                      note_add
                    </span>
                    <p className="text-main-c dark:text-main-text-color text-custom-regular text-center">
                      Selecciona uno o varios archivos desde tu <br />{" "}
                      computadora <span className="text-blue-one">aquí</span>
                    </p>
                    <hr className="h-[1px] bg-gray-two w-full border-0 my-3" />
                    <p className="text-main-c dark:text-main-text-color text-[12px] text-center">
                      Puedes subir una cantidad máxima de 20 archivos PDF que no
                      excedan los 100MB
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>

          {notif ? (
            <p className="mt-4 text-custom-regular text-gray-three dark:text-white flex items-center gap-4">
              <span className="material-symbols-outlined text-warning text-[20px]">
                warning
              </span>{" "}
              {notifMessage}, por favor
              vuelva a hacer su selección
            </p>
          ) : (
            ""
          )}

          <div className="flex justify-between">
            {enabler ? (
              <button
                type="submit"
                className="text-secundary-c mt-12 ml-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
              >
                Crear Asunto
              </button>
            ) : (
              <button
                disabled
                className="text-gray-one mt-12 ml-auto flex justify-center bg-gray-two py-3 px-14 text-[15px]"
              >
                Crear Asunto
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
