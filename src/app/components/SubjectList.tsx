import 'material-symbols';
import axios from "axios";
import { useState, useEffect } from 'react';
import Moment from 'moment';
import Link from 'next/link';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Modal } from "./Modal";

export default function SubjectList({ title, id, urlSum, urlRel, urlNotas, thefolder }: any) {

    const [fecha, setFecha] = useState('');
    const [notas, setNotas] = useState<any[]>([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [tipoProceso, setTipoProceso] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getSubjectInfo();
    }, [])

    //get the subject info given the subject id
    const getSubjectInfo = async () => {
        const folderDetailParam = { key: "id_proceso", paramId: id, urlSlug: "api/consultaProceso" };
        const { data } = await axios.post('/api/auth/endpoint', folderDetailParam);
        setFecha(data.fecha_creacion);
        if (data.notas) {
            setNotas(data.notas);
            setTipoProceso(data.tipo_proceso);
        }
    }

    //eliminar proceso
    const deleteSubject = async () => {
        const deleteParam = { key: 'carpeta', keyTwo: 'proceso', paramId: thefolder, paramTwo: title, urlSlug: 'eliminaProceso' };
        await axios.post('/api/auth/deleteEndpoint', deleteParam)
            .then(response => {
                setIsDeleted(true);
                localStorage.removeItem(`rpoints_${id}`);
                localStorage.removeItem(`firstvisit_${id}`);
                window.location.reload();
            });
    }

    return (
        <div className='bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex justify-between items-center'>
            <div className='p-1 flex gap-2 items-center flex-1'>
                <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-two text-center">draft</span>
                <p className='text-[17px] text-gray-seven dark:text-white-one'>{title}</p>
            </div>
            <p className='p-1 text-gray-six text-[17px] leading-[16px] flex-1'><span>{tipoProceso}</span></p>
            <p className='p-1 text-gray-six text-[17px] leading-[16px] flex-1'><span>{notas.length}</span></p>
            <p className='p-1 text-gray-six text-[17px] leading-[16px] flex-1'><span>{Moment(fecha).format('DD/MM/yy hh:mm')}</span></p>



            <Popover className="relative">
                <PopoverButton className="ml-auto flex flex-col justify-center">
                    <span className="material-symbols-outlined text-gray-two text-[25px]">more_vert</span>
                </PopoverButton>
                <PopoverPanel transition
                    className="absolute right-0 top-6 z-10 mt-1 flex max-w-max min-w-[240px] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="max-w-md flex-auto overflow-hidden bg-main-text-color dark:bg-gray-two rounded-[3px] text-sm leading-6 shadow-lg">

                        <Link href={urlSum} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">article</span>
                            Resumen
                        </Link>
                        <Link href={urlRel} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">ballot</span>
                            Puntos relevantes
                        </Link>
                        <Link href={urlNotas} className='w-full hover:bg-blue-one hover:text-main-c px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                content_paste
                            </span>
                            Notas
                        </Link>
                        <hr className='mx-4'/>
                        <button onClick={() => setIsModalOpen(true)} className='w-full hover:bg-error hover:text-main-text-color px-4 py-2 flex items-center gap-1'>
                            <span className="material-symbols-outlined text-[16px]">
                                delete
                            </span>
                            Eliminar</button>

                    </div>
                </PopoverPanel>
            </Popover>

            <Modal title="Eliminar asunto" isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <div>                    
                    <p className='text-center mb-2 text-main-c dark:text-main-text-color'>
                    <span className="material-symbols-outlined">
                        warning
                    </span>
                    <br />
                        Está a punto de eliminar el asunto <strong className='italic'>"{title}"</strong><br /> con todo sus elementos
                        </p>
                    <div className="flex gap-2 justify-center">
                        <button className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one" onClick={deleteSubject}>Confirmar</button>
                        <button className="text-blue-one mt-12 flex justify-center bg-secundary-c py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-blue-one hover:text-main-c" onClick={() => { setIsModalOpen(false) }}>Cancelar</button>
                    </div>
                </div>
            </Modal>

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
        </div>
    )
}