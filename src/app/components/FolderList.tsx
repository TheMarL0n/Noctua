"use client"

import 'material-symbols';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Moment from 'moment';
import Link from 'next/link';
import axios from "axios";
import { useState } from 'react';
import { Modal } from './Modal';

export default function FolderList({ id, title, asuntos, notas, fecha }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    //eliminar carpeta
    const deleteFolder = async () => {
        //elimino primero el contenido de la carpeta
        for (let i = 0; i < asuntos.length; i++) {
            //eliminar contenido de la carpeta
            const deleteParam = { key: 'carpeta', keyTwo: 'proceso', paramId: title, paramTwo: asuntos[i].proceso, urlSlug: 'eliminaProceso' };
            await axios.post('/api/auth/deleteEndpoint', deleteParam)
        }
        const deleteParam = { key: 'carpeta', paramId: title, urlSlug: 'eliminaCarpeta' };
        await axios.post('/api/auth/deleteEndpoint', deleteParam)
            .then(response => {
                window.location.reload();
            });
    }




    return (
        <div className='bg-main-text-color dark:bg-gray-five hover:bg-white-one hover:dark:bg-gray-three rounded-lg px-2 flex justify-between items-center'>
            <Link href={`/dashboard/${id}`} className='flex flex-1 justify-between items-center'>

                <div className='p-1 flex gap-2 items-center flex-1'>
                    <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-two text-center">folder</span>
                    <p className='text-[17px] text-gray-seven dark:text-white-one'>{title}</p>
                </div>
                <p className='text-gray-six text-[17px] leading-[16px] flex-1'><span>{asuntos.length}</span></p>
                <p className='text-gray-six text-[17px] leading-[16px] flex-1'><span>{notas}</span></p>
                <p className='text-gray-six text-[17px] leading-[16px] flex-1'><span>{Moment(fecha).format('DD/MM/yy hh:mm')}</span></p>

            </Link>

            <Popover className="relative">
                <PopoverButton className="ml-auto flex flex-col justify-center">
                    <span className="material-symbols-outlined text-gray-two text-[25px]">more_vert</span>
                </PopoverButton>
                <PopoverPanel transition
                    className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[200px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">

                        <Link href={`/dashboard/notas/${id}`} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                content_paste
                            </span>
                            Ver notas
                        </Link>
                        <button onClick={() => setIsModalOpen(true)} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                delete
                            </span>
                            Eliminar</button>

                    </div>
                </PopoverPanel>
            </Popover>

            <Modal title="Eliminar carpeta" isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <div>
                    <p className='text-center mb-2 text-main-c dark:text-main-text-color'>
                        <span className="material-symbols-outlined">
                            warning
                        </span>
                        <br />
                        Está a punto de eliminar la carpeta <strong className='italic'>"{title}"</strong><br /> con todo sus elementos
                    </p>
                    <div className="flex gap-2 justify-center">
                        <button className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one" onClick={deleteFolder}>Confirmar</button>
                        <button className="text-blue-one mt-12 flex justify-center bg-secundary-c py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-blue-one hover:text-main-c" onClick={() => { setIsModalOpen(false) }}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}