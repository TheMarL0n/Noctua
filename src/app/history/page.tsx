"use client";
import "material-symbols";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function History() {
  
  const user = localStorage.getItem('current-user');
  const historySS: [] = JSON.parse(localStorage.getItem(`history-${user}`) ?? "[]");
  const [items, setItems] = useState(historySS);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [order, setOrder] = useState(false);

  //para el drag and drop-------------------------------
  const dragItem = useRef<number>(0);
  const dragOverItem = useRef<number>(0);

  const handleSort = () => {
    const itemClone = [...items];
    const temp = itemClone[dragItem.current];
    itemClone[dragItem.current] = itemClone[dragOverItem.current];
    itemClone[dragOverItem.current] = temp;
    setItems(itemClone);
    localStorage.setItem(`history-${user}`, JSON.stringify(itemClone));
  };

  //Cambiar el orden del listado (Sort)--------------------------------------------------------------------------------------------------
  const changeOrder = () => {
    setIsSorted(true);
    setOrder(!order);
  };
  const sortedList = items
    .slice()
    .sort(
      order === false
        ? (a, b) => (a.pregunta < b.pregunta ? 1 : -1)
        : (a, b) => (a.pregunta > b.pregunta ? 1 : -1)
    );

  return (
    <div className="page-body py-2 px-4 w-full min-h-full">
      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-seven dark:text-white-one text-[22px] capitalize flex items-center gap-2">
            <span className="material-symbols-outlined">account_circle</span>
            {user}
          </h3>
        </div>
      </div>

      <div className="breadcumb mt-3">
        <div className="flex items-center text-custom-regular text-gray-seven dark:text-white-one gap-2">
          <Link href={"/dashboard"}>
            <span className="material-symbols-outlined text-[16px] text-blue-one font-extralight">
              hard_drive
            </span>{" "}
            Historial
          </Link>{" "}
          /
        </div>
      </div>

      <hr className="h-[1px] border-0 w-full bg-gray-three my-4" />

      {historySS.length === 0 ? (
        <div className="folders-list flex flex-col items-center justify-center mt-40">
          <span className="material-symbols-outlined text-[128px] text-gray-three">
            pace
          </span>
          <h2 className="text-gray-three text-[36px] my-4">
            No hay entradas en este historial
          </h2>
          <p className="text-custom-regular text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-warning text-[16px]">
              warning
            </span>{" "}
            Usa la Noctua® y aquí podrás ver las acciones realizadas{" "}
          </p>
        </div>
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <a
              onClick={() => changeOrder()}
              className="flex-1 text-[12px] text-gray-seven dark:text-white-one flex items-start leading-[12px] gap-12 cursor-pointer"
            >
              Ordenar alfabéticamente
              <span className="material-symbols-outlined text-[16px] text-gray-seven dark:text-white-one">
                sort_by_alpha
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-3 w-full mt-3">
            {!isSorted
              ? items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex justify-between items-center"
                    draggable
                    onDragStart={() => (dragItem.current = idx)}
                    onDragEnter={() => (dragOverItem.current = idx)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="p-1 flex gap-2 items-center flex-1">
                      <span className="cursor-pointer material-symbols-outlined text-[25px] leading-[20px] text-gray-seven dark:text-white-one text-center">
                        drag_indicator
                      </span>
                      <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-seven dark:text-white-one text-center">
                        chat
                      </span>
                      <p className="text-[17px] text-gray-seven dark:text-white-one">
                        {item.pregunta}
                      </p>
                    </div>
                  </div>
                ))
              : sortedList.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-main-text-color dark:bg-gray-five rounded-lg px-2 flex justify-between items-center"
                  >
                    <div className="p-1 flex gap-2 items-center flex-1">
                      <span className="material-symbols-outlined text-[25px] leading-[20px] text-gray-seven dark:text-white-one text-center">
                        chat
                      </span>
                      <p className="text-[17px] text-gray-seven dark:text-white-one">
                        {item.pregunta}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}
