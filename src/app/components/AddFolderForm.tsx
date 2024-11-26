import { useEffect, useState } from "react"
import axios from "axios";
import Image from "next/image"

const tabsData = [
    {
        label: 'Añadir carpeta',
        content: 'add-form',
    },
    {
        label: 'Cargar carpeta',
        content: 'load-form',
    },
];

export default function AddFolderForm() {

    const [success, setSuccess] = useState(false);
    const [enabler, setEnabler] = useState(false);
    const [folder, setFolder] = useState('');
    const [drive, setDrive] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [subjectType, setSubjectType] = useState(''); 
    const [arrSubjectType, setArrSubjectType] = useState<any[]>([])

    useEffect(() => {
        getType();
    }, [])

    //get the subject type
    const getType = async () => {
        const { data } = await axios.get('/api/auth/type');
        setArrSubjectType(data);
    }

    const handleChange = (e: any) => {
        setEnabler(true);
        setFolder(e.target.value);
    }

    const handleURL = (e: any) => {
        setEnabler(true);
        setDrive(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);

        const saveParam = { key: 'carpeta', paramId: folder, urlSlug: 'api/creaCarpeta' };
        await axios.post('/api/auth/endpoint', saveParam).then(response => {
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        });
    }

    const handleLoad = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);

        const saveParam = { key: 'carpeta', paramId: folder, keyQuestion: 'linkDrive', paramPregunta: drive, keyThird: 'tipoProceso', paramThird: subjectType, urlSlug: 'api/cargaCarpeta' };
        await axios.post('/api/auth/endpoint', saveParam).then(response => {
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        });
    }

    const handleType = (e: any) => {
        setSubjectType(e.target.value);
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
                            <p className="text-center text-main-c dark:text-main-text-color text-custom-regular">La carpeta ha sido creada.</p>
                        </div>
                        :
                        <>
                            <div className="flex space-x-3 border-b">
                                {tabsData.map((tab, idx) => {
                                    return (
                                        <button
                                            key={idx}
                                            className={`py-2 border-b-4 transition-colors duration-300 ${idx === activeTabIndex
                                                ? 'border-teal-500'
                                                : 'border-transparent hover:border-gray-200'
                                                }`}
                                            // Change the active tab on click.
                                            onClick={() => setActiveTabIndex(idx)}
                                        >
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Show active tab content. */}
                            <div className="py-4">
                                {
                                    tabsData[activeTabIndex].content === 'add-form' ?
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Escribe el nombre de la carpeta"
                                                    className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                                                    onChange={handleChange}
                                                />
                                                <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                                                    folder
                                                </span>
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
                                                        Crear Carpeta
                                                    </button>
                                                }
                                            </div>
                                        </form>
                                        :
                                        <form onSubmit={handleLoad}>
                                            <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Escribe el nombre de la carpeta"
                                                    className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                                                    onChange={handleChange}
                                                />
                                                <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                                                    folder
                                                </span>
                                            </div>
                                            <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Escriba la url de drive para cargar la carpeta"
                                                    className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                                                    onChange={handleURL}
                                                />
                                                <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                                                    cloud_upload
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
                                                    <option value="">Selecciona el tipo</option>
                                                    {arrSubjectType.map(stype => (
                                                        <option key={stype.tipo_proceso} value={stype.tipo_proceso}>{stype.desc_tipo_proceso}</option>
                                                    ))}
                                                </select>
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
                                                        Cargar Carpeta
                                                    </button>
                                                }
                                            </div>
                                        </form>
                                }
                            </div>
                        </>
            }
        </div>
    );
}