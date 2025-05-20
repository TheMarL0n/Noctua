"use client";
import "material-symbols";
import axios from "axios";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import WorkingLoader from "../components/WorkingLoader";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Modal } from "../components/Modal";

export default function Dashboard() {
  const [answer, setAnswer] = useState<any[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [loading, setLoading] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [formHidden, setFormHidden] = useState(false);
  const user = localStorage.getItem("current-user");

  //tomar la info de los input
  const getYear = (e: any) => {
    setYear(e.target.value);
  };

  const getMonth = (e: any) => {
    setMonth(e.target.value);
    setEnableBtn(false);
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
      key: "anio",
      paramId: year,
      keyQuestion: "mes",
      paramPregunta: month,
      urlSlug: "ai/bitacoraUsuario/?p={{p}}",
    };

    await axios
      .post("/api/auth/endpoint", resumeParam)
      .then((response) => {
        setAnswer(response.data);
        setLoading(false);
        setYear("");
        setMonth("");

        console.log(response.data);
      })
      .catch((err) => {
        setIsModalOpen(true);
        //console.log(`ERROR: ${err.message}`);
      });
  };

  const Total = (e: any) => {
    let sum = 0;
    answer.map((awr) => {
      if (e === "abono") {
        sum += awr.abono;
      } else if (e === "cargo") {
        sum += awr.cargo;
      } else if (e === "abono_consultas") {
        sum += awr.abono_consultas;
      } else if (e === "cargo_consultas") {
        sum += awr.cargo_consultas;
      } else if (e === "abono_minutos") {
        sum += awr.abono_minutos;
      } else if (e === "cargo_minutos") {
        sum += awr.cargo_minutos;
      }
    });
    return sum;
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

      <div className="breadcumb mt-3 flex justify-between">
        <Link
          className="flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2"
          href="/dashboard"
        >
          <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
            contract_edit
          </span>{" "}
          Bitácora de Usuario
        </Link>

        <button
          className="rounded-lg h-[37px] text-[14px] p-2 flex items-center justify-center bg-blue-one text-main-c"
          onClick={() => setFormHidden(!formHidden)}
        >
          {formHidden ? (
            <>
              <span className="material-symbols-outlined text-[18px] text-main-c">
                add
              </span>
              Mostrar formulario
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px] text-main-c">
                remove
              </span>
              Ocultar formulario
            </>
          )}
        </button>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-3" />

      <div className="w-full flex items-center gap-2">
        <form
          //className="w-full flex gap-2 items-end"
          className={`w-full flex gap-2 items-end overflow-hidden transition-all ${
            formHidden ? "h-0" : "h-[90px]"
          }`}
          action=""
        >
          <div className="flex-1">
            <div className="flex rounded-lg gap-2 w-full">
              <div className="flex pr-[10px] w-[70%] justify-between items-center border rounded-lg border-gray-three dark:border-gray-three">
                <select
                  className="w-full text-[17px] bg-transparent rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0 appearance-none cursor-pointer"
                  onChange={getYear}
                >
                  <option value="">Selecciona el Año</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <span className="material-symbols-outlined text-[25px] text-gray-four">
                  calendar_today
                </span>
              </div>

              <div className="flex pr-[10px] w-[70%] justify-between items-center border rounded-lg border-gray-three dark:border-gray-three">
                <select
                  className="w-full text-[17px] bg-transparent rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0 appearance-none cursor-pointer"
                  onChange={getMonth}
                >
                  <option value="">Selecciona el Mes</option>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5" className={year === "2025" ? "hidden" : ""}>
                    Mayo
                  </option>
                  <option value="6" className={year === "2025" ? "hidden" : ""}>
                    Junio
                  </option>
                  <option value="7" className={year === "2025" ? "hidden" : ""}>
                    Julio
                  </option>
                  <option value="8" className={year === "2025" ? "hidden" : ""}>
                    Agosto
                  </option>
                  <option value="9" className={year === "2025" ? "hidden" : ""}>
                    Septiembre
                  </option>
                  <option
                    value="10"
                    className={year === "2025" ? "hidden" : ""}
                  >
                    Octubre
                  </option>
                  <option
                    value="11"
                    className={year === "2025" ? "hidden" : ""}
                  >
                    Noviembre
                  </option>
                  <option
                    value="12"
                    className={year === "2025" ? "hidden" : ""}
                  >
                    Diciembre
                  </option>
                </select>
                <span className="material-symbols-outlined text-[25px] text-gray-four">
                  calendar_today
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-one dark:bg-secundary-c border border-gray-one dark:border-gray-three rounded-lg h-[52px] p-2 flex items-center justify-center">
            <button
              className="flex items-center justify-center disabled:opacity-15"
              onClick={sendTheInfo}
              disabled={enableBtn}
            >
              Ver Log
            </button>
          </div>
        </form>
      </div>

      {loading === true ? (
        <WorkingLoader />
      ) : answer.length > 0 ? (
        <div className="loading my-5 py-8 flex items-end">
          <table className="body px-12 pt-2 pb-6 w-[40%] border-0">
            <tbody>
              <tr className="border-0">
                <td className="border-0 border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[600]">
                  id
                </td>
                <td className="border-0 border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[600]">
                  pregunta
                </td>
              </tr>
              {answer.map((resp, idx) => (
                <tr className="border-0" key={idx}>
                  <td className=" border-0 border-b border-b-[#313139] text-[12px] text-[#676767] font-[200]">
                    {resp.id_proceso}
                  </td>
                  <td className=" border-0 border-b border-b-[#313139] text-[12px] text-[#BCC1CC] font-[200]">
                    {resp.pregunta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="body px-12 pt-2 pb-6 w-[50%] border-0">
            <tbody>
              <tr className="border-0">
                <td className="border-0" colSpan={2}></td>
                <td className="bg-[#201F28] border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[600]">
                  Abono
                </td>
                <td className="bg-[#201F28] border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[200]">
                  A. consultas
                </td>
                <td className="bg-[#201F28] border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[200]">
                  A. minutos
                </td>
                <td className="bg-[#201F28] border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[600]">
                  Cargo
                </td>
                <td className="bg-[#201F28] border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[200]">
                  C. consultas
                </td>
                <td className="bg-[#201F28] border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[200]">
                  C. minutos
                </td>
              </tr>

              <tr className="border-0">
                <td className=" border-0 border-b border-b-[#313139] py-6" colSpan={2}>
                  Totales:
                </td>
                <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] py-6 text-[#BCC1CC] font-[600] text-[12px]">
                  {Total("abono")}.00
                </td>

                <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] py-6 text-[12px] text-[#BCC1CC] font-[200]">
                  {Total("abono_consultas")}.00
                </td>

                <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] py-6 text-[12px] text-[#BCC1CC] font-[200]">
                  {Total("abono_minutos")}:00
                </td>

                <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] py-6 text-[#BCC1CC] font-[600] text-[12px]">
                  {Total("cargo")}.00
                </td>
                <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] py-6 text-[12px] text-[#BCC1CC] font-[200]">
                  {Total("cargo_consultas")}.00
                </td>
                <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] py-6 text-[12px] text-[#BCC1CC] font-[200]">
                  {Total("cargo_minutos")}:00
                </td>
              </tr>

              {answer.map((resp, idx) => (
                <tr className="border-0" key={idx}>
                  {/*
                  <td>{resp.id_proceso}</td>
                  <td>{resp.pregunta}</td>
                  */}
                  <td
                    className="text-center border-0 border-b border-b-[#313139]"
                    colSpan={2}
                  ></td>
                  <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] text-[#BCC1CC] font-[600] text-[12px]">
                    {resp.abono}.00
                  </td>
                  <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] text-[12px] text-[#BCC1CC] font-[200]">
                    {resp.abono_consultas}.00
                  </td>
                  <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] text-[12px] text-[#BCC1CC] font-[200]">
                    {resp.abono_minutos}:00
                  </td>
                  <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] text-[#BCC1CC] font-[600] text-[12px]">
                    {resp.cargo}.00
                  </td>
                  <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] text-[12px] text-[#BCC1CC] font-[200]">
                    {resp.cargo_consultas}.00
                  </td>
                  <td className="text-center bg-[#201F28] border-0 border-b border-b-[#313139] text-[12px] text-[#BCC1CC] font-[200]">
                    {resp.cargo_minutos}:00{" "}
                  </td>
                  {/*
                  <td>
                    {resp.dia}/{resp.mes}/{resp.anio}
                  </td>
                  */}
                </tr>
              ))}
            </tbody>
          </table>

          <table className="body px-12 pt-2 pb-6 w-[10%] border-0">
            <tbody>
              <tr className="border-0">
                <td className="border-0 text-center border-b border-b-[#313139] uppercase text-[12px] text-[#BCC1CC] font-[600]">
                  Fecha
                </td>
              </tr>
              {answer.map((resp, idx) => (
                <tr className="border-0" key={idx}>
                  <td className="text-center border-0 border-b border-b-[#313139] text-[12px] text-[#BCC1CC] font-[200]">
                    {resp.dia}/{resp.mes}/{resp.anio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}

      {answer.length === 0 && loading !== true ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            contract_edit
          </span>
          <h2 className="text-gray-three text-center text-[36px] my-4">
            Consulta tu bitácora
          </h2>
        </div>
      ) : (
        <></>
      )}

      <Modal
        title="Tiempo de espera agotado"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div>
          <p className="text-gray-three dark:text-white text-[18px] text-center flex flex-col items-center gap-2">
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
