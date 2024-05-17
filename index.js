
import express from 'express';
import { createConnection } from 'mysql';
const PORT = process.env.PORT || 3306;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = createConnection({
    host: 'b07vwt9uzfdragdolvqs-mysql.services.clever-cloud.com',
    user: 'uqkpvhekymqe2fuk',
    password: 'KC2GWtvabnfPhNvuyRFs',
    database: 'b07vwt9uzfdragdolvqs',
});

db.on('error', (err) => {
    console.error('Error connecting to the database:', err.stack);
});



app.get("/card", (req, res) => {
    db.query("SELECT * FROM `Example Table 1`", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }

        if (!result) {
            res.send("No data found");
        }
    })
})

app.post('/post', (req, res) => {
    const id = req.body.id;
    const name = req.body.Name;
    const cvv = req.body.CVV;
    const expirationDate = req.body.ExpirationDate;
    const cardNumber = req.body.CardNumber;

    const date = new Date(expirationDate);
    const formattedExpirationDate = date.toISOString().split('T')[0];

    db.query('INSERT INTO `Example Table 1` VALUES (?, ?, ?, ?, ?)', [id, name, cvv, formattedExpirationDate, cardNumber], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Inserted");
        }
    })
});


app.put('/update/:id', (req, res) => {
    const id = req.body.id;
    const name = req.body.Name;
    const cvv = req.body.CVV;
    const expirationDate = req.body.ExpirationDate;
    const cardNumber = req.body.CardNumber;

    const date = new Date(expirationDate);
    const formattedExpirationDate = date.toISOString().split('T')[0];

    db.query('UPDATE `Example Table 1` SET `Name` = ?, `CVV` = ?, `ExpirationDate` = ?, `CardNumber` = ? WHERE `id` = ?', [name, cvv, formattedExpirationDate, cardNumber, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Updated");
        }
    })

})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM `Example Table 1` WHERE `id` = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting value");
        } else {
            res.send("Value Deleted");
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});