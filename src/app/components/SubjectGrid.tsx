"use client"

import axios from "axios";
import 'material-symbols';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link';
import { useState } from "react";

export default function SubjectGrid({ title, id, urlSum, urlRel, urlNotas, thefolder }: any) {

    const [isDeleted, setIsDeleted] = useState(false);

    //eliminar proceso
    const deleteSubject = async () => {
        const deleteParam = { key: 'carpeta', keyTwo: 'proceso', paramId: thefolder, paramTwo: title, urlSlug: 'eliminaProceso'};
        await axios.post('/api/auth/deleteEndpoint', deleteParam)
            .then(response => {
                setIsDeleted(true);
                window.location.reload();
            });

    }

    return (
        <div className='bg-main-text-color dark:bg-gray-five rounded-lg p-2 flex flex-col justify-start min-w-[221px] max-w-[221px] h-full'>

            <Popover className="relative">
                <PopoverButton className="ml-auto block">
                    <span className="material-symbols-outlined text-gray-two text-[25px]">more_vert</span>
                </PopoverButton>
                <PopoverPanel transition
                    className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[200px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">

                        <Link href={urlNotas} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                content_paste
                            </span>
                            Ver notas
                        </Link>
                        <button onClick={deleteSubject} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                delete
                            </span>
                            Eliminar</button>

                    </div>
                </PopoverPanel>
            </Popover>

            {
                (isDeleted) ?
                    (
                        <div className='fixed bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]'>
                            <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">done_all</span>
                            <p className='text-main-text-color'>Asunto eliminado</p>
                        </div>
                    ) : (
                        ''
                    )
            }

            <span className="material-symbols-outlined text-[130px] leading-[100px] text-gray-two text-center">draft</span>

            <div className='px-3 mt-5'>
                <p className='text-[17px] text-gray-seven dark:text-white-one'>{title}</p>
                <Link href={urlSum} className='mt-2 flex gap-2 items-center flex-1'>
                    <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-two text-center">article</span>
                    <span className='text-[14px] text-gray-seven dark:text-white-one'>Resumen</span>
                </Link>
                <Link href={urlRel} className='pt-1 flex gap-2 items-center flex-1'>
                    <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-two text-center">ballot</span>
                    <span className='text-[14px] text-gray-seven dark:text-white-one'>Puntos relevantes</span>
                </Link>
            </div>
        </div>
    )
}