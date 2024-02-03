let YEAR = new Date().getFullYear();
let MONTH = new Date().getMonth() + 1;
const TODAY = new Date().getDate();

let selectedDate = {
  year: YEAR,
  month: MONTH,
  date: TODAY,
};

let EVENTS = JSON.parse(localStorage.getItem("EVENTS")) || [];
let tasks = [];

let selectedDateString = "";

const colors = [
  {
    name: "red",
    color: "#ffe4e6",
    dark: "#e11d48",
  },
  {
    name: "orange",
    color: "#ffedd5",
    dark: "#ea580c",
  },
  {
    name: "yellow",
    color: "#fef3c7",
    dark: "#d97706",
  },
  {
    name: "blue",
    color: "#dbeafe",
    dark: "#2563eb",
  },
  {
    name: "cyan",
    color: "#cffafe",
    dark: "#0891b2",
  },
  {
    name: "green",
    color: "#d1fae5",
    dark: "#059669",
  },
  {
    name: "teal",
    color: "#ccfbf1",
    dark: "#0d9488",
  },
  {
    name: "violet",
    color: "#ede9fe",
    dark: "#7c3aed",
  },
  {
    name: "purple",
    color: "#f3e8ff",
    dark: "#9333ea",
  },
];
const date = new Date(YEAR, MONTH, 0);
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let selectedColor = {
  color: "#d1fae5",
  dark: "#059669",
};

const monthElm = document.querySelector(".month");
const daysElm = document.querySelector(".dates");
const fordBtn = document.querySelector(".ford-btn");
const backBtn = document.querySelector(".back-btn");

fordBtn.addEventListener("click", () => {
  if (MONTH != 12) {
    MONTH++;
  } else {
    MONTH = 1;
    YEAR++;
  }
  showCal();
});
backBtn.addEventListener("click", () => {
  if (MONTH != 1) {
    MONTH--;
  } else {
    MONTH = 12;
    YEAR--;
  }
  showCal();
});

showCal();

function showCal() {
  daysElm.innerHTML = "";
  const date = new Date(YEAR, MONTH, 0);
  const days = date.getDate();
  const currDay = new Date(YEAR, MONTH - 1, 1).getDay();

  for (let i = 1; i < days + 1; i++) {
    const wrapper = document.createElement("div");
    wrapper.className =
      "date-elm text-center w-[30px] h-[30px] hover:bg-gray-200 flex justify-center items-center rounded-full select-none group relative";
    wrapper.innerHTML = i;
    wrapper.innerHTML += `<div class="tip transition-opacity absolute top-[25px] bg-transparent text-transparent p-1 px-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 group-hover:bg-black/70 group-hover:text-white z-[99]"></div>`;
    daysElm.append(wrapper);
  }
  for (let i = 0; i < currDay; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "text-center  w-[30px] h-[30px]";
    wrapper.innerHTML = "";
    daysElm.prepend(wrapper);
  }

  setMonthYear();
  setCurrDate();
  selectDates();
  showDayOnHover();
  showSelectedDate();
  showTimeSchedule();
  setDialogColors();
}

function setDialogColors() {
  const colorsWrapper = document.querySelector(".dia-colors");
  colors.forEach((color) => {
    colorsWrapper.innerHTML += `<div id="${color.name}" style="background-color: ${color.color};border: solid 2px ${color.dark};" class="COLOR h-[30px] aspect-square rounded-full hover:shadow-xl cursor-pointer"></div>`;
  });
  selectColors();
}

function selectColors() {
  const COLORS = document.querySelectorAll(".COLOR");
  COLORS.forEach((col) => {
    col.addEventListener("click", () => {
      COLORS.forEach((c) => c.classList.remove("active"));
      col.classList.add("active");
      colors.forEach((c) => {
        if (c.name === col.id) {
          selectedColor.color = c.color;
          selectedColor.dark = c.dark;
        }
      });
    });
  });
}

function showTimeSchedule() {
  const timeSchedule = document.querySelector(".time-schedule");
  timeSchedule.innerHTML = "";
  for (let i = 1; i <= 24; i++) {
    timeSchedule.innerHTML += `<div class="time-block h-[200px] border-b flex gap-3">
    <div class="time p-3">
      <p class="time-info">${i > 12 ? i - 12 : i} ${
      i < 12 ? "AM" : i === 24 ? "AM" : "PM"
    }</p>
      <button id="addEventBtn" class="text-emerald-600 hover:bg-gray-100 rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.7em"
          height="1.7em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
          />
        </svg>
      </button>
    </div>
    <div class="events relative grow"></div>
  </div>`;
  }

  addEvents();
  displayTasks();
}

const addEventBtn = document.querySelector("#addGlobalEventBtn");
const dialog = document.querySelector("#addTask");

addEventBtn.addEventListener("click", () => {
  addModalFunctions(dialog, null);
});

