import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from "react";
import Moment from 'moment';
import axios from "axios";
import ReactMarkdown from 'react-markdown'

export default function NotesList({ id, text, fecha, from, fromname }: any) {

    const [isCopied, setIsCopied] = useState(false);

    //Mostrar notificacion de cpiado
    const showCopied = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);

    }

    //descargar documento
    const downloadTxtFile = (id: any, e: any) => {
        const element = document.createElement("a");
        const file = new Blob([e], { type: 'text/plain' });;
        element.href = URL.createObjectURL(file);
        element.download = `${id}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    //eliminar nota
    const deleteNote = async (id: any, text: any) => {
        const deleteParam = { key: 'id_nota', keyTwo: 'nota', paramId: id, paramTwo: text };
        await axios.delete('/api/auth/deleteNote', { data: deleteParam });
        window.location.reload();
    }

    //eliminar nota si viene de carpeta
    const deleteNoteFolder = async (id: any, parametro: any, from: any) => {
        const deleteParam = { key: 'nota_id', keyTwo: from, paramId: id, paramTwo: parametro };
        await axios.delete('/api/auth/deleteNoteFolder', { data: deleteParam });
        window.location.reload();
    }

    //eliminar nota si viene de proceso
    const deleteNoteProcess = async (id: any, parametro: any, from: any) => {
        const deleteParam = { key: 'nota_id', keyTwo: from, paramId: id, paramTwo: parametro };
        await axios.delete('/api/auth/deleteNoteProcess', { data: deleteParam });
        window.location.reload();
    }

    return (
        <div className='bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex justify-between items-start gap-16'>
            <div className='p-1 flex-1 gap-2 items-center'>
                <div className='text-[17px] text-gray-seven dark:text-white-one'>
                    {
                        text.split("\n\n").map(function (item: any, idx: any) {
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
            <div className='p-1 flex-1 gap-2 items-center'>
                <p className='text-gray-six text-[17px] flex-1'><span>{Moment(fecha).format('DD/MM/yy hh:mm')}</span></p>
            </div>
            <div className='p-2 text-gray-six text-[25px] leading-[16px] flex-1 flex justify-end gap-2'>
                <CopyToClipboard text={text} onCopy={() => showCopied()}>
                    <span className="material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center cursor-pointer hover:text-white">file_copy</span>
                </CopyToClipboard>
                <span onClick={() => downloadTxtFile(id, text)} className="cursor-pointer material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center hover:text-white">download</span>

                {
                    from === 'carpeta' ?
                        <span onClick={() => deleteNoteFolder(id, fromname, from)} className="cursor-pointer material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center hover:text-white">delete</span>
                        : from === 'id_proceso' ?
                            <span onClick={() => deleteNoteProcess(id, fromname, from)} className="cursor-pointer material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center hover:text-white">delete</span>
                            :
                            <span onClick={() => deleteNote(id, text)} className="cursor-pointer material-symbols-outlined text-[25px] leading-[25px] text-gray-two text-center hover:text-white">delete</span>
                }



            </div>
            {(isCopied) ?
                (
                    <div className='absolute bg-overlay rounded py-4 px-4 text-center w-[150px] top-[30%] left-[50%] mr-[-150px]'>
                        <span className="material-symbols-outlined text-[25px] leading-[25px] text-blue-one text-center cursor-pointer">done_all</span>
                        <p>Copiado al portapapeles</p>
                    </div>
                ) : (
                    ''
                )
            }
        </div>
    )
}