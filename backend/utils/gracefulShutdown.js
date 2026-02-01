export const gracefulShutdown = (server) => {
  const shutdown = async (signal, err) => {
    console.error(`\n🔴 Received ${signal}. Shutting down gracefully...`);
    if (err) console.error(err.stack || `${err.name}: ${err.message}`);

    const timeout = setTimeout(() => {
      console.error('🟡 Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);

    server.close((closeErr) => {
      clearTimeout(timeout);
      if (closeErr) {
        console.error('🚩 Error closing server:', closeErr);
        process.exit(1);
      } else {
        console.log('🟢 Closed out remaining connections.');
        process.exit(
          signal === 'unhandledRejection' || signal === 'uncaughtException'
            ? 1
            : 0
        );
      }
    });
  };

  process.on('unhandledRejection', (err) =>
    shutdown('unhandledRejection', err)
  );
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};
