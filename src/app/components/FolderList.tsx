"use client"

import 'material-symbols';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Moment from 'moment';
import Link from 'next/link';
import axios from "axios";
import { useState } from 'react';

export default function FolderList({ id, title, asuntos, notas, fecha }: any) {

    const [isDeleted, setIsDeleted] = useState(false);

    //eliminar carpeta
    const deleteFolder = async () => {
        const deleteParam = { key: 'carpeta', paramId: title, urlSlug: 'eliminaCarpeta' };
        await axios.post('/api/auth/deleteEndpoint', deleteParam)
            .then(response => {
                setIsDeleted(true);
                window.location.reload();
            });

    }

    return (
        <div className='bg-main-text-color dark:bg-gray-five hover:bg-white-one hover:dark:bg-gray-three rounded-lg px-2 flex justify-between items-center'>
            <div className='p-1 flex gap-2 items-center flex-1'>
                <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-two text-center">folder</span>
                <p className='text-[17px] text-gray-seven dark:text-white-one'>{title}</p>
            </div>
            <p className='text-gray-six text-[17px] leading-[16px] flex-1'><span>{asuntos}</span></p>
            <p className='text-gray-six text-[17px] leading-[16px] flex-1'><span>{notas}</span></p>
            <p className='text-gray-six text-[17px] leading-[16px] flex-1'><span>{Moment(fecha).format('DD/MM/yy hh:mm')}</span></p>

            <Popover className="relative">
                <PopoverButton className="ml-auto flex flex-col justify-center">
                    <span className="material-symbols-outlined text-gray-two text-[25px]">more_vert</span>
                </PopoverButton>
                <PopoverPanel transition
                    className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[200px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">

                        <Link href={`/dashboard/${id}`} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                draft
                            </span>
                            Ver asuntos
                        </Link>
                        <Link href={`/dashboard/notas/${id}`} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                content_paste
                            </span>
                            Ver notas
                        </Link>
                        <button onClick={deleteFolder} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
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
                            <p className='text-main-text-color'>Carpeta eliminada</p>
                        </div>
                    ) : (
                        ''
                    )
            }
        </div>
    )
}