import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.status(200).json({ ok: true });
});

app.listen(3333, () => console.log("Server is running on port 3333!"));
