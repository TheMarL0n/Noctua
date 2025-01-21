export default function ErrorScreen(){
    return(
        <div className="folders-list flex flex-col items-center justify-center mt-4 mx-auto">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
          sentiment_dissatisfied
          </span>
          <h2 className="text-gray-three text-[36px] my-4 text-center">
            Lo sentimos, ha ocurrido un error
          </h2>
          <p className="text-custom-regular text-gray-three dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Consulta a tu administrador o intente denuevo mas tarde.
          </p>
        </div>
    )
}