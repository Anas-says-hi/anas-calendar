let YEAR = new Date().getFullYear();
let MONTH = new Date().getMonth() + 1;
const TODAY = new Date().getDate();
let selectedDate = {
  year: YEAR,
  month: MONTH,
  date: TODAY
};
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
  showSelectedDate()
  showTimeSchedule()
}

function showTimeSchedule(){
  const timeSchedule = document.querySelector(".time-schedule")
  for (let i = 1; i < 12; i++) {
    timeSchedule.innerHTML += `          <div class="time-block h-[200px] p-3 border-b">
    <div class="time">${i} AM<br> <button class="text-emerald-600">            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.7em"
      height="1.7em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
      />
    </svg></button></div>
  </div>`
    
  }
}

function showSelectedDate(){
  const selectedDateText = document.querySelector(".selected-date-text") 
  const selectedDay = document.querySelector(".selected-day") 
  selectedDateText.innerText = `${selectedDate.date} ${MONTHS[selectedDate.month - 1]} ${selectedDate.year}`
  selectedDay.innerText = DAYS[new Date(selectedDate.year,selectedDate.month -1 , selectedDate.date).getDay()];

}

function showDayOnHover() {
  const dateElm = document.querySelectorAll(".date-elm");

  dateElm.forEach((d) => {
    const hovered = parseInt(d.innerText);
    const day = new Date(YEAR, MONTH -1 , parseInt(hovered)).getDay();
    d.addEventListener("mouseenter", () => {
      d.querySelector(".tip").innerHTML = DAYS[day]
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
      dateElm.forEach(d=>{
        if(d.id != "today"){
          d.classList.add("hover:bg-gray-200");
          d.classList.remove("text-white");
          d.classList.remove("bg-emerald-500");
          d.classList.remove("hover:bg-emerald-600");
        }
      })
      if (d.id != "today") {
        selectedDate.year = YEAR,
        selectedDate.month = MONTH
        selectedDate.date = parseInt(d.innerText)
        showSelectedDate()
        d.classList.remove("hover:bg-gray-200");
        d.classList.toggle("text-white");
        d.classList.toggle("bg-emerald-500");
        d.classList.toggle("hover:bg-emerald-600");
      }
    });
  });
}

function setMonthYear() {
  monthElm.innerHTML = MONTHS[MONTH - 1] + " " + YEAR;
}
