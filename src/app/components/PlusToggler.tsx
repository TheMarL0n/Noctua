import { useEffect, useState } from "react";
import { ModalIcon } from "./ModalIcon";

export default function PlusToggler({ idProceso }: any) {
  const [modeplus, setModeplus] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("modeplus") === "plus-on") {
      setModeplus("plus-on");
      document.documentElement.classList.add("plus-on");
    } else setModeplus("plus-of");
  }, []);

  const togglePlus = () => {
    if (document.documentElement.classList.contains("plus-on")) {
      document.documentElement.classList.remove("plus-on");
      localStorage.setItem("modeplus", "plus-of");
      setModeplus("plus-of");
      window.location.reload();
    } else setIsModalOpen(true);
  };

  //activar modo plus
  const togglePlusOn = () => {
    document.documentElement.classList.add("plus-on");
    localStorage.setItem("modeplus", "plus-on");
    setModeplus("plus-on");
    window.location.reload();
  };

  //desactivar modo plus
  const togglePlusOf = () => {
    if (document.documentElement.classList.contains("plus-on")) {
      document.documentElement.classList.remove("plus-on");
      localStorage.setItem("modeplus", "plus-of");
      setModeplus("plus-of");
    }
    window.location.reload();
  };

  return (
    <>
      <div className="plus-toggler toggle bg-gray-one dark:bg-secundary-c rounded-lg px-4 py-3 h-[52px] flex items-center gap-1">
        <label className="inline-flex gap-5 items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={togglePlus}
          />
          <div className="plus-toggler-btn relative w-11 h-[14px] bg-white-one peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-3px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="text-[12px] uppercase text-white">Modo plus</span>
        </label>
      </div>
      <ModalIcon
        title="Estas apunto de iniciar el Modo Plus"
        icon="quickreply"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <p className="text-[17px] leading-[17px] font-light text-gray-five dark:text-main-text-color">
          Esta operación incrementará el poder cognitivo.
        </p>
        <p className="text-[14px] leading-[14px] font-light text-[#9399A3] dark:text-[#9399A3]">
          El consumo de créditos aumentará.
        </p>
       <div className="flex gap-1 justify-end">
       <button
          onClick={togglePlusOf}
          className="text-secundary-c mt-12 flex justify-center bg-gray-two py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
        >
          Cancelar
        </button>
       <button
          onClick={togglePlusOn}
          className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
        >
          Aceptar
        </button>
       </div>
      </ModalIcon>
    </>
  );
}
