import express from "express";
import User from "../db/userModel.js";
import dotenv from "dotenv";

dotenv.config();
const JSON_URI = process.env.JSON_URI;

export async function getUserIdAndName(req, res) {
  try {
    const mongoRequest = User.find(
      {},
      { email: false, address: false, __v: false }
    );
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderUsers = await placeholderResponse.json();

    const serializedMongoUsers = mongoResponse.map((user) => ({
      id: user._id,
      name: user.name,
    }));

    const serializedPlaceholderUsers = placeholderUsers.map((user) => ({
      id: user.id,
      name: user.name,
    }));

    res.json([...serializedMongoUsers, ...serializedPlaceholderUsers]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserIdAndNameAndEmail(req, res) {
  try {
    const mongoRequest = User.find({}, { address: false, __v: false });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderUsers = await placeholderResponse.json();

    const serializedMongoUsers = mongoResponse.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }));

    const serializedPlaceholderUsers = placeholderUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    res.json([...serializedMongoUsers, ...serializedPlaceholderUsers]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserIdAndNameAndAddress(req, res) {
  try {
    const mongoRequest = User.find({}, { email: false, __v: false });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderUsers = await placeholderResponse.json();

    const serializedMongoUsers = mongoResponse.map((user) => ({
      id: user._id,
      name: user.name,
      address: user.address,
    }));

    const serializedPlaceholderUsers = placeholderUsers.map((user) => ({
      id: user.id,
      name: user.name,
      address: `${user.address.street}, ${user.address.city}`,
    }));

    res.json([...serializedMongoUsers, ...serializedPlaceholderUsers]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllUsersFromMongoDB(req, res) {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postUserIntoMongoDB(req, res) {
  try {
    const { name, email, address } = req.body;

    const user = await User.create({
      name,
      email,
      address,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
