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
    const [folderId, setFolderId] = useState('');
    const [folderName, setFolderName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getFolder();
    }, [])

    //get the folder detail
    const getFolder = async () => {
        const folderDetailParam = { key: "idCarpeta", paramId: notas.params.id, urlSlug: "api/consultaCarpeta" };
        const { data } = await axios.post('/api/auth/endpoint', folderDetailParam);
        setFolderId(data.id);
        setFolderName(data.carpeta);
        setNotes(data.notas);
        setIsLoading(false);
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
                    
                </div>
            </div>

            <div className="breadcumb">
                <div className='flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2'><Link href={'/dashboard'}><span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">hard_drive</span> Archivo</Link> / <Link href={`/dashboard/${folderId}`}>{folderName}</Link></div>
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
                    <h2 className='text-gray-three text-[36px] my-4'>No hay notas en esta carpeta</h2>
                    <p className='text-custom-regular text-white flex items-center gap-2'><span className="material-symbols-outlined text-warning text-[16px]">warning</span> Consulta a tu administrador o añade una nota ahora.</p>
                    <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full my-5 cursor-pointer">
                        <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                            add
                        </span>
                    </a>
                </div>
                :
                <>
                <hr className='h-[1px] border-0 w-full bg-gray-three my-3' />
                    <div className="p-2 flex justify-between  gap-16">
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
                                <NotesList key={nota.id_nota} id={nota.id_nota} text={nota.nota} from={'carpeta'} fromname={folderName}/>
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
                <AddNotesForm slug={'api/creaNotaCarpeta/'} father={'carpeta'} procesoOcarpeta={folderName} />
            </Modal>
        </div>
    )
}