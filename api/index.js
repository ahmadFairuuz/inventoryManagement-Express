import app from '../src/app'
export default app;

// Mengapa hal ini dilakukan?

// Vercel mengharuskan semua fungsi serverless diletakkan dalam folder api. File index.js dalam folder api mengimpor aplikasi Express dari kode main (src/app.js) dan mengekspornya sebagai default export, sehingga Vercel dapat menanganinya sebagai fungsi serverless.