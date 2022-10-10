import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry } from "../../../models";

export default function (req, res) {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido ' + id });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);

        case 'GET':
            return getEntry(req, res);

        default:
            return res.status(400).json({ message: 'Metodo no existe' });
    }
}

const updateEntry = async (req, res) => {

    const { id } = req.query;
    await db.connect();
    const entryToUpdate = Entry.findById(id);

    if (!entryToUpdate) {
        await db.disconnect();
        return res.json({ message: 'No hay entrada con ese ID:' + id });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        return res.status(201).json(updatedEntry);

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'bad request' });
    }

}

const getEntry = async (req, res) => {

    const { id } = req.query;
    await db.connect();
    const entryToUpdate = Entry.findById(id);

    if (!entryToUpdate) {
        await db.disconnect();
        return res.json({ message: 'No hay entrada con ese ID:' + id });
    }

    try {
        const entry = await Entry.findById(id);
        await db.disconnect();
        return res.status(201).json(entry);

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'bad request' });
    }

}