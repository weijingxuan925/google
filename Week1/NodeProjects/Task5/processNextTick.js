console.log('Start');

process.nextTick(() => {
  console.log('Inside nextTick');
});

console.log('End');
