import Shepherd from "shepherd.js";

export const dashboardTour = () => {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      scrollTo: false,
      classes: "walkthrough shepherd-theme-arrows",
    },
  });

  tour.addStep({
    id: "stepOne",
    arrow: true,
    text:
      "<p class='walkthrough__text text-gray-five text-[14px]'>Revisa el resumen de las actividades destacadas de tu cuenta.</p>",
    attachTo: {
      element: "#menu-item-1",
      on: "right",
    },
    classes: "bg-white p-2 rounded w-[220px]",
    buttons: [
      {
        classes: "btn--skip text-gray-five text-[14px]",
        text: "Omitir",
        action: () => {
          tour.cancel();
        },
      },
      {
        classes: "btn--next text-gray-five text-[14px] bg-blue-one px-2 py-1 flex gap-1 items-center",
        text: 'Siguiente <span class="material-symbols-outlined">multiple_stop</span>',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "stepTwo",
    arrow: true,
    text:
      "<p class='walkthrough__text text-gray-five text-[14px]'>Crea carpetas y sube documentos para que sean procesados por Noctua® Ai.</p>",
    attachTo: {
      element: "#menu-item-2",
      on: "right",
    },
    classes: "bg-white p-2 rounded w-[220px]",
    buttons: [
      {
        classes: "btn--skip text-gray-five text-[14px]",
        text: "Omitir",
        action: () => {
          tour.cancel();
        },
      },
      {
        classes: "btn--next text-gray-five text-[14px] bg-blue-one px-2 py-1 flex gap-1 items-center",
        text: 'Siguiente <span class="material-symbols-outlined">multiple_stop</span>',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "stepThree",
    arrow: true,
    text:
      "<p class='walkthrough__text text-gray-five text-[14px]'>Tu asistente, que te apoyará en todo momento, en cualquier proceso judicial con Inteligencia Artificial Generativa.</p>",
    attachTo: {
      element: "#menu-item-3",
      on: "right",
    },
    classes: "bg-white p-2 rounded w-[220px]",
    buttons: [
      {
        classes: "btn--skip text-gray-five text-[14px]",
        text: "Omitir",
        action: () => {
          tour.cancel();
        },
      },
      {
        classes: "btn--next text-gray-five text-[14px] bg-blue-one px-2 py-1 flex gap-1 items-center",
        text: 'Siguiente <span class="material-symbols-outlined">multiple_stop</span>',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "stepFour",
    arrow: true,
    text:
      "<p class='walkthrough__text text-gray-five text-[14px]'>Consulta todas las actividades que se han realizado en tu cuenta.</p>",
    attachTo: {
      element: "#menu-item-4",
      on: "right",
    },
    classes: "bg-white p-2 rounded w-[220px]",
    buttons: [
      {
        classes: "btn--skip text-gray-five text-[14px]",
        text: "Omitir",
        action: () => {
          tour.cancel();
        },
      },
      {
        classes: "btn--next text-gray-five text-[14px] bg-blue-one px-2 py-1 flex gap-1 items-center",
        text: 'Siguiente <span class="material-symbols-outlined">multiple_stop</span>',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "stepFive",
    arrow: true,
    text:
      "<p class='walkthrough__text text-gray-five text-[14px]'>Guarda y consulta información relevante en cualquier momento.</p>",
    attachTo: {
      element: "#menu-item-5",
      on: "right",
    },
    classes: "bg-white p-2 rounded w-[220px]",
    buttons: [
      {
        classes: "btn--skip text-gray-five text-[14px]",
        text: "Omitir",
        action: () => {
          tour.cancel();
        },
      },
      {
        classes: "btn--next text-gray-five text-[14px] bg-blue-one px-2 py-1 flex gap-1 items-center",
        text: 'Siguiente <span class="material-symbols-outlined">multiple_stop</span>',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: "stepSix",
    arrow: true,
    text:
      "<p class='walkthrough__text text-gray-five text-[14px]'>Configura tu cuenta y obtén información relevante.</p>",
    attachTo: {
      element: "#menu-item-6",
      on: "right",
    },
    classes: "bg-white p-2 rounded w-[220px]",
    buttons: [
      {
        classes: "btn--skip text-gray-five text-[14px]",
        text: "Omitir",
        action: () => {
          tour.cancel();
        },
      },
      {
        classes: "btn--next text-gray-five text-[14px] bg-blue-one px-2 py-1 flex gap-1 items-center",
        text: 'Siguiente <span class="material-symbols-outlined">multiple_stop</span>',
        action: () => {
            tour.cancel();
        }, 
      },
    ],
  });

  return { tour: tour };
};