import ReactMarkdown from 'react-markdown'
import axios from "axios";
import WorkingLoader from '@/app/components/WorkingLoader';
import { useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link';

export default function AiQuestion({ pregunta, idProceso, respuesta }: any) {

    const [isAdded, setIsAdded] = useState(false);
  
    //añadir la consulta como nota
    const addToNote = async (nota: any) => {
        const saveParam = { key: 'nota', keyQuestion: 'proceso_id', paramId: nota, paramPregunta: idProceso, urlSlug: "api/creaNotaProceso/" };
        await axios.post('/api/auth/endpoint', saveParam).then(response => {
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 1000);
        });
    }

    return (
        <div className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md">
            <div className="header flex justify-between items-center px-4 py-2">
                <h2 className='text-[25px] text-bg-gray-five dark:text-main-text-color flex gap-2 items-center'>
                    <span className="material-symbols-outlined text-[32px] text-bg-gray-five dark:text-white font-extralight">
                        mark_chat_read
                    </span>
                    {pregunta}

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
                            <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">

                                <button onClick={() => addToNote(respuesta)} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
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

                {
                    respuesta.split("\n\n").map(function (item: any, idx: any) {
                        return (
                            <div key={idx}>
                                <ReactMarkdown className='text-[18px] leading-{18px} text-gray-seven dark:text-white-one'>{item}</ReactMarkdown>
                                <br />
                            </div>
                        )
                    })
                }

            </div>
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