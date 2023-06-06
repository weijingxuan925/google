process.on('uncaughtException', (err) => {
    console.error('An uncaught exception occurred:');
    console.error(err);
    // Perform any necessary cleanup or logging
    process.exit(1);
  });
  
  // Simulate an uncaught exception
  throw new Error('Oops! Something went wrong.');
  