import Order from "../models/OrderModel.js";
import Client from "../models/ClientModel.js";
import mongoose from "mongoose";

export async function createNewClient(req, res) {
  try {
    const { name, lastName } = req.body;
    const client = {
      name,
      lastName,
    };

    const clientRes = await Client.create(client); //irasom i db

    res.json(clientRes);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function addNewOrder(req, res) {
  try {
    const { clientId } = req.params;
    const { name, price } = req.body;
    // sukurti nauja orderi
    // orderi prideti prie client

    const order = await Order.create({
      name,
      price,
      clientId: mongoose.Types.ObjectId(clientId),
    }); //reik pridet clientId, kuris daro order

    //dabar sita orderi reik pridet prie kliento. Principe reikia pasiimti ta klienta pagal id is db ir ji paupdateint
    const client = await Client.findById(clientId);
    client.orders.push(mongoose.Types.ObjectId(order._id)); //su sita eilute padarem pakeitimus lokaliai tik
    client.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getUserWithAllHisOrders(req, res) {
  try {
    const { id } = req.params;
    const client = await Client.findById(id).populate("orders");
    //be populate gaunam orders su id. Jei noretume atvaizduoti kad ir frontende klienta ir jo visus orderius, galetume padaryti uzklausa i sita endpoint'a, kad gautume sita klienta ir jo orderiu id ir tada daryti kelias uzklausas, kad gauti jo visus orderius. Bet tai butu db isnaudojimas, too many requests. Mums uztenka viena maza pakeitima padaryt savo controllers. Populate nurodom, kuriuos fields norim uzpildyt. Vietoj to, kad buvo tik id, prisidejo pilni orderiai, su savo info. Dabar mes galim padaryt tik 1 requesta i db ir ji kind of apjungia abi lenteles ir duoda mums iskart normalia, simple info, su kuria galim dirbt
    //tarkim pasiimu viena klienta ir jeigu noriu supopulateinti ne tik orderius, bet ir pvz lankymosi istorija, kur butu dar vienas collection, tai mes rasytume ("orders orderhistory") (sitie pavadinimai yra grn field'u pavadinimai is schemos)

    res.json(client);
  } catch (error) {
    res.status(500).json({ error });
  }
}
