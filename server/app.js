const express = require("express");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const jsonFilePath = path.join(__dirname, "data/requests.json");

function loadData() {
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
  const data = JSON.parse(jsonData);

    return data;
}

function saveData(data, jsonFilePath) {
  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error("Errore nel salvataggio:", err);
    } else {
      console.log("File salvato correttamente!");
    }
  });
}

// --- API ---
//API GET 
app.get('/requests', (req, res) => {
  try {
    console.log(`\n---\nRequest:\nGET ${req.originalUrl}\n`);

    const code = req.query["code"];
    const data = loadData();

    const filtered = data.filter(entry => entry.id === code)[0];

    console.log(filtered)

    if(filtered !== undefined){
      response = {
        success: true,
        message: `Request found`,
        results: filtered
      }
    }else{
      response = {
        success: true,
        message: 'No request found',
        results: null
      }
    }

    console.log(`Response:\n${JSON.stringify(response, null, 2)}\n---`);
    res.json(response);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Errore nella lettura dei dati' });
  }
});

app.get('/answer', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'answer.html')
  );
});


// API POST
app.post('/requests', (req, res) => {
  console.log(`\n---\nRequest:\nPOST ${req.originalUrl}`);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  const newRequest = req.body;
  console.log(newRequest)
  const data = loadData();

  data.push(newRequest)

  try {
    saveData(data, jsonFilePath);
    const response = { success: true, message: 'Request sent'};
    console.log(`Response:\n${JSON.stringify(response, null, 2)}\n---`);
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel salvataggio del file' });
  }
});


// API PUT
app.put('/requests/:codice', (req, res) => {
    console.log(`\n---\nRequest:\nPUT ${req.originalUrl}`);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log(req.params)
    const codice = req.params.codice;
    const updated = req.body;
    const data = loadData();
    const index = data.findIndex(r => r.id === codice);

    if (index === -1) return res.status(404).json({ error: 'Request non trovato' });
    data[index] = updated;
    saveData(data, jsonFilePath);

    const response = { success: true, message: 'Request updated'};
    console.log(`Response:\n${JSON.stringify(response, null, 2)}\n---`);
    res.status(200).json(response);
});

// Avvia server
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});