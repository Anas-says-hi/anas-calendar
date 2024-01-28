let YEAR = 2024;
let MONTH = 3;

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
monthElm.innerHTML = months[date.getMonth()] + " " + date.getFullYear();

const currDay = new Date(2024, MONTH - 1, 1).getDay();
// console.log(currDay)
// console.log(currDay)

for (let i = 1; i < days + 1; i++) {
  const wrapper = document.createElement("div");
  wrapper.className = "text-center";
  wrapper.innerHTML = i;
  daysElm.append(wrapper);
}

for (let i = 0; i < currDay; i++) {
  const wrapper = document.createElement("div");
  wrapper.className = "text-center  w-[20px] h-[20px]";
  wrapper.innerHTML = "";
  daysElm.prepend(wrapper);
}
