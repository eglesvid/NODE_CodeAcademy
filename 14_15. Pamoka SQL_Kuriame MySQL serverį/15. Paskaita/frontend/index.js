const main = document.querySelector("main");

// {
//     "totalPages": 2,
//     "data": [
//         {
//             "id": 11,
//             "description": "some random gum",
//             "price": "1.1",
//             "title": "Orbit gum"
//         }
//     ]
// }

async function getProducts(page) {
  const res = await fetch(
    `http://127.0.0.1:3000/products/pagination?page=${page}&size=7`
  ); //pradzioj crashino, nes nepadavem jokio page ir size
  const data = await res.json();

  clearMain();
  data.data.forEach((product) => generateProduct(product));
  generatePageButtons(data.totalPages);
}

function generatePageButtons(amount) {
  for (let i = 0; i < amount; i++) {
    const button = document.createElement("button");
    button.textContent = i + 1; //kad 0 pasidarytu 1-tu, nes psl skaiciuojam nuo 1
    button.id = i + 1; //kad zinotume, kurio psl mum reik
    button.addEventListener("click", pageButtonHandler); //jeigu parasau skliaustelius prie funkcijos, as iskart iskvieciu ja. Jeigu neparasau, tada nurodau, kokia funkcija noriu iskviest, kai event ivyks
    main.append(button);
  }
}

function pageButtonHandler(e) {
  //is mygtuko norim siust req i db su nurodymais, kelinto psl noresim
  //is pradziu reik zinot, kelinto psl norim

  const id = e.target.id;
  getProducts(id);
}

function clearMain() {
  main.innerHTML = "";
}

function generateProduct(product) {
  const containerDiv = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = product.title;
  const description = document.createElement("p");
  description.textContent = product.description;
  const price = document.createElement("h6");
  price.textContent = product.price;

  containerDiv.append(title, price, description);
  main.append(containerDiv);
}

getProducts(1);
