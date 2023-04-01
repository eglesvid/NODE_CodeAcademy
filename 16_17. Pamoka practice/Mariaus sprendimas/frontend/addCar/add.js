const HOST = "http://127.0.0.1:3000/cars";

const title = document.querySelector("#title");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const numberplates = document.querySelector("#numberplates");
const sendButton = document.querySelector("button");

sendButton.addEventListener("click", sendCar);

async function sendCar(e) {
  e.preventDefault();
  try {
    const res = await fetch(HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        image: image.value,
        price: price.value,
        numberplates: numberplates.value,
      }),
    });
    if (res.status === 400) {
      alert("Incorrect data");
    }
  } catch (error) {
    alert(error);
  }
}
