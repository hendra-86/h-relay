import { Server } from 'node:http';

export function gracefulShutdown(server: Server): void {
  const shutdown = (signal: string) => {
    console.log(`📴 Received ${signal}, shutting down...`);

    server.close(() => {
      console.log('✅ HTTP server stopped.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('❌ Force shutdown.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}