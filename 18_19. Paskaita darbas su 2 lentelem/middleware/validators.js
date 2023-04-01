export function validateId(req, res, next) {
  const { id } = req.params;

  //1. dalykas, kuri norim patikrinti, ar sitas ID yra skaicius (kadangi db visad kaip int issisaugo), o mes is params visad gaunam stringa. Todel konvertuojam:
  // mes negalim "labas" konvertuot i skaiciu, gautume NaN. Reikes patikrinti, ar konvertavus nera NaN
  const convertedId = +id;
  //   console.log(convertedId);
  //   console.log(typeof convertedId);
  //   console.log(isNaN(convertedId));

  //Vienas is JS nelogisku dalyku: NaN irgi yra number. Jei parasyciau if (typeof convertedId === "number"), t. y. patikrinciau, ar sito convertedId pasidare number. Bet typeof NaN yra number!!xd Todel toks if parasymo variantas mums netinkamas.
  //Todel JS vietoj to, kad issprestu sita problema ir NaN padarytu kokiu kitu tipu, sukure pagalbine f-ija, kuri patikrina, ar skaicius yra NaN - isNaN()
  //400 reiskia bad request (abstraktus kodas. Gali reiksti ne tik, kad kazka ne taip suvedei, bet kartu ir kad i pvz params ar body ne taip suvedei)
  //isInteger() pagalbine f-ija
  if (
    !isNumber(convertedId) ||
    convertedId < 1 ||
    !Number.isInteger(convertedId)
  ) {
    res.status(400).json({ message: `Invalid id: ${id}` });
  } else {
    next();
  }
}

export function validateOrderBody(req, res, next) {
  const { description, price } = req.body;

  if (!isOrderBodyValid(description, price)) {
    res.status(400).json({ message: `Invalid body` });
  } else {
    next();
  }
}

export function validateCustomerBody(req, res, next) {
  const { name, address, phone } = req.body;

  if (isNumber(name) || isNumber(address) || !isNumber(phone)) {
    res.status(400).json({ message: `Invalid request body` });
  } else {
    next();
  }
}

export function validateOrderBodyBulk(req, res, next) {
  const { data } = req.body;
  let isValid = true;

  if (!Array.isArray(data)) {
    isValid = false; //jeigu tai yra ne array, tuomet uzdedam, kad nevalidu
  } else {
    data.forEach((element) => {
      if (!isOrderBodyValid(element.description, element.price)) {
        isValid = false;
        console.log(isValid);
      }
    });
  }

  if (isValid) {
    next();
  } else {
    res.status(400).json({ message: "Invalid request body" });
  }
}

function isOrderBodyValid(description, price) {
  const convertedPrice = +price;
  if (isNumber(description) || !isNumber(price) || convertedPrice < 0) {
    return false;
  } else {
    return true;
  }
}

//parasom pagalbine f-ija. Stengiames gale arba pradzioj sita f-ija pasirasyt, ne vidury. Jos neeksportuojam, ji pagalbine siame faile
function isNumber(value) {
  const numberValue = +value; //is pradziu konvertuojam tai, ka mum paduoda

  return isNaN(numberValue) ? false : true;
  // rasom ternary vietoj sito:
  //   if (isNaN(numberValue)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
}
