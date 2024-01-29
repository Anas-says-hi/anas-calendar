let YEAR = new Date().getFullYear();
let MONTH = new Date().getMonth() + 1;
const TODAY = new Date().getDate();

const date = new Date(YEAR, MONTH, 0);
const months = [
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
    "date-elm text-center w-[30px] h-[30px] hover:bg-gray-200 flex justify-center items-center rounded-full select-none";
    wrapper.innerHTML = i;
    daysElm.append(wrapper);
  }
  for (let i = 0; i < currDay; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "text-center  w-[30px] h-[30px]";
    wrapper.innerHTML = "";
    daysElm.prepend(wrapper);
  }
  
  setMonthYear()
  setCurrDate()
  selectDates()
}


function setCurrDate(){
  const dateElm = document.querySelectorAll(".date-elm");
  const currMONTH = new Date().getMonth() + 1
  const currYEAR = new Date().getFullYear()
  
  dateElm.forEach((d) => {
    if (d.innerText === TODAY.toString() && currMONTH === MONTH && currYEAR === YEAR) {
      d.classList.remove("hover:bg-gray-200");
      d.classList.toggle("text-white");
      d.classList.toggle("bg-emerald-600");
      d.classList.toggle("hover:bg-emerald-700");
    }
  });
}

function selectDates(){
  const dateElm = document.querySelectorAll(".date-elm");
  
  dateElm.forEach((d) => {
    d.addEventListener("click", () => {
      d.classList.remove("hover:bg-gray-200");
      d.classList.toggle("text-white");
      d.classList.toggle("bg-emerald-600");
      d.classList.toggle("hover:bg-emerald-700");
    });
  });
}

function setMonthYear(){
  monthElm.innerHTML = months[MONTH - 1] + " " + YEAR;
}