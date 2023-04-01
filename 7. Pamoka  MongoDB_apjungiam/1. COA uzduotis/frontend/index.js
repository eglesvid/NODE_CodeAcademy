const HOST = "http://127.0.0.1:3000";
const petsTable = document.querySelector("table");
const ageHeader = document.querySelector("#age-header");
const buttons = document.querySelectorAll("button");

ageHeader.addEventListener("click", ageHandler);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", buttonHandler);
}

function getTypeArr() {
  const typeArr = [];
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("highlighted")) {
      typeArr.push(buttons[i].textContent);
    }
  }
  return typeArr;
}

async function buttonHandler(e) {
  e.target.classList.toggle("highlighted");
  if (ageHandler.textContent === "Age(asc)") {
    getPets("desc", getTypeArr());
  } else {
    getPets("asc", getTypeArr());
  }
}

async function ageHandler(e) {
  const textContent = e.target.textContent;

  if (textContent === "Age(asc)") {
    e.target.textContent = "Age(desc)";
    getPets("desc", getTypeArr());
  } else {
    e.target.textContent = "Age(asc)";
    getPets("asc", getTypeArr());
  }
}

async function getPets(order, typeList) {
  //1. darom req i backend
  const res = await fetch(
    HOST + `/pets?order=${order}&typeList=${typeList.join(",")}`
  );
  const pets = await res.json();
  clearTable();
  pets.forEach((pet) => generateTableEntry(pet));
}

//2. pets pasiimam, dabar sugeneruokim table

function generateTableEntry(entry) {
  const tr = document.createElement("tr");
  const nameTd = document.createElement("td");
  nameTd.textContent = entry.name;
  const typeTd = document.createElement("td");
  typeTd.textContent = entry.type;
  const ageTd = document.createElement("td");
  ageTd.textContent = entry.age;

  tr.append(nameTd, typeTd, ageTd);
  petsTable.append(tr);
}

function clearTable() {
  const allTrElements = document.querySelectorAll("tr");

  for (let i = 1; i < allTrElements.length; i++) {
    console.log(allTrElements[i]);
    allTrElements[i].remove();
  }
}

getPets("asc", ["Dog", "Cat"]);
