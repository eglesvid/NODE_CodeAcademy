// Si funkcija patikrina ar ID yra skaicius
export function validateId(req, res, next) {
  const id = req.params.id;

  // Patikriname ar musu konvertuotas skaicius yra NaN (Not a Number)
  // Jei taip tada stabdom tolimesni kodo vykdima ir siunciam res su atitinkama zinute

  if (isNumber(id)) {
    // Jei id yra skaicius tada toliau vykdome savo koda
    next();
  } else {
    res.status(400).json({
      message: `Invalid ID: ${id}`,
    });
  }
}
// Funkcija kuri patikrina ar viskas ka siuncia car bodyje yar teisinga
export function validateCarBody(req, res, next) {
  const { title, image, price, numberplates } = req.body;

  if (
    // Tikrinam ar title yra NEskaicius
    typeof title === "string" &&
    // Tikrinam ar image url yra NEskaicius
    typeof image === "string" &&
    // Tikrinam ar price yra skaicius
    isNumber(price) &&
    typeof numberplates === "string" &&
    // Tikrinam ar numberplate yra 6 characters
    numberplates.length === 6
  ) {
    next();
  } else {
    res.status(400).json({
      message: "Invalid request body",
    });
  }
}

// Pagalbine funkcija kurios neeksportuoju, nes ji naudojama tik siame faile
// Aprasiau sita funkcija, nes daugiau negu vienoje vietoje reikia tikrinti ar parametras yra skaicius.
// Tokiu budu mums nereikes to paties kodo rasyti kelis kartus
function isNumber(value) {
  // konvertuoja i skaiciu, nes is parametru visada ateina string.
  const converted = +value;
  // jei konvertuojam kazka kas nera skaicius gauname rezultata NaN (Not a Number)
  console.log(converted);
  // Iskonsoline pamatysim, kad NaN tipas yra number :))))
  // Tai yra vienas is JS nelogisku dalyku kuriuos, deje, tiesiog reikia atsiminti
  console.log(typeof converted);

  // Dar vienas keista js dalykas. jei i sita if irasytumeme converted===NaN bet kokiu atveju gautumeme false reiksme.
  // Kad tai patasyti js komanda sukure funkcija isNaN() vietoj to, kad padarytu normaliai veikianti palyginima.
  // Tad jei norim, patikrinti ar skaicius yra NaN reikia naudoti funkcija isNaN()
  return isNaN(converted) ? false : true;
}
