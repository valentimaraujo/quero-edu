import './util/module-alias';
import { SetupServer } from '@src/server';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
  try {
    const server = new SetupServer();
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          await server.close();
          console.info('App exited with success!');
          process.exit(ExitStatus.Success);
        } catch (error) {
          console.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (err) {
    console.error(`App exited with error: ${err}`);
    process.exit(ExitStatus.Failure);
  }
})();
