import { useState } from "react"
import axios from "axios";
import Image from "next/image"

export default function AddSubjectForm({ param_folder }: any) {

    const [success, setSuccess] = useState(false);
    const [enabler, setEnabler] = useState(false);
    const [subject, setSubject] = useState('');
    const [subjectType, setSubjectType] = useState('');
    const [theFiles, setTheFiles] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleName = (e: any) => {
        setSubject(e.target.value);
    }
    const handleType = (e: any) => {
        setSubjectType(e.target.value);
    }

    const handleFiles = (e: any) => {
        setEnabler(true);
        if (e.target.files) {
            setTheFiles(e.target.files?.[0])
        }

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);
        
        /////////////////////////////////////////////////////////////////////////////
        if (!theFiles) {
            alert('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('carpeta', param_folder);   
        formData.append('proceso', subject);   
        formData.append('tipoProceso', subjectType);   
        formData.append('archivos', theFiles);     

        /////////////////////////////////////////////////////////////////////////////

       await axios.post('/api/auth/addSubject', formData).then(response => {
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }

    return (
        <div>
            {
                isLoading ?
                    <div className="flex flex-col items-center justify-center mb-6">
                        <Image
                            src="/loading.svg"
                            alt="loading"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    :
                    success ?
                        <div className="flex flex-col items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-blue-one text-[90px] text-center">
                                check
                            </span>
                            <p className="text-center text-main-text-color text-custom-regular">El asunto ha sido creado</p>
                        </div>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Escribe el nombre de tu asunto"
                                    className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                                    onChange={handleName}
                                />
                                <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                                    list_alt
                                </span>
                            </div>

                            <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                                <select
                                    id="name"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-text-color focus:outline-0 focus:ring-0"
                                    onChange={handleType}
                                >
                                    <option value="">Selecciona el tipo de asunto</option>
                                    <option value="Carga">Carga</option>
                                    <option value="Resumen">Resumen</option>
                                    <option value="Licitaciones">Licitaciones</option>
                                    <option value="EIDM">EIDM</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-one border-dashed rounded-lg cursor-pointer bg-main-text-color dark:bg-main-c dark:hover:bg-secundary-c dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    {theFiles !== null ? (
                                        <div className="flex flex-col items-center justify-center p-6">
                                            <span className="material-symbols-outlined text-gray-three text-[90px]">
                                                draft
                                            </span>
                                            <ul className="text-main-c dark:text-main-text-color text-custom-regular text-center">
                                                <li>Nombre: {theFiles.name}</li>
                                                <li>Tipo: {theFiles.type}</li>
                                                <li>Tamaño: {theFiles.size} bytes</li>
                                            </ul>
                                        </div>
                                    )
                                        :
                                        (
                                            <>
                                                <div className="flex flex-col items-center justify-center p-6">
                                                    <span className="material-symbols-outlined text-gray-three text-[90px]">
                                                        note_add
                                                    </span>
                                                    <p className="text-main-c dark:text-main-text-color text-custom-regular text-center">Arrastra tus archivos aquí o selecciona uno de tu <br /> computadora <span className="text-blue-one">aquí</span></p>
                                                    <hr className="h-[1px] bg-gray-two w-full border-0 my-3" />
                                                    <p className="text-main-c dark:text-main-text-color text-[12px] text-center">Puedes subir archivos de Word, Txt y PDF no mayores a 30MB</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFiles} />
                                            </>
                                        )}
                                </label>
                            </div>



                            <div className="flex justify-between">

                                {enabler ?
                                    <button
                                        type="submit"
                                        className="text-secundary-c mt-12 ml-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                                    >
                                        Enviar
                                    </button>
                                    :
                                    <button
                                        disabled
                                        className="text-gray-one mt-12 ml-auto flex justify-center bg-gray-two py-3 px-14 text-[15px]"
                                    >
                                        Crear Asunto
                                    </button>
                                }
                            </div>
                        </form>
            }
        </div>
    );
}