function addEvents() {
  const addEventBtns = document.querySelectorAll("#addEventBtn");
  addEventBtns.forEach((a) => {
    a.addEventListener("click", (e) => {
      addModalFunctions(
        dialog,
        e.target.parentElement.parentElement.innerText,
        e.target.parentElement.parentElement
      );
    });
  });
}

const currTasks = [];
const overflowHHs = [];

function addModalFunctions(dialog, timeText) {
  dialog.showModal();
  const fromTime = document.querySelector("#from-time");
  const toTime = document.querySelector("#to-time");

  fromTime.value = "01:00";
  toTime.value = "01:59";

  if (timeText) {
    const minTime = convertTo24HourFormat(timeText) + ":00";
    const maxTime = convertTo24HourFormat(timeText) + ":59";
    fromTime.setAttribute("min", minTime);
    fromTime.setAttribute("max", maxTime);
    toTime.setAttribute("min", minTime);
    toTime.setAttribute("max", maxTime);
    fromTime.value = minTime;
    toTime.value = maxTime;
  }

  fromTime.addEventListener("input", (e) => {
    if (toHH < fromHH) {
      toTime.value = fromTime.value;
    }
  });

  toTime.addEventListener("input", (e) => {
    if (toHH < fromHH) {
      toTime.value = fromTime.value;
    }
  });
  setInterval(() => {
    const mins1 =
      parseInt(fromTime.value.split(":")[0]) * 60 +
      parseInt(fromTime.value.split(":")[1]);
    const mins2 =
      parseInt(toTime.value.split(":")[0]) * 60 +
      parseInt(toTime.value.split(":")[1]);
    if (mins1 > mins2) {
      toTime.value = `${
        toTime.value.split(":")[0] + ":" + fromTime.value.split(":")[1]
      }`;
    }
  });
}

const subBtn = document.querySelector("#submit");

subBtn.addEventListener("click", (e) => {
  addTask();
});

function addTask() {
  const fromTime = document.querySelector("#from-time");
  const toTime = document.querySelector("#to-time");
  let toTimeMins = parseInt(toTime.value.split(":")[1]);
  let fromTimeMins = parseInt(fromTime.value.split(":")[1]);
  let fromTimeHH = parseInt(fromTime.value.split(":")[0]);
  let toTimeHH = parseInt(toTime.value.split(":")[0]);

  const mins = (toTimeHH - 1) * 59 + toTimeMins;
  const y = (200 / 59) * ((fromTimeHH - 1) * 59 + fromTimeMins);
  const height = (200 / 59) * mins - y;

  const title = document.querySelector("#title-time");
  const desc = document.querySelector("#desc-time");

  EVENTS.forEach((e) => {
    if (e.name === selectedDateString) {
      e.events.push({
        left: 70,
        height: height,
        ypos: y,
        fromTime: fromTime.value,
        toTime: toTime.value,
        title: title.value,
        description: desc.innerText,
        mod: false,
        color: selectedColor.color,
        dark: selectedColor.dark,
        id: "Item" + crypto.randomUUID(),
      });
    }
  });

  displayTasks();
  dialog.close();
}

function displayTasks() {
  document.querySelectorAll(".event").forEach((e) => e.remove());
  let currElm = null;

  EVENTS.forEach((e) => {
    if (e.name === selectedDateString && e.events.length != 0) {
      e.events.forEach((t) => {
        document.querySelector(".time-schedule").innerHTML += `<div id="${
          t.id
        }" style="background-color: ${t.color}; border-left:solid 5px ${
          t.dark
        }; color: ${
          t.dark
        }" class="event m-[2px] font-semibold trans overflow-auto absolute w-[100px] min-h-[50px] h-[${
          t.height - 2
        }px] top-[${t.ypos}px] left-[${t.left}px] p-3 rounded-lg w-full">${
          t.fromTime
        } - ${t.toTime} ${t.title}</div>
        </div>`;
        currElm = document.querySelector(`#${t.id}`);
      });
      e.events[0].mod = true;
    }
  });

  setInterval(() => {
    if (currElm) {
      document.querySelectorAll(".event").forEach((e) => {
        EVENTS.forEach((f) => {
          if (f.name === selectedDateString) {
            if (f.events.length > 1 && e != currElm) {
              const b = e.getBoundingClientRect();
              const a = currElm.getBoundingClientRect();
              const style = window.getComputedStyle(currElm),
                left = parseInt(style.getPropertyValue("left"));
              if (hasCollided(a, b)) {
                currElm.style.left = left + 101 + "px";
              } else {
                f.events.forEach((t) => {
                  if (t.id === currElm.id && !t.mod) {
                    t.left = left;
                    t.mod = true;
                  }
                });
              }
            }
          }
        });
      });
    }
  });

  localStorage.setItem("EVENTS", JSON.stringify(EVENTS));
  addEvents();
  eventOptions();
}

