import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image"
import 'material-symbols';
import { deleteCookies } from "../api/auth/logout/route";

export default function LoginForm() {

    const [error, setError] = useState("");
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    //LAS CREDENCIALES DE ACCESO
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    //PARA LOS INPUTS DE USERNAME Y PASSWORD
    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        setError('');
    }

    //PARA LA ACCION DELFORMULARIO
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const { data } = await axios.post('/api/auth/login', credentials);

        if (data.access) {
            setError(''); //eliminar el error de credenciales del formulario
            router.push('/desktop'); //redireccionar al dashboard
        } else {
            deleteCookies();
            setError('Credenciales incorrectas'); //mostrar el error de credenciales en el formulario
            setLoading(false);
            setCredentials({
                username: '',
                password: ''
            })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="max-w-full">
                <div className={
                    (error === '') ?
                        "mt-2 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full"
                        :
                        "mt-2 flex bg-error items-center pr-4 rounded max-w-full"
                }>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={credentials.username}
                        autoComplete="username"
                        placeholder="Nombre de usuario"
                        className={
                            (error === '') ?
                                "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color bg-main-text-color dark:bg-main-c  placeholder:text-main-c placeholder:dark:text-main-text-color sm:text-sm sm:leading-6 focus:outline-0 focus:ring-0"
                                :
                                "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color bg-error placeholder:text-secundary-c sm:text-sm sm:leading-6 focus:outline-0"
                        }
                        onChange={handleChange}
                    />
                    <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                        person
                    </span>
                </div>
            </div>

            <div className="max-w-full">
                <div className={
                    (error === '') ?
                        "mt-2 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full text-main-c dark:text-main-text-color"
                        :
                        "mt-2 flex bg-error items-center pr-4 rounded max-w-full"
                }
                >
                    <input
                        id="password"
                        name="password"
                        type={visible ? "text" : "password"}
                        required
                        value={credentials.password}
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        className={
                            (error === '') ?
                                "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color sm:text-sm sm:leading-6 focus:outline-0"
                                :
                                "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-error placeholder:text-secundary-c sm:text-sm sm:leading-6 focus:outline-0"
                        }
                        onChange={handleChange}
                    />
                    <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px] cursor-pointer" onClick={() => setVisible(!visible)}>
                        {visible ? "visibility_off" : "visibility"}
                    </span>

                </div>
            </div>

            {
                error && (
                    <p className="flex gap-1 text-main-c dark:text-white items-center">
                        <span>
                            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.8 12.6L8 0.599999L15.2 12.6H0.8ZM2.91667 11.4H13.0833L8 2.93333L2.91667 11.4ZM8 10.6C8.16667 10.6 8.30556 10.5444 8.41667 10.4333C8.53889 10.3111 8.6 10.1667 8.6 10C8.6 9.83333 8.53889 9.69444 8.41667 9.58333C8.30556 9.46111 8.16667 9.4 8 9.4C7.83333 9.4 7.68889 9.46111 7.56667 9.58333C7.45556 9.69444 7.4 9.83333 7.4 10C7.4 10.1667 7.45556 10.3111 7.56667 10.4333C7.68889 10.5444 7.83333 10.6 8 10.6ZM7.4 8.6H8.6V5.4H7.4V8.6Z" fill="#FF0000" />
                            </svg>
                        </span>
                        {error}
                    </p>
                )
            }

            <div className="max-w-full">
                {
                    (loading === false) ?
                        <button
                            type="submit"
                            className="text-secundary-c mt-12 flex justify-center bg-blue-one p-3 text-[15px] w-[220px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                        >
                            Ingresar
                        </button>

                        :
                        <Image
                            src="/loading.svg"
                            alt="loading"
                            width={100}
                            height={100}
                            priority
                        />
                }

            </div>
        </form>
    )
}