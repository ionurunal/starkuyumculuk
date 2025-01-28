# webp-to-jpg-converter

Bu proje, `.webp` formatındaki görselleri `.jpg` formatına dönüştüren basit bir web tabanlı uygulamadır.

## Kullanım

1. Node.js yüklü olduğundan emin olun.
2. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:
   ```bash
   npm install
   ```
3. Sunucuyu başlatın:
   ```bash
   node server.js
   ```
4. Tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı kullanabilirsiniz.

## Klasör Yapısı

```
webp-to-jpg-converter/
├── server.js
├── public/
│   └── index.html
├── uploads/
├── converted/
└── README.md
```

## Bağımlılıklar

- express
- multer
- sharp
