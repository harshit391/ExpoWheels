import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send({message: "Hello World!"});
});

app.listen(1009, () => {
    console.log('Server is running on port http://localhost:1009');
})