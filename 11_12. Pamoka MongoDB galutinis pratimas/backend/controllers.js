import Service from "./models/serviceModel.js";
import User from "./models/userModel.js";
import mongoose from "mongoose";

export async function getAllMemberships(req, res) {
  try {
    const memberships = await Service.find({});

    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createMembership(req, res) {
  try {
    const { name, price, description } = req.body;
    const membership = {
      name,
      price,
      description,
    };

    const membershipRes = await Service.create(membership);

    res.json(membershipRes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteMembership(req, res) {
  try {
    const { id } = req.params;

    const resp = await Service.findByIdAndDelete(id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const { name, surname, email, service_id } = req.body;
    const user = {
      name,
      surname,
      email,
      service_id,
    };

    const userRes = await User.create(user);

    res.json(userRes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
