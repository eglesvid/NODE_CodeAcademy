import Person from "./PeopleModel.js";

export async function getAllPeople(req, res) {
  try {
    const people = await Person.find();

    res.json(people);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

export async function addNewPerson(req, res) {
  try {
    const { name, lastName, age } = req.body;

    const person = {
      name,
      lastName,
      age,
    };

    const personDB = await Person.create(person);

    res.json(personDB);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
