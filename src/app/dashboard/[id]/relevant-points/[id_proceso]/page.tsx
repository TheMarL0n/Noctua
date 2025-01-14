"use client";
import "material-symbols";
import axios from "axios";
import { useEffect, useState } from "react";
import RelevantPointsSS from "@/app/components/RelevantPointsSS";
import Link from "next/link";
import AiQuestion from "@/app/components/AiQuestion";
import WorkingLoader from "@/app/components/WorkingLoader";
import QuestionConcept from "@/app/components/QuestionConcept";
import RelevantPoints from "@/app/components/RelevantPoints";
import PlusToggler from "@/app/components/PlusToggler";

export default function Subject(resumen: any) {
  const [contenido, setContenido] = useState<any[]>([]);
  const contenidoSS = JSON.parse(
    localStorage.getItem(`rpoints_${resumen.params.id_proceso}`) ?? "[]"
  );
  const modeplus = localStorage.getItem("modeplus");

  const [folder, setFolder] = useState("");
  const [subject, setSubject] = useState("");

  const [question, setQuestion] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState("");

  const getUser = async () => {
    const { data } = await axios.get("/api/auth/user");
    localStorage.setItem("current-user", data.nombre_usuario); //crear el firstimer en localstorage
    setUser(data.nombre_usuario);
  };

  useEffect(() => {
    getResume(); //obtengo nombre de carpeta y nombre de asunto para el breadcumb
    getProcess(); //obtengo pregunta
    getUser();
  }, []);

  //get folder and subject name from the resume--------------------------------------------------------------------------------------
  const getResume = async () => {
    const resParam = {
      key: "id_proceso",
      paramId: resumen.params.id_proceso,
      urlSlug: "ai/consultaResumen",
    };
    const { data } = await axios.post("/api/auth/endpoint", resParam);

    setFolder(data.carpeta);
    setSubject(data.proceso);
  };

  //get the pregunta from proceso-----------------------------------------------------------------------------------------------------
  const getProcess = async () => {
    const resumeParam = {
      key: "id_proceso",
      paramId: resumen.params.id_proceso,
      urlSlug: "api/consultaProceso",
    };
    const { data } = await axios.post("/api/auth/endpoint", resumeParam);

    if (data.contenido) {
      //checar si ya el proceso cuenta con respuesta y si es la primera vez que se visita en un navegador
      let visited = localStorage.getItem(
        `firstvisit_${resumen.params.id_proceso}`
      );
      if ("respuesta" in data.contenido[0] && visited === null) {
        localStorage.setItem(
          `firstvisit_${resumen.params.id_proceso}`,
          "visited"
        );
      }

      setContenido(data.contenido);
    }
  };

  //obtener la respuesta segun la pregunta escrita en text input------------------------------------------------------------------------
  const getQuestionFromInput = (e: any) => {
    setQuestion(e.target.value);
  };

  const sendTheQuestion = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (modeplus === "plus-on") {
      getAnswerPlus();
    } else getAnswer();
  };

  //Obtener las preguntas de la API
  const getAnswer = async () => {
    setTitle(question);
    const resumeParam = {
      key: "id_proceso",
      keyQuestion: "pregunta",
      paramId: resumen.params.id_proceso,
      paramPregunta: question,
      urlSlug: "ai/preguntaIA",
    };

    await axios.post("/api/auth/endpoint", resumeParam).then((response) => {
      setAnswer(response.data.respuesta);
      setLoading(false);
      setQuestion("");
    });
  };

  //Obtener las preguntas PLUS de la API
  const getAnswerPlus = async () => {
    setTitle(question);
    const resumeParam = {
      key: "id_proceso",
      keyQuestion: "pregunta",
      paramId: resumen.params.id_proceso,
      paramPregunta: question,
      urlSlug: "ai/preguntaIAPlus",
    };

    await axios.post("/api/auth/endpoint", resumeParam).then((response) => {
      setAnswer(response.data.respuesta);
      setLoading(false);
      setQuestion("");
    });
  };

  //get relevant point
  const getPoints = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    for (let i = 0; i < contenido.length; i++) {
      const resumeParam = {
        key: "id_proceso",
        keyQuestion: "id_concepto",
        paramId: resumen.params.id_proceso,
        paramPregunta: contenido[i].id_pregunta,
        urlSlug: "ai/preguntaIAConceptoPlus",
      };
      const { data } = await axios.post("/api/auth/endpoint", resumeParam);
    }
    setLoading(false);
  };  

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full my-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2">
              <span className="material-symbols-outlined">account_circle</span>
              {user}
            </h3>
          </div>

          <div className="flex gap-3 items-center"></div>
        </div>
      </div>

      <div className="breadcumb mt-4">
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
            href={`/dashboard/${resumen.params.id}`}
          >
            <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
              folder
            </span>{" "}
            {folder}
          </Link>{" "}
          /
          <Link
            className="flex gap-1 items-center"
            href={`/dashboard/${resumen.params.id}/relevant-points/${resumen.params.id_proceso}`}
          >
            <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
              draft
            </span>{" "}
            {subject}
          </Link>
          /
          <p className="flex gap-1 items-center">
            <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
              format_list_bulleted
            </span>
            Puntos relevantes
          </p>
        </div>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-3" />

      {/***************************************************************SEARCHBAR****************************************************************************************/}

      <div className="search-bar bg-main-text-color dark:bg-gray-three rounded-lg w-full ia-bg">
        <form
          className="w-full flex items-center mb-3 border border-gray-three ia-border rounded-lg"
          action=""
        >
          <input
            type="text"
            className="ia-bg w-full plus-on:bg-gray-three bg-main-text-color dark:bg-gray-three text-[17px] rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0"
            placeholder="Da una instrucción a Noctua&reg;, sobre este asunto"
            onChange={getQuestionFromInput}
            value={question}
          />
          <div className="ia-btn bg-gray-one dark:bg-secundary-c rounded-lg h-[52px] p-2 flex items-center justify-center mr-1">
            <button
              className="flex items-center justify-center"
              onClick={sendTheQuestion}
            >
              <span className="material-symbols-outlined text-[32px] text-gray-four">
                chat
              </span>
            </button>
          </div>
          <PlusToggler idProceso={resumen.params.id_proceso} />
        </form>
      </div>
      {/*******************************************************************************************************************************************************/}

      <div className="w-full my-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <h3 className="text-gray-seven dark:text-white-one text-[22px]">
              Puntos Relevantes
            </h3>
          </div>

          <div className="flex items-center">
            <button
              className={`sheen ia-border text-gray-seven dark:text-white-one text-[12px] relative overflow-hidden uppercase flex items-center gap-2 bg-white dark:bg-secundary-c rounded-lg px-4 py-3 ${
                modeplus === "plus-on"
                  ? ""
                  : "hidden"
              }`}
              onClick={getPoints}
            >
              <span className="material-symbols-outlined text-[14px] text-blue-one">
              quickreply
              </span>{" "}
              Respuestas modo plus
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <WorkingLoader />
      ) : (
        <RelevantPoints idProceso={resumen.params.id_proceso} />
      )}
    </div>
  );
}
