const div = document.querySelector(".wrapper");
const main = document.querySelector("main");

const URL = "http://127.0.0.1:3000/cars";

async function getData() {
  const res = await fetch(URL);
  const data = await res.json();

  div.innerHTML = "";

  data.forEach((car) => generateCar(car));
}

function generateCar(car) {
  const containerDiv = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = car.title;

  const image = document.createElement("img");
  image.setAttribute("src", car.image);

  const price = document.createElement("p");
  price.textContent = car.price;

  const numberplate = document.createElement("p");
  numberplate.textContent = car.numberplate;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  const carId = car.id;
  deleteButton.addEventListener("click", () => {
    deleteButtonHandler(carId);
  });

  containerDiv.append(title, image, price, numberplate, deleteButton);
  div.append(containerDiv);
  main.append(div);
}

async function deleteButtonHandler(id) {
  const res = await fetch(URL + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res;
  console.log(data);
  getData();
}

getData();
