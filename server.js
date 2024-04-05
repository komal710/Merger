// 

const express = require('express');
const path = require('path');
const multer = require('multer');

// Importing and setting up the PDFMerger module
let PDFMerger;
let merger;
let mergerPdfs;

(async () => {
  const pdfMergerModule = await import('pdf-merger-js');
  PDFMerger = pdfMergerModule.default || pdfMergerModule;
  merger = new PDFMerger();

  mergerPdfs = async (p1, p2) => {
    await merger.add(p1); //whole file
    await merger.add(p2);
    let d = new Date().getTime()
    await merger.save(`public/${d}.pdf`);
    return d
  }
})();

// Setting up Express.js
const app = express();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 100 * 1024 * 1024 } });
app.use('/static', express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Template/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files);
  let d =await mergerPdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/static/${d}.dpf`)
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
