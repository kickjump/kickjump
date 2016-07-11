import 'colors';
import { Cli as commandLine } from 'cucumber';

const cli = commandLine(process.argv);

cli.run(success => {
  const code = success ? 0 : 1;

  function exitNow() {
    let message = 'Tests have all passed'.bold.green;

    if (code) {
      message = 'Failure(s) in tests'.bold.red;
    }

    // eslint-disable-next-line no-console
    console.log(message);
  }

  if (process.stdout.write('')) {
    exitNow();
  } else {
    process.stdout.on('drain', exitNow);
  }
});
