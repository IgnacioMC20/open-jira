import { db } from "../../../database";
import { Entry } from "../../../models";
import { status } from "../../../context/constants"


export default function (req, res) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);

        case 'POST':
            return postEntries(req, res);

        case 'PUT':
            return 

        default: 
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}

const getEntries = async (res) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();
    return res.status(200).json(entries);

}

const postEntries = async (req, res) => {

    const { description = '' } = req.body;

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
        status: status.pending,
    });

    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();
        return res.status(201).json(newEntry);
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(400).json({ message: 'Algo salio mal, revisar la consola del servidor' });
    }
}