'use client'
import 'material-symbols';
import axios from "axios";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'
import WorkingLoader from '../components/WorkingLoader';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {

    const [answer, setAnswer] = useState<any[]>([]);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [enableBtn, setEnableBtn] = useState(true);
    const [showQuestion, setShowQuestion] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const answerSS = JSON.parse(localStorage.getItem("history") ?? '[]');
        setAnswer(answerSS);
    }, [])

    useEffect(() => {
        if (answer.length !== 0) {
            localStorage.setItem("history", JSON.stringify(answer)) //almacenar datos en el local storage
        }
    }, [answer])

    //tomar la pregunta del input
    const getTheQuestion = (e: any) => {
        setEnableBtn(false);
        setQuestion(e.target.value)
    }

    //enviar la pregunta
    const sendTheQuestion = () => {
        setLoading(true);
        getAnswer();
    }

    //Obtener las preguntas de la API
    const getAnswer = async () => {
        const resumeParam = { key: 'pregunta', paramId: question, urlSlug: "ai/preguntaNoctua/?p=test" };
        const { data } = await axios.post('/api/auth/endpoint', resumeParam);

        setAnswer(answer => [...answer, { pregunta: question, respuesta: data.respuesta }]);
        setLoading(false);
        setShowQuestion(true);
    }

    //añadir la consulta como nota
    const addToNote = async (nota: any) => {
        const saveParam = { key: 'nota', paramId: nota, urlSlug: "api/guardarNota/" };
        await axios.post('/api/auth/endpoint', saveParam).then(response => {
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 1000);
        });
    }

    //para el drag and drop-------------------------------
    const dragItem = useRef<number>(0);
    const dragOverItem = useRef<number>(0);

    const handleSort = () => {
        const itemClone = [...answer];
        const temp = itemClone[dragItem.current];
        itemClone[dragItem.current] = itemClone[dragOverItem.current];
        itemClone[dragOverItem.current] = temp;
        setAnswer(itemClone);
        localStorage.setItem("history", JSON.stringify(itemClone));
    }


    return (
        <div className="page-body py-2 px-4 w-full min-h-full">
            <div className="w-full mt-4">
                <div className="flex justify-between items-center">
                    <h3 className='text-gray-seven dark:text-white-one text-[22px] capitalize'>
                        Noctua IA
                    </h3>
                </div>
            </div>

            <div className="breadcumb mt-3">
                <Link className='flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2' href="/dashboard"><span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">auto_awesome</span> Noctua AI / {showQuestion ? question : ''}</Link>
            </div>

            <hr className='h-[1px] border-0 w-full bg-gray-three my-3' />

            <div className="w-full flex items-center gap-2">
                <div className="search-bar bg-main-text-color dark:bg-gray-three rounded-lg flex items-center w-full">

                    <input
                        type="text"
                        className="w-full bg-main-text-color dark:bg-gray-three text-[17px] rounded-lg text-gray-one py-[17px] px-[10px] leading-[18px] focus:outline-0"
                        placeholder="Pregunta o da una instrucción a Noctua&reg;, En materia legal"
                        onChange={getTheQuestion}
                        value={question} />


                    <div className="bg-gray-one dark:bg-secundary-c border border-gray-one dark:border-gray-three rounded-lg h-[52px] p-2 flex items-center justify-center">
                        <button className="flex items-center justify-center disabled:opacity-15" onClick={sendTheQuestion} disabled={enableBtn}>
                            <span className="material-symbols-outlined text-[32px] text-gray-four">
                                chat
                            </span>
                        </button>
                    </div>

                </div>
                <div className=" dark:bg-white bg-secundary-c rounded-full p-2 w-[52px] h-[52px] flex justify-center items-center">
                    <a className="flex items-center justify-center" href="#">
                        <span className="material-symbols-outlined text-[30px] text-white dark:text-secundary-c font-light">
                            notifications
                        </span>
                    </a>
                </div>
            </div>

            {
                (loading === true) ?
                    <WorkingLoader />
                    :
                    (answer.length > 0) ? (
                        <>

                            {
                                answer.map((res, idx) => (
                                    <div
                                        key={idx}
                                        className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md"
                                        draggable
                                        onDragStart={() => (dragItem.current = idx)}
                                        onDragEnter={() => (dragOverItem.current = idx)}
                                        onDragEnd={handleSort}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <div className="header flex justify-between items-center px-4 py-2">
                                            <h2 className='text-[25px] text-gray-seven dark:text-white-one flex gap-2 items-center'>
                                                <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-seven dark:text-white-one text-center cursor-pointer">drag_indicator</span>
                                                <span className="material-symbols-outlined text-[32px] text-gray-seven dark:text-white-one font-extralight">
                                                    mark_chat_read
                                                </span>
                                                {res.pregunta}
                                            </h2>
                                            <div className="flex gap-1 items-center">
                                                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">download</span>
                                                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">bookmark</span>
                                                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">print</span>

                                                <Popover className="relative">
                                                    <PopoverButton className="ml-auto flex flex-col justify-center">
                                                        <span className="material-symbols-outlined text-gray-two text-[25px]">more_vert</span>
                                                    </PopoverButton>
                                                    <PopoverPanel transition
                                                        className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[200px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                                                        <div className="max-w-md flex-auto overflow-hidden bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">

                                                            <button onClick={() => addToNote(res.pregunta)} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                                                                <span className="material-symbols-outlined text-[16px]">
                                                                    note_add
                                                                </span>
                                                                Agregar a notas
                                                            </button>
                                                            <Link href={``} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                                                                <span className="material-symbols-outlined text-[16px]">
                                                                    compress
                                                                </span>
                                                                Sintetiza
                                                            </Link>


                                                        </div>
                                                    </PopoverPanel>
                                                </Popover>

                                            </div>
                                        </div>

                                        <hr className='h-[1px] border-0 w-full bg-gray-three mb-3' />

                                        <div className="body px-12 pt-2 pb-6">
                                            {res.respuesta.split("\n\n").map(function (item: any, idx: any) {
                                                return (
                                                    <div key={idx}>
                                                        <ReactMarkdown className='text-[18px] leading-{18px} text-gray-seven dark:text-white-one'>{item}</ReactMarkdown>
                                                        <br />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )).toReversed()
                            }
                        </>
                    )
                        :
                        <></>
            }

            {
                ((answer.length === 0) && (loading !== true)) ? (
                    <div className="folders-list flex flex-col items-center justify-center mt-40">
                        <span className="material-symbols-outlined text-[128px] text-gray-three">
                            auto_awesome
                        </span>
                        <h2 className='text-gray-three text-[36px] my-4'>Escribe una pregunta o da una instrucción en Materia Legal a Noctua Ai</h2>
                        <p className='text-custom-regular text-white flex items-center gap-2'><span className="material-symbols-outlined text-warning text-[16px]">warning</span> Consulta a tu administrador o haz una pregunta ahora.</p>
                    </div>
                )
                    :
                    <></>
            }

            {(isAdded) ?
                (
                    <div className='fixed bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]'>
                        <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">done_all</span>
                         <p className='text-main-text-color'>Añadido a las notas</p>
                    </div>
                ) : (
                    ''
                )
            }
        </div>
    )
}