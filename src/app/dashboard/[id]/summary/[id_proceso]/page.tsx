'use client'
import 'material-symbols';
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import WorkingLoader from '@/app/components/WorkingLoader';
import Link from 'next/link';

export default function Subject(resumen: any) {

    const [resume, setResume] = useState('');
    const [folder, setFolder] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getResume();
    }, [])

    //get the resume
    const getResume = async () => {
        const resumeParam = { key: 'id_proceso', paramId: resumen.params.id_proceso, urlSlug: "ai/consultaResumen" };
        const { data } = await axios.post('/api/auth/endpoint', resumeParam);
        setResume(data.resumen);
        setFolder(data.carpeta);
        setSubject(data.proceso);
        setLoading(false);
    }

    return (
        <div className="page-body py-2 px-4 w-full min-h-full">
            <div className="w-full my-4">
                <div className="flex justify-between items-center">
                    <div className='flex gap-3 items-center'>
                        <h3 className='text-gray-seven dark:text-white-one text-[22px]'>{subject}</h3>
                    </div>

                    <div className="flex gap-3 items-center">
                    </div>
                </div>
            </div>
            <div className="breadcumb mt-4">
                <div className='flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2'>
                    <Link href={'/dashboard'}><span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">hard_drive</span> Archivo</Link> /
                    <Link href={`/dashboard/${resumen.params.id}`}>{folder}</Link> /
                    <Link href={`/dashboard/${resumen.params.id}/summary/${resumen.params.id_proceso}`}>{subject}</Link>
                </div>
            </div>

            <hr className='h-[1px] border-0 w-full bg-gray-three my-3' />

            {
                (loading === true) ?
                    <WorkingLoader />

                    :
                    <div className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md">
                        <div className="header flex justify-between items-center px-4 py-2">
                            <h2 className='text-[25px] text-gray-five dark:text-main-text-color flex gap-2 items-center'>
                                <span className="material-symbols-outlined text-[32px] text-gray-five dark:text-white font-extralight">
                                    mark_chat_read
                                </span>
                                Resumen del archivo
                            </h2>
                            <div className="flex gap-1 items-center">
                                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">download</span>
                                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">bookmark</span>
                                <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">print</span>
                                <span className="material-symbols-outlined text-white text-[25px]">more_vert</span>
                            </div>
                        </div>

                        <hr className='h-[1px] border-0 w-full bg-gray-three mb-3' />

                        <div className="body px-12 pt-2 pb-6">

                            {
                                resume.split("\n\n").map(function (item: any, idx: any) {
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
            }



        </div>
    )
}