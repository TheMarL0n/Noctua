import ReactMarkdown from 'react-markdown'
import axios from "axios";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';

export default function RelevantPointsSS({ preguntas, idProceso }: any) {

    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [items, setItems] = useState(preguntas);
    const [selected, setSelected] = useState(null);

    //para el drag and drop-------------------------------
    const dragItem = useRef<number>(0);
    const dragOverItem = useRef<number>(0);

    const handleSort = () => {
        const itemClone = [...items];
        const temp = itemClone[dragItem.current];
        itemClone[dragItem.current] = itemClone[dragOverItem.current];
        itemClone[dragOverItem.current] = temp;
        setItems(itemClone);
        localStorage.setItem(`rpoints_${idProceso}`, JSON.stringify(itemClone));
    }

    useEffect(() => {
        localStorage.setItem(`firstvisit_${idProceso}`, 'storaged');
    }, [])

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

    //eliminar pregunta
    const deleteQuestion = async (id_proc: any, id_preg: any) => {
        const deleteParam = { key: 'id_proceso', keyTwo: 'id_pregunta', paramId: id_proc, paramTwo: id_preg };
        await axios.delete('/api/auth/deleteQuestion', { data: deleteParam });
        setIsDeleted(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }

    //colapsar o no la carta
    const handleToggle = (index: any) => {
        if (selected === index) {
            return setSelected(null);
        }
        setSelected(index);
    }

    return (
        <>
            {
                items.map((preg: any, index: any) => (

                    <div
                        key={index}
                        className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md"
                        draggable
                        onDragStart={() => (dragItem.current = index)}
                        onDragEnter={() => (dragOverItem.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <button
                            onClick={() => handleToggle(index)}
                            className={`header flex justify-between items-center px-4 py-2 cursor-pointer rounded-md hover:bg-gray-one w-full gap-2 ${selected === index ? 'bg-gray-one' : ''}`}>
                            <h2 className='text-[25px] text-bg-gray-five dark:text-main-text-color flex gap-2 items-center text-left'>
                                <span className="cursor-pointer material-symbols-outlined text-[25px] leading-[20px] text-gray-seven dark:text-white-one text-center">drag_indicator</span>
                                <span className="material-symbols-outlined text-[32px] text-bg-gray-five dark:text-white font-extralight">
                                    mark_chat_read
                                </span>
                                {preg.pregunta}
                            </h2>
                            <span className="material-symbols-outlined text-[32px] text-bg-gray-five dark:text-white font-extralight">
                                {
                                    selected === index ?
                                        'keyboard_arrow_up'
                                        :
                                        'keyboard_arrow_down'
                                }
                            </span>
                        </button>

                        <div className={`body px-12 accordion-item ${selected === index ? 'accordion-item-show' : ''}`}>

                            <div className="flex gap-1 items-center justify-end my-3">
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

                                            <button onClick={() => addToNote(preg.respuesta)} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
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

                                            <button onClick={() => deleteQuestion(idProceso, preg.id_pregunta)} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                                                <span className="material-symbols-outlined text-[16px]">
                                                    delete
                                                </span>
                                                Eliminar pregunta
                                            </button>
                                            
                                        </div>
                                    </PopoverPanel>
                                </Popover>

                            </div>

                            <hr className="h-[1px] bg-gray-eight w-full border-0 mb-5" />

                            {
                                preg.respuesta.split("\n\n").map(function (item: any, idx: any) {
                                    return (
                                        <div key={idx}>
                                            <ReactMarkdown className='text-[18px] leading-{18px} text-gray-seven dark:text-white-one'>{item}</ReactMarkdown>
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ))
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
            {(isDeleted) ?
                (
                    <div className='fixed bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]'>
                        <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">done_all</span>
                        <p className='text-main-text-color'>Pregunta eliminada</p>
                    </div>
                ) : (
                    ''
                )
            }
        </>
    )
}
