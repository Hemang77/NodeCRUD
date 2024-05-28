const express = require('express');
const bodyparser = require('body-parser');

const { connect } = require('./mongoConnection');
async function fetchData() {

    try {
        const db = await connect();
        const collection = db.collection('test');
        const documents = await collection.find({}).toArray();
        return documents;
    } catch (e) {
        console.log(e);
    }
}

async function addData(data) {

    try {
        const db = await connect();
        const collection = db.collection('test');
        const documents = await collection.insertOne(data);
        return documents;
    } catch (e) {
        console.log(e);
    }
}

async function deleteData(name) {

    try {
        const db = await connect();
        const collection = db.collection('test');
        const documents = await collection.deleteOne({ name });
        return documents;
    } catch (e) {
        console.log(e);
    }
}

async function updateData(name, city) {

    try {
        const db = await connect();
        const collection = db.collection('test');
        const documents = await collection.findOneAndUpdate({ name }, { $set: { city } });
        return documents;
    } catch (e) {
        console.log(e);
    }
}

const app = express();
app.use(bodyparser.json());

app.listen(8080, () => {
    console.log('Server is running on 8080');
});


app.get('/users', async (req, res) => {
    return res.json(await fetchData());
})

app.put('/user', async (req, res) => {
    await addData(req.body);
    return res.status(201).send();
})

app.delete('/user', async (req, res) => {
    await deleteData(req.body.name);
    return res.json({ status: "ok" })
})

app.post('/user', async (req, res) => {
    const { city, name } = req.body;
    await updateData(name, city);
    return res.json({ city })
})



