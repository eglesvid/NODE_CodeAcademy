import Categories from "./models/categoryModel.js";
import Product from "./models/productModel.js";

export async function getCategoryValue(req, res) {
  //1) pasiimam visas kategorijas, jas findinam, ir pasigetinam visus products. Product reik dar ir uzpopulatint, kad suzinotume, kokios jis yra kategorijos
  try {
    const products = await Product.find({}).populate(
      "categoryId",
      { title: true },
      "categories"
    );

    //2) eisim per visus products, turesim sumObj ir product ir pradine reiksme bus tuscias objektas. Product yra tsg kiekvienas is musu produktuku
    //Darom check'a, t. y. pasiziurim, ar toj musu reiksmej, kuria mes akumuliuojam, jau yra sukurtas irasas su kategorijos pavadinimu (tas phone arba tablet).
    //Jeigu yra, tai jau bus kazkokia suma irasyta ir ja galim prideti prie jos.
    //Jeigu nera tokio iraso, tai reiskia musu objekte nera ten kokio phone irasyto, tada mes sukuriam phone parametra ir prie jo pridedam price, principe kaip pradine kainos reiksme
    //Ir tada kai toliau vykdosi, jau tas phone kategorija egzistuoja, kurioje yra irasyta kazkokia kaina, tai vykdo sita dali sumObj[product.categoryId.title] += product.price; ir tiesiog prie tos egzistuojancios kainos prideda
    //Ir tada paciam gale returninam ta savo objekta, kad galetu toliau vykti reduce
    const sums = products.reduce((sumObj, product) => {
      if (sumObj[product.categoryId.title]) {
        sumObj[product.categoryId.title] += product.price;
      } else {
        sumObj[product.categoryId.title] = product.price;
      }
      return sumObj; //kad nueitu i kito tipo vykdyma
    }, {});
    res.json(sums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await Categories.find({}); //idedam tuscia objekta, o tai reiskia duok visus, pagal nieka nefiltruok

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllProductsWithCategories(req, res) {
  try {
    const products = await Product.find({}).populate(
      "categoryId",
      { title: true }, //cia nusirodom, kuriuos field turetu grazint (tuscias grazintu visus)
      "categories" //kurioj kitoj collection ieskoti sito id, kuris yra kategorijoj
    ); //stringe nusirodom, ka konkreciai norim, kad uzpopulatintu.
    //jeigu musu categoryModel turetu visus products: [mongoose.Schema.Types.ObjectId] ir musu produktas turetu cateogryId, tada mums nereiktu rasyt sitos dalies: {}, "categories". Uztektu tik "categoryId" parasyt. Bet dabar pas mus tik produktas turi categoryId

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
