let YEAR = 2024;
let MONTH = 11;

const date = new Date(YEAR, MONTH, 0);
const days = date.getDate();
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
  const currDay = new Date(YEAR, MONTH - 1, 1).getDay();
  monthElm.innerHTML = months[MONTH - 1] + " " + YEAR;
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
