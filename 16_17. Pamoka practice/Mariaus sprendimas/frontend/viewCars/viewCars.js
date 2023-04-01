const HOST = "http://127.0.0.1:3000/cars";
const main = document.querySelector("main");

async function fetchAllCars() {
  try {
    const res = await fetch(HOST);
    const cars = await res.json();
    return cars;
  } catch (error) {
    alert(error);
  }
}

const cars = await fetchAllCars();
generateCarsHtml(cars);

function generateCarsHtml(cars) {
  cars.forEach((car) => {
    const { id, title, image, price, numberplates } = car;

    const containerDiv = document.createElement("div");
    const numberplatesHeader = document.createElement("h3");
    numberplatesHeader.textContent = numberplates;
    const titlePar = document.createElement("p");
    titlePar.textContent = title;
    titlePar.classList.add("car-title");
    const carImage = document.createElement("img");
    carImage.src = image;
    const pricePar = document.createElement("p");
    pricePar.textContent = price;
    const hr = document.createElement("hr");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.id = id;
    deleteButton.addEventListener("click", deleteButtonHandler);

    containerDiv.append(numberplatesHeader, titlePar, carImage, pricePar, hr, deleteButton);
    main.append(containerDiv);
  });
}

async function deleteButtonHandler(e) {
  try {
    const id = e.target.id;
    const res = await fetch(`${HOST}/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      const divToDelete = e.target.parentElement;
      main.removeChild(divToDelete);
    }
  } catch (error) {
    alert(error.message);
  }
}