function hasCollided(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

function convertTo24HourFormat(timeString) {
  const match = timeString.match(/(\d+)[^\d]?([APMapm]{2})/);

  if (!match) {
    return "Invalid time format";
  }

  let hour = parseInt(match[1], 10);
  const period = match[2].toUpperCase();

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  const result = hour.toString().padStart(2, "0");
  return result;
}

function showSelectedDate() {
  const selectedDateText = document.querySelector(".selected-date-text");
  const selectedDay = document.querySelector(".selected-day");
  selectedDateText.innerText = `${selectedDate.date} ${
    MONTHS[selectedDate.month - 1]
  } ${selectedDate.year}`;
  selectedDay.innerText =
    DAYS[
      new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.date
      ).getDay()
    ];

  selectedDateString = selectedDateText.innerText;

  EVENTS.forEach((e) => {
    if (e.events.length === 0) {
      EVENTS = EVENTS.filter((f) => f != e);
    }
  });

  if (EVENTS.length === 0) {
    EVENTS.push({
      name: selectedDateString,
      events: [],
    });
  } else {
    EVENTS.forEach((e) => {
      if (e.name !== selectedDateString) {
        EVENTS.push({
          name: selectedDateString,
          events: [],
        });
      }
    });
  }
}

function showDayOnHover() {
  const dateElm = document.querySelectorAll(".date-elm");

  dateElm.forEach((d) => {
    const hovered = parseInt(d.innerText);
    const day = new Date(YEAR, MONTH - 1, parseInt(hovered)).getDay();
    d.addEventListener("mouseenter", () => {
      d.querySelector(".tip").innerHTML = DAYS[day];
    });
  });
}

function setCurrDate() {
  const dateElm = document.querySelectorAll(".date-elm");
  const currMONTH = new Date().getMonth() + 1;
  const currYEAR = new Date().getFullYear();

  dateElm.forEach((d) => {
    if (
      d.innerText === TODAY.toString() &&
      currMONTH === MONTH &&
      currYEAR === YEAR
    ) {
      selectedDate.date = parseInt(d.innerText);
      d.id = "today";
      d.classList.remove("hover:bg-gray-200");
      d.classList.add("text-white");
      d.classList.add("bg-emerald-700");
      d.classList.add("hover:bg-emerald-800");
    }
  });
}

function selectDates() {
  const dateElm = document.querySelectorAll(".date-elm");

  dateElm.forEach((d) => {
    d.addEventListener("click", () => {
      dateElm.forEach((d) => {
        if (d.id != "today") {
          d.classList.add("hover:bg-gray-200");
          d.classList.remove("text-white");
          d.classList.remove("bg-emerald-500");
          d.classList.remove("hover:bg-emerald-600");
        }
      });
      if (d.id != "today") {
        selectedDate.date = parseInt(d.innerText);

        (selectedDate.year = YEAR), (selectedDate.month = MONTH);
        showSelectedDate();
        showTimeSchedule();
        d.classList.remove("hover:bg-gray-200");
        d.classList.toggle("text-white");
        d.classList.toggle("bg-emerald-500");
        d.classList.toggle("hover:bg-emerald-600");
      } else {
        selectedDate = {
          year: YEAR,
          month: MONTH,
          date: TODAY,
        };
        showSelectedDate();
        showTimeSchedule();
      }
    });
  });
}

function setMonthYear() {
  monthElm.innerHTML = MONTHS[MONTH - 1] + " " + YEAR;
}

function eventOptions() {
  document.querySelectorAll(".event").forEach((ev) => {
    ev.addEventListener("contextmenu", (e) => {
      console.log(ev);
      e.preventDefault();
      const eventMenu = document.querySelector(".event-menu");

      eventMenu.classList.toggle("hidden");
      eventMenu.style.left = e.clientX + "px";
      eventMenu.style.top = e.clientY + "px";

      const delEv = document.querySelector("#deleteMenu");
      const editEv = document.querySelector("#editMenu");

      delEv.addEventListener("click", () => {
        EVENTS.forEach((f) => {
          f.events.forEach((a) => {
            if (a.id === ev.id) {
              deleteEvent(a);
            }
          });
        });
      });
      editEv.addEventListener("click", () => {
        EVENTS.forEach((f) => {
          f.events.forEach((a) => {
            if (a.id === ev.id) {
              const edit = prompt("Edit:")
              editEvent(a, edit);
            }
          });
        });
      });
    });
  });
  
  document.addEventListener("click", (e) => {
    if (!e.target.contains(document.querySelector(".event-menu"))) {
      const eventMenu = document.querySelector(".event-menu");

      eventMenu.classList.add("hidden");
    }
  });
}

function editEvent(evnt, edited) {
  EVENTS.forEach((ev) => {
    if (ev.name === selectedDateString) {
      ev.events.forEach(f =>{
        if(f === evnt){
          f.title = edited
        }
      })
    }
  });
  displayTasks();
}

function deleteEvent(event) {
  EVENTS.forEach((ev) => {
    if (ev.name === selectedDateString) {
      ev.events = ev.events.filter((f) => f != event);
    }
  });
  displayTasks();
}
