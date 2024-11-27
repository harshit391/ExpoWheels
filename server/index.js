import express from 'express';

const app = express();

// app.use("/", express.static("./../frontend/dist"))

app.get("/", (req, res) => {
    res.send({message: "Hello World!"});
});

app.listen(8081, () => {
    console.log('Server is running on port http://localhost:8081');
})