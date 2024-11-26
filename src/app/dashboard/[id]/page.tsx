'use client'
import 'material-symbols';
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from '@/app/components/Modal';
import AddSubjectForm from '@/app/components/AddSubjectForm';
import SubjectList from '@/app/components/SubjectList';
import SubjectGrid from '@/app/components/SubjectGrid';
import Link from 'next/link';
import WorkingLoader from '@/app/components/WorkingLoader';

export default function Folder(asuntos: any) {

    const [subjects, setsubjects] = useState<any[]>([]);
    const [folderId, setFolderId] = useState('');
    const [folderName, setFolderName] = useState('');
    const [viewType, setViewType] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [order, setOrder] = useState(false);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [categories, setCategories] = useState({
        EIDM: false,
        Licitaciones: false,
        Resumen: false,
        Carga: false,
        Aclaraciones:false,
        Controversia_Constitucional: false,
        Proyecto_de_Sentencia: false
    });

    const changeViewList = () => { setViewType(false) }
    const changeViewGrid = () => { setViewType(true) }
    const changeOrder = () => { setOrder(!order) }

    useEffect(() => {
        setIsLoading(true);
        getFolder();
    }, [])

    //get the folder detail
    const getFolder = async () => {
        const folderDetailParam = { key: "idCarpeta", paramId: asuntos.params.id, urlSlug: "api/consultaCarpeta" };
        const { data } = await axios.post('/api/auth/endpoint', folderDetailParam);

        setsubjects(data.procesos);
        setFolderId(data.id);
        setFolderName(data.carpeta);
        setUser(data.usuario);
        setIsLoading(false);
    }

    const filterSort = subjects.sort(
        order === false
            ? ((a, b) => a.proceso < b.proceso ? 1 : -1)
            : ((a, b) => a.proceso > b.proceso ? 1 : -1)
    );

    //Manejar los checkbox para el filtrado//////////////////////////////////////////

    const handleChange = (e: any) => {
        setCategories({ ...categories, [e.target.name]: e.target.checked });
    };

    const checkedSubjects = Object.entries(categories)
        .filter((category) => category[1])
        .map((category) => category[0]);

    const filteredSubjects = subjects.filter(({ tipo_proceso }) =>
        checkedSubjects.includes(tipo_proceso)
    );

    /////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="page-body py-2 px-4 w-full min-h-full">
            <div className="w-full mt-4">
                <div className="flex justify-between items-center">
                    <h3 className='text-gray-seven dark:text-white-one text-[22px] capitalize'>
                        {user}
                    </h3>
                    <p className='flex items-center text-custom-regular text-gray-seven dark:text-white-one bg-main-text-color dark:bg-secundary-c rounded-lg py-2 pl-1 pr-6 leading-[16px] cursor-pointer' onClick={() => setIsModalOpen(true)}><span className="material-symbols-outlined text-[30px] font-extralight">add</span> Agregar asunto</p>
                </div>
            </div>
            <div className="breadcumb">
                <div className='flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2'><Link href={'/dashboard'}><span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">hard_drive</span> Archivo</Link> / <Link href={`/dashboard/${folderId}`}>{folderName}</Link></div>
            </div>

            {
                isLoading ?
                    <WorkingLoader />
                    :
                    subjects.length === 0 ?
                        <div className="folders-list flex flex-col items-center justify-center mt-40">
                            <span className="material-symbols-outlined text-[128px] text-gray-three">
                                file_copy_off
                            </span>
                            <h2 className='text-gray-three text-[36px] my-4'>No hay archivos en esta carpeta</h2>
                            <p className='text-custom-regular text-gray-three dark:text-white flex items-center gap-2'><span className="material-symbols-outlined text-warning text-[16px]">warning</span> Consulta a tu administrador o carga un documento ahora.</p>
                            <a onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-[72px] h-[72px] bg-blue-one rounded-full my-5 cursor-pointer">
                                <span className="material-symbols-outlined text-[30px] text-secundary-c font-light">
                                    add
                                </span>
                            </a>
                        </div>
                        :
                        <div className="folders-list flex flex-col items-start justify-start">
                            <hr className='h-[1px] border-0 w-full bg-gray-three my-3' />

                            <div className='flex justify-between w-full'>
                                {/*
                                <form action="">
                                    <div className="flex gap-8">                                    
                                        
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-query" className="text-gray-seven dark:text-white-one text-[12px] uppercase">EIMD</label>
                                            <input
                                                id="1"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="EIDM"
                                                onChange={handleChange}
                                                checked={categories.EIDM}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-tender" className="text-gray-seven dark:text-white-one text-[12px] uppercase">Licitación</label>
                                            <input
                                                id="2"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="Licitaciones"
                                                onChange={handleChange}
                                                checked={categories.Licitaciones} />

                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-summary" className="text-gray-seven dark:text-white-one text-[12px] uppercase">Resumen</label>
                                            <input
                                                id="3"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="Resumen"
                                                onChange={handleChange}
                                                checked={categories.Resumen}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-summary" className="text-gray-seven dark:text-white-one text-[12px] uppercase">Carga</label>
                                            <input
                                                id="4"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="Carga"
                                                onChange={handleChange}
                                                checked={categories.Carga}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-summary" className="text-gray-seven dark:text-white-one text-[12px] uppercase">Aclaraciones</label>
                                            <input
                                                id="4"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="Aclaraciones"
                                                onChange={handleChange}
                                                checked={categories.Aclaraciones}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-summary" className="text-gray-seven dark:text-white-one text-[12px] uppercase">Controversia Constitucional</label>
                                            <input
                                                id="4"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="Controversia Constitucional"
                                                onChange={handleChange}
                                                checked={categories.Controversia_Constitucional}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <label htmlFor="chaeck-summary" className="text-gray-seven dark:text-white-one text-[12px] uppercase">Proyecto de Sentencia</label>
                                            <input
                                                id="4"
                                                className='group block size-4 rounded border-white-one border bg-transparent data-[checked]:bg-blue-500'
                                                type="checkbox"
                                                name="Proyecto de Sentencia"
                                                onChange={handleChange}
                                                checked={categories.Proyecto_de_Sentencia}
                                            />
                                        </div>
                                        
                                    </div>
                                </form>
                                */}
                                <div className="flex gap-2">
                                    <button onClick={changeViewList} className={viewType ? 'bg-main-text-color dark:bg-gray-five p-2 flex items-center justify-center text-gray-seven dark:text-white-one hover:text-main-c hover:bg-blue-one' : 'bg-blue-one p-2 flex items-center justify-center text-main-c hover:text-main-c hover:bg-blue-one'}><span className="material-symbols-outlined text-[25px] leading-[24px] font-extralight">reorder</span></button>
                                    <button onClick={changeViewGrid} className={!viewType ? 'bg-main-text-color dark:bg-gray-five p-2 flex items-center justify-center text-gray-seven dark:text-white-one hover:text-main-c hover:bg-blue-one' : 'bg-blue-one p-2 flex items-center justify-center text-main-c hover:text-main-c hover:bg-blue-one'}><span className="material-symbols-outlined text-[25px] leading-[24px] font-extralight">grid_view</span></button>
                                </div>
                            </div>

                            {viewType ?
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {
                                        filteredSubjects.length !== 0 ?
                                            filteredSubjects.map(subject => (
                                                <SubjectGrid key={subject.id_proceso} id={subject.id_proceso} title={subject.proceso} urlSum={`/dashboard/${folderId}/summary/${subject.id_proceso}`} urlRel={`/dashboard/${folderId}/relevant-points/${subject.id_proceso}`} urlNotas={`/dashboard/${folderId}/notas/${subject.id_proceso}`} thefolder={folderName} />
                                            ))
                                            :
                                            subjects.map(subject => (
                                                <SubjectGrid key={subject.id_proceso} id={subject.id_proceso} title={subject.proceso} urlSum={`/dashboard/${folderId}/summary/${subject.id_proceso}`} urlRel={`/dashboard/${folderId}/relevant-points/${subject.id_proceso}`} urlNotas={`/dashboard/${folderId}/notas/${subject.id_proceso}`} thefolder={folderName} />
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
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'>
                                            Tipo
                                        </a>
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'>
                                            Notas
                                        </a>
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'>
                                            Fecha
                                        </a>
                                        <a className='flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer'>
                                            Estado
                                        </a>
                                    </div>
                                    {

                                        filteredSubjects.length !== 0 ?
                                            filteredSubjects.map(subject => (
                                                <SubjectList key={subject.id_proceso} id={subject.id_proceso} title={subject.proceso} urlSum={`/dashboard/${folderId}/summary/${subject.id_proceso}`} urlRel={`/dashboard/${folderId}/relevant-points/${subject.id_proceso}`} urlNotas={`/dashboard/${folderId}/notas/${subject.id_proceso}`} thefolder={folderName} />
                                            ))
                                            :
                                            filterSort.map(subject => (
                                                <SubjectList key={subject.id_proceso} id={subject.id_proceso} title={subject.proceso} urlSum={`/dashboard/${folderId}/summary/${subject.id_proceso}`} urlRel={`/dashboard/${folderId}/relevant-points/${subject.id_proceso}`} urlNotas={`/dashboard/${folderId}/notas/${subject.id_proceso}`} thefolder={folderName} />
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
            }
            <Modal title="Agregar asunto" isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <AddSubjectForm param_folder={folderName} />
            </Modal>
        </div>
    )
}