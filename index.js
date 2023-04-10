const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// ******************************** SERVICES **************************************

app.get('/services', (req, res, next) => {
    const filePath = path.join(__dirname, 'data', 'newServices.json');

    console.log(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } 

        res.json(JSON.parse(data));
    })
})

app.put('/editservices', (req, res, next) => {
    const { id } = req.body;

    if (id) { 
        const filePath = path.join(__dirname, 'data', 'newServices.json');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            } 

            const dataArray = JSON.parse(data);
    
            const serviceIndex = dataArray.findIndex(service => service.id === id);

            console.log(serviceIndex);


            const updatedData = [...dataArray];
            updatedData[serviceIndex] = req.body;
        
            fs.writeFileSync(filePath, JSON.stringify(updatedData), err => {
                console.log(err);
            });
        })
    }
})

// ******************************** LOCATIONS **************************************

app.get('/locations', (req, res, next) => {
    const filePath = path.join(__dirname, 'data', 'newLocations.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } 

        res.json(JSON.parse(data));
    })
})

app.put('/editlocation', (req, res, next) => {
    const { Siruta } = req.body;

    if (Siruta) { 
        const filePath = path.join(__dirname, 'data', 'newLocations.json');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            } 

            const dataObject = JSON.parse(data);

            const updatedData = {...dataObject}
            updatedData[Siruta] = req.body;

            fs.writeFileSync(filePath, JSON.stringify(updatedData), err => {
                console.log(err);
            });
        })
    }
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running!`);
});