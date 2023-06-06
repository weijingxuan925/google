const fs = require('fs');

function readJsonFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read JSON file:', err.message);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      console.log('JSON file contents:', jsonData);
    } 
    catch (parseError) {
      console.error('Failed to parse JSON:', parseError.message);
    }
  });
}

// Usage example
readJsonFile('data.json');
console.log('Reading JSON file...');
