'use client'
import 'material-symbols';
import axios from "axios";
import FolderGrid from '../components/FolderGrid';
import FolderList from '../components/FolderList';
import AddFolderForm from '../components/AddFolderForm';
import Link from 'next/link';

import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import WorkingLoader from '../components/WorkingLoader';

export default function Dashboard() {

    const [folders, setFolders] = useState<any[]>([]);
    const [viewType, setViewType] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState(false);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [question, setQuestion] = useState('');
    const [enableBtn, setEnableBtn] = useState(true);
    const [answer, setAnswer] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getFolders();
    }, [])

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
        const resumeParam = { key: 'pregunta', paramId: question, urlSlug: "ai/preguntaCarpeta" };
        const { data } = await axios.post('/api/auth/endpoint', resumeParam);

        setAnswer(answer => [...answer, { pregunta: question, respuesta: data.respuesta }]);
        setLoading(false);
        setShowQuestion(true);
    }

    //Obtener el listado de carpetas de la API
    const getFolders = async () => {
        const { data } = await axios.get('/api/auth/folders', {
            params: {
                urlSlug: "services/api/listaCarpetas"
            }
        });

        //Checar si el token ha expirado
        if (!data.code) {
            setFolders(data);
            setUser(data[0].usuario);
        }
        setIsLoading(false);
    }

    //Cambiar las vistas de GRID a LIST--------------------------------------------------------------------------------------------------
    const changeViewList = () => { setViewType(false) }
    const changeViewGrid = () => { setViewType(true) }

    //Cambiar el orden del listado (Sort)--------------------------------------------------------------------------------------------------
    const changeOrder = () => { 
        setOrder(prevCheck => !prevCheck) 
    }

    const nameSort = folders.sort(
        order === false
            ? ((a, b) => a.carpeta < b.carpeta ? 1 : -1)
            : ((a, b) => a.carpeta > b.carpeta ? 1 : -1)
    );

    return (
        <div className="page-body py-2 px-4 w-full min-h-full">
            <div className="w-full mt-4">

            <form className="w-full flex items-center" action="">
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

                    </form>

                <div className="flex justify-between items-center">
                    <h3 className='text-gray-seven dark:text-white-one text-[22px] capitalize'>
                        {user}
                    </h3>
                    <a className='flex items-center text-custom-regular text-gray-seven dark:text-white-one bg-main-text-color dark:bg-secundary-c rounded-lg py-2 pl-1 pr-6 leading-[16px] cursor-pointer' onClick={() => setIsModalOpen(true)}><span className="material-symbols-outlined text-[30px] font-extralight">add</span> Agregar carpeta</a>
                </div>
            </div>
            <div className="breadcumb">
                <Link className='flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2' href="/dashboard"><span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">hard_drive</span> Archivo /</Link>
            </div>


            {
                isLoading ?
                    <WorkingLoader />
                    :
                    folders.length === 0 ? (
                        <div className="folders-list flex flex-col items-center justify-center mt-40">
                            <span className="material-symbols-outlined text-[128px] text-gray-three">
                                folder_off
                            </span>
                            <h2 className='text-gray-three text-[36px] my-4'>No hay carpetas en este proyecto</h2>
                            <p className='text-custom-regular text-white flex items-center gap-2'><span className="material-symbols-outlined text-warning text-[16px]">warning</span> Consulta a tu administrador o crea una carpeta ahora.</p>
                            <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full my-5 cursor-pointer">
                                <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                    add
                                </span>
                            </a>
                        </div>
                    ) : (
                        <div className="folders-list flex flex-col items-start justify-start">
                            <hr className='h-[1px] border-0 w-full bg-gray-three my-3' />
                            <div className='flex justify-end w-full mb-4'>
                                <div className="flex gap-2">
                                    <button onClick={changeViewList} className={viewType ? 'bg-main-text-color dark:bg-gray-five p-2 flex items-center justify-center text-gray-seven dark:text-white-one hover:text-main-c hover:bg-blue-one' : 'bg-blue-one p-2 flex items-center justify-center text-main-c hover:text-main-c hover:bg-blue-one'}><span className="material-symbols-outlined text-[25px] leading-[24px] font-extralight">reorder</span></button>
                                    <button onClick={changeViewGrid} className={!viewType ? 'bg-main-text-color dark:bg-gray-five p-2 flex items-center justify-center text-gray-seven dark:text-white-one hover:text-main-c hover:bg-blue-one' : 'bg-blue-one p-2 flex items-center justify-center text-main-c hover:text-main-c hover:bg-blue-one'}><span className="material-symbols-outlined text-[25px] leading-[24px] font-extralight">grid_view</span></button>
                                </div>
                            </div>

                            {viewType ?
                                <div className="flex flex-wrap gap-3">
                                    {
                                        folders.map(folder => (

                                            <FolderGrid key={folder.id} id={folder.id} title={folder.carpeta} asuntos={folder.procesos} notas={folder.notas.length} />
                                        ))
                                    }
                                    <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full ml-3 my-auto cursor-pointer">
                                        <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                            add
                                        </span>
                                    </a>
                                </div>
                                :
                                <div className="flex flex-col gap-3 w-full mt-3">
                                    <div className="p-2 flex justify-between">
                                        <a onClick={() => changeOrder()} className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer'>
                                            Nombre
                                            <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                                                sort_by_alpha
                                            </span>
                                        </a>
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer'>
                                            Asuntos
                                            <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                                                sort_by_alpha
                                            </span>
                                        </a>
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer'>
                                            Notas
                                            <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                                                sort_by_alpha
                                            </span>
                                        </a>
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-center leading-[12px] gap-4 cursor-pointer'>
                                            Fecha
                                            <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                                                sort_by_alpha
                                            </span>
                                        </a>
                                    </div>
                                    {
                                        nameSort.map(folder => (
                                            <FolderList key={folder.id} id={folder.id} title={folder.carpeta} asuntos={folder.procesos} fecha={folder.fecha_creacion} notas={folder.notas.length} />
                                        ))
                                    }
                                    <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full ml-3 my-auto cursor-pointer">
                                        <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                            add
                                        </span>
                                    </a>
                                </div>
                            }
                        </div>
                    )}

            <Modal title="Crear carpeta" isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <AddFolderForm />
            </Modal>
        </div>
    )
}