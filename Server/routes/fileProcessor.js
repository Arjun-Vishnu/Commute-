  var express = require('express');
  var router = express.Router();

  const fs = require('fs');

  const filesToProcess = ['file1.txt', 'file2.txt', 'file3.txt'];

  function processFile(file) {
    console.log(`Processing file: ${file}`);


    setTimeout(() => {
      console.log(`Finished processing file: ${file}`);
    
      processNextFile();
    }, 3000);
  }

  function processNextFile() {
    if (filesToProcess.length > 0) {
      const file = filesToProcess.shift();
      processFile(file);
    } else {
      console.log('All files processed.');
    }
  }
  processNextFile();
  module.exports = router;
