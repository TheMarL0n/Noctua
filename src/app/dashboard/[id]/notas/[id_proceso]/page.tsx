'use client'
import 'material-symbols';
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from '@/app/components/Modal';
import Link from 'next/link';
import NotesList from '@/app/components/NotesList';
import AddNotesForm from '@/app/components/AddNotesForm';
import WorkingLoader from '@/app/components/WorkingLoader';

export default function Notes(notas: any) {

    const [notes, setNotes] = useState<any[]>([]);
    const [folderName, setFolderName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getSubject();
        getFolderAndSubject();
    }, [])

    //get the folder detail
    const getSubject = async () => {
        const folderDetailParam = { key: "id_proceso", paramId: notas.params.id_proceso, urlSlug: "api/consultaProceso" };
        const { data } = await axios.post('/api/auth/endpoint', folderDetailParam);
        if (data.notas) {
            setNotes(data.notas);
        }
        setIsLoading(false);
    }

    const getFolderAndSubject = async () => {
        const proccessDetailParam = { key: "id_proceso", paramId: notas.params.id_proceso, urlSlug: "api/getCarpetaProceso" };
        const { data } = await axios.post('/api/auth/endpoint', proccessDetailParam);
        setFolderName(data.carpeta);
        setSubjectName(data.proceso);
    }

    //Cambiar el orden del listado (Sort)--------------------------------------------------------------------------------------------------
    const changeOrder = () => { setOrder(prevCheck => !prevCheck) }
    const filterSort = notes.sort(
        order === false
            ? ((a, b) => a.nota < b.nota ? 1 : -1)
            : ((a, b) => a.nota > b.nota ? 1 : -1)
    );

    return (
        <div className="page-body py-2 px-4 w-full min-h-full">
            <div className="w-full mt-4">
                <div className="flex justify-between items-center">
                    <h3 className='text-gray-seven dark:text-white-one text-[22px]'>Notas</h3>
                    <div className="bg-white rounded-full p-2 w-[52px] h-[52px] flex justify-center items-center">
                        <a className="flex items-center justify-center" href="#">
                            <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                notifications
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="breadcumb">
                <div className='flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2'><Link href={'/dashboard'}><span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">hard_drive</span> Archivo</Link> / <Link href={`/dashboard/`}>{folderName}</Link> / <Link href={`/dashboard/`}>{subjectName}</Link></div>
            </div>

            {
                isLoading ?
                    <WorkingLoader />
                    :
                    notes.length === 0 ?
                        <div className="folders-list flex flex-col items-center justify-center mt-40">
                            <span className="material-symbols-outlined text-[128px] text-gray-three">
                                content_paste_off
                            </span>
                            <h2 className='text-gray-three text-[36px] my-4'>No hay notas en este proyecto</h2>
                            <p className='text-custom-regular text-gray-three dark:text-white flex items-center gap-2'><span className="material-symbols-outlined text-warning text-[16px]">warning</span> Consulta a tu administrador o añade una nota ahora.</p>
                            <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full my-5 cursor-pointer">
                                <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                    add
                                </span>
                            </a>
                        </div>
                        :
                        <>
                            <hr className='h-[1px] border-0 w-full bg-gray-three my-3' />
                            <div className="p-2 flex justify-between gap-16">
                                <a onClick={() => changeOrder()} className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'>
                                    Nombre
                                    <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                                        sort_by_alpha
                                    </span>
                                </a>
                                <a onClick={() => changeOrder()} className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'>
                                    Fecha
                                    <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                                        sort_by_alpha
                                    </span>
                                </a>
                                <p className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'></p>
                            </div>
                            <div className="flex flex-col gap-3 w-full mt-3">
                                {
                                    filterSort.map(nota => (
                                        <NotesList key={nota.id_nota} id={nota.id_nota} text={nota.nota} from={'id_proceso'} fromname={notas.params.id_proceso} />
                                    ))
                                }
                            </div>


                            <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full my-5 cursor-pointer">
                                <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                    add
                                </span>
                            </a>
                        </>
            }

            <Modal title="Crear nota nueva" isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <AddNotesForm slug={'api/creaNotaProceso/'} father={'proceso_id'} procesoOcarpeta={notas.params.id_proceso} />
            </Modal>
        </div>
    )
}