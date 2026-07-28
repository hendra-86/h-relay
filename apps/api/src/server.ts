import 'dotenv/config';

import app from './app.js';
import { gracefulShutdown } from './bootstrap/graceful.js';

const PORT = Number(process.env.PORT ?? 3000);

const server = app.listen(PORT, () => {
  console.log(`🚀 H-Relay API running on http://localhost:${PORT}`);
});

gracefulShutdown(server);