const express = require('express');
const cors = require('cors');
const app = express();
const personasRoutes = require('./routes/personas.routes');

const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('¡API funcionando! 🧩');
});

app.use('/personas', personasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});