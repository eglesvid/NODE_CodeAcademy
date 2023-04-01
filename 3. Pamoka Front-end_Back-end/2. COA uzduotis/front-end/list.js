const ulNameList = document.querySelector("ul");

async function getNames() {
  const res = await fetch("http://127.0.0.1:3000/");
  const data = await res.json();

  // buvo taip:
  // data.forEach((name) => {
  //   const li = document.createElement("li");
  //   li.textContent = name;
  //   ulNameList.append(li);
  // })
  //
  // dabar pas musu name yra nebe tiesiog string, o objektas, kuriame yra du parametrai (name, surname), todel logiskiau pakeist i person:

  data.forEach((person) => {
    const li = document.createElement("li");
    li.textContent = `name: ${person.name} surname: ${person.surname}`;
    ulNameList.append(li);
  });
}

getNames();
