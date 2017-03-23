class InvertedIndex {

  readFile(file, fileName) {
    this.file = file;
    const validJson = /.+\.json$/;

    if (!validJson.exec(fileName)) {
      return false;
    }

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (fileBeingRead) => {
        const fileContent = fileBeingRead.target.result;

        try {
          JSON.parse(fileContent);
        } catch (err) {
          reject('This JSON file is invalid. Check the file and try again.');
        }

        resolve(fileContent);
      };

      fileReader.readAsText(this.file);
    });
  }

  validateFile(file) {
    this.file = file;
    this.file.forEach((doc) => {
      if (!(Object.prototype.hasOwnProperty.call(doc, 'title') && Object.prototype.hasOwnProperty.call(doc, 'text'))) {
        throw new Error('Your JSON file does not have the expected format. Documents are to have title and text keys alone.');
      }
    });

    return this.file;
  }

  splitText(text) {
    this.text = text;
    return this.text.split(' ');
  }

  tokenize(file) {
    const validWord = /[a-zA-Z]+/;
    this.file = file;
    let words = [];

    if (typeof (this.file) === 'object') {
      for (let i = 0; i < this.file.length; i += 1) {
        words = words.concat(this.splitText(this.file[i].text));
      }

      const validWordsArray = [];

      for (let i = 0; i < words.length; i += 1) {
        const isValidWord = validWord.exec(words[i]);

        if (isValidWord) {
          validWordsArray.push(isValidWord[0]);
        }
      }

      // make the words in array unique and sort them
      return [...new Set(validWordsArray)].sort();
    }

    else if (typeof (this.file) === 'string') {
      const wordsInString = this.splitText(this.file);

      for (let i = 0; i < wordsInString.length; i += 1) {
        const isValidWord = validWord.exec(wordsInString[i]);

        if (isValidWord) {
          words.push(isValidWord[0]);
        }
      }

      return words;
    }
  }

  getTitles(file) {
    this.file = file;
    const titles = [];
    const texts = [];

    for (let i = 0; i < this.file.length; i += 1) {
      let fileTitle = this.file[i].title;

      if (texts.indexOf(this.file[i].text) === -1) {
        if (titles.indexOf(fileTitle) !== -1) {
          fileTitle += ' - Copy';
        }
        titles.push(fileTitle);
      } else if (titles.indexOf(fileTitle) === -1) {
        titles.push(fileTitle);
      }

      texts.push(this.file[i].text);
    }

    return titles;
  }

  lowerDocText(file) {
    this.file = file;
    this.file.forEach((doc) => {
      const eachDoc = doc;
      eachDoc.text = eachDoc.text.toLowerCase();
    });

    return this.file;
  }

  createIndex(fileName, fileContent) {
    if (!localStorage.indexedDocs) {
      localStorage.indexedDocs = JSON.stringify({});
    }

    let fileRead;

    try {
      fileRead = this.lowerDocText(fileContent);
    } catch (err) {
      throw new Error('Invalid file format. Only array of objects can be contained in file.');
    }

    this.validateFile(fileRead);

    const indices = {};
    const words = this.tokenize(fileRead);

    words.forEach((word) => {
      const docsWithWord = [];

      fileRead.forEach((doc, docIndex) => {
        const wordsInDoc = this.tokenize(doc.text);
        if (wordsInDoc.indexOf(word) !== -1) {
          docsWithWord.push(docIndex);
        }
      });

      indices[word] = docsWithWord;
    });

    const indexedDocs = JSON.parse(localStorage.indexedDocs);
    indexedDocs[fileName] = indices;
    localStorage.indexedDocs = JSON.stringify(indexedDocs);
    return [indices, fileName];
  }

  getRecentlyIndexed() {
    let allRecentlyIndexed = Object.keys(JSON.parse(localStorage.indexedDocs));
    allRecentlyIndexed = allRecentlyIndexed.slice(0, 15);
    return allRecentlyIndexed;
  }

  getIndex(fileName) {
    this.fileName = fileName;
    const fileIndices = JSON.parse(localStorage.indexedDocs)[this.fileName];

    return fileIndices;
  }

  buildSearchResult(fileName, searchString) {
    this.fileName = fileName;
    const regex = /[a-zA-Z]+/g;
    const matches = [];
    const searchResults = {};
    let found;
    const indexOfFile = JSON.parse(localStorage.indexedDocs)[this.fileName];

    while (found = regex.exec(searchString)) {
      matches.push(found[0]);
    }

    matches.forEach((searchItem) => {
      searchResults[searchItem] = indexOfFile[searchItem];
    });

    return searchResults;
  }

  searchIndex(fileName, searchString, indexedFiles) {
    this.fileName = fileName;
    this.searchString = searchString.toLowerCase();

    if (this.fileName === 'All Files') {
      const resultForFile = {};
      const allFiles = Object.keys(indexedFiles);

      allFiles.forEach((file) => {
        resultForFile[file] = this.buildSearchResult(file, searchString);
      });

      return resultForFile;
    }

    return this.buildSearchResult(this.fileName, this.searchString);
  }

  deleteIndex(fileName) {
    this.fileName = fileName;
    const fileIndices = JSON.parse(localStorage.indexedDocs);
    delete fileIndices[this.fileName];
    localStorage.indexedDocs = JSON.stringify(fileIndices);
    return 'File index deleted';
  }

}

module.exports = InvertedIndex;
