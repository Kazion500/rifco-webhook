import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3210;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  console.log(req.body);
  const {
    addressLine1,
    addressLine2,
    TaskId,
    city,
    province,
    postalCode,
    firstName,
    lastName,
  } = req.body;

  try {
    res.sendStatus(200);
    const address = `${firstName} ${lastName}, ${addressLine1}, ${addressLine2}, ${city}, ${province}, ${postalCode}`;
    const response = await axios(
      `https://mcx7-y7gmyxh3r68hjq35gqpswl1.pub.sfmc-content.com/b3vv3sh0j2x?TaskId=${TaskId}&ShipToAddress=${address}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
