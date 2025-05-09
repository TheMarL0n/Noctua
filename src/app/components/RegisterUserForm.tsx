import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function RegisterUserForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [enabler, setEnabler] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  
  const handleName = (e: any) => {
    setName(e.target.value);
    setError('')
  };

  const handleLastname = (e: any) => {
    setLastname(e.target.value);
    setError('')
  };

  const handleEmail = (e: any) => {
    setMail(e.target.value);
    setEnabler(true);
    setError('')
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const resumeParam = {
      keyQuestion: "first_name",
      paramPregunta: name,

      keyThird: "last_name",
      paramThird: lastname,

      keyFourth: "email",
      paramFourth: mail,

      urlSlug: "altaUsuario",
    };

    await axios
      .post("/api/auth/endpoint", resumeParam)
      .then((response) => {
        setSuccess(true);
        setError('')
        setSuccessMessage(
          "Usuario ha sido registrado satisfactoriamente"
        );
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setSuccess(false);
        setLoading(false);
        setError("El nombre de usuario proporcionado ya se encuentra registrado");
      });
  };

  return (
    <div>
      {success ? (
        <div className="flex flex-col items-center justify-center mb-6">
          <span className="material-symbols-outlined text-blue-one text-[90px] text-center">
            check
          </span>
          <p className="text-center text-main-c dark:text-main-text-color text-custom-regular">
            {successMessage}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div
            className={
              error === ""
                ? "mt-2 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full"
                : "mt-2 flex bg-error items-center pr-4 rounded max-w-full"
            }
          >
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Nombre"
              value={name}
              className={
                error === ""
                  ? "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color sm:text-sm sm:leading-6 focus:outline-0"
                  : "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-error placeholder:text-white sm:text-sm sm:leading-6 focus:outline-0"
              }
              onChange={handleName}
            />
            <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
              person
            </span>
          </div>

          <div
            className={
              error === ""
                ? "mt-2 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full"
                : "mt-2 flex bg-error items-center pr-4 rounded max-w-full"
            }
          >
            <input
              id="lastname"
              name="lastname"
              type="text"
              required
              autoComplete="lastname"
              placeholder="Apellido"
              value={lastname}
              className={
                error === ""
                  ? "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color sm:text-sm sm:leading-6 focus:outline-0"
                  : "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-error placeholder:text-white sm:text-sm sm:leading-6 focus:outline-0"
              }
              onChange={handleLastname}
            />
            <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
              person
            </span>
          </div>

          <div
            className={
              error === ""
                ? "mt-2 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full"
                : "mt-2 flex bg-error items-center pr-4 rounded max-w-full"
            }
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Correo"
              value={mail}
              className={
                error === ""
                  ? "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color sm:text-sm sm:leading-6 focus:outline-0"
                  : "block w-full border-0 rounded px-3 py-4 text-main-c dark:text-main-text-color shadow-sm bg-error placeholder:text-white sm:text-sm sm:leading-6 focus:outline-0"
              }
              onChange={handleEmail}
            />
            <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
              email
            </span>
          </div>

          {error && (
            <p className="flex gap-1 text-main-c dark:text-white items-center text-[12.5px] mt-1">
              <span>
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.8 12.6L8 0.599999L15.2 12.6H0.8ZM2.91667 11.4H13.0833L8 2.93333L2.91667 11.4ZM8 10.6C8.16667 10.6 8.30556 10.5444 8.41667 10.4333C8.53889 10.3111 8.6 10.1667 8.6 10C8.6 9.83333 8.53889 9.69444 8.41667 9.58333C8.30556 9.46111 8.16667 9.4 8 9.4C7.83333 9.4 7.68889 9.46111 7.56667 9.58333C7.45556 9.69444 7.4 9.83333 7.4 10C7.4 10.1667 7.45556 10.3111 7.56667 10.4333C7.68889 10.5444 7.83333 10.6 8 10.6ZM7.4 8.6H8.6V5.4H7.4V8.6Z"
                    fill="#FF0000"
                  />
                </svg>
              </span>
              {error}
            </p>
          )}

          {enabler ? (
            loading === false ? (
              <div className="flex justify-between items-end">
                <button className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-secundary-c mt-12 ml-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                >
                  Ingresar
                </button>
              </div>
            ) : (
              <Image
                src="/loading.svg"
                alt="loading"
                width={100}
                height={100}
                priority
                className="mx-auto"
              />
            )
          ) : (
            <div className="flex justify-between items-end">
              <button className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one">
                Cancelar
              </button>
              <button
                disabled
                className="text-gray-one mt-12 ml-auto flex justify-center bg-gray-two py-3 px-14 text-[15px]"
              >
                Enviar
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
