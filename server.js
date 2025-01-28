const express = require('express');
const multer = require('multer');
const { join } = require('path');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const port = 3000;

// Statik dosyalar için klasörü belirleme
app.use(express.static('public'));

// Dosyaların geçici olarak yükleneceği klasör
const upload = multer({ dest: 'uploads/' });

// .webp'den .jpg'ye dönüşüm
app.post('/convert', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('Dosya yüklenmedi.');
  }

  if (!file.originalname.toLowerCase().endsWith('.webp')) {
    return res.status(400).send('Lütfen bir .webp dosyası yükleyin.');
  }

  const outputDir = 'converted';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputFilePath = join(outputDir, `${file.originalname.split('.webp')[0]}.jpg`);

  try {
    await sharp(file.path)
      .jpeg({ quality: 100 })
      .toFile(outputFilePath);

    // Geçici dosyayı sil
    fs.unlinkSync(file.path);

    res.download(outputFilePath, err => {
      if (err) {
        console.error(err);
      }
      // İndirildikten sonra dönüştürülen dosyayı da sil
      fs.unlinkSync(outputFilePath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Bir hata oluştu.');
  }
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
