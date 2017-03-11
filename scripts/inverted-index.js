class InvertedIndex {

  readFile(file) {
    this.file = file;
    const fileReader = new FileReader();
    fileReader.readAsText(this.file);

    fileReader.onload(() => {
      const fileContent = fileReader.result;
      return fileContent;
    });
  }

  validateFile(file) {
    this.file = file;
    this.file.forEach((doc) => {
      if (!(Object.prototype.hasOwnProperty.call(doc, 'title') && Object.prototype.hasOwnProperty.call(doc, 'text'))) {
        throw new Error('Your JSON file does not have the expected format. Documents are to have title and text keys alone');
      }
    });

    return this.file;
  }

  splitText(text) {
    this.text = text;
    return this.text.split(' ');
  }

  tokenize(file) {
    this.file = file;
    const validWord = /[a-zA-Z]+/;
    let words = [];

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

  getTitles(file) {
    this.file = file;
    const titles = [];
    for (let i = 0; i < this.file.length; i += 1) {
      titles.push(this.file[i].title);
    }

    return titles;
  }

  createIndex(fileName, fileContent) {
    let fileRead;

    try {
      fileRead = JSON.parse(JSON.stringify(fileContent));
    } catch (err) {
      return 'This file is invalid. Only JSON files are supported.';
    }

    try {
      this.validateFile(fileRead);
    } catch (err) {
      return err.message;
    }

    const indices = {};
    const docTitles = this.getTitles(fileRead);
    const words = this.tokenize(fileRead);

    words.forEach((word) => {
      const docsWithWord = [];

      fileRead.forEach((doc) => {
        const docTitle = doc.title;
        if (doc.text.indexOf(word) !== -1) {
          docsWithWord.push(docTitles.indexOf(docTitle));
        }
      });

      indices[word] = docsWithWord;
    });

    localStorage[fileName] = JSON.stringify(indices);
    return indices;
  }

  getIndex(fileName) {
    this.fileName = fileName;
    const fileIndices = localStorage[this.fileName];
    return JSON.parse(fileIndices);
  }

  buildSearchResult(fileName, searchString) {
    this.fileName = fileName;
    const regex = /[a-zA-Z]+/g;
    const matches = [];
    const searchResults = {};
    let found;
    const indexOfFile = JSON.parse(localStorage[this.fileName]);

    while (found = regex.exec(searchString)) {
      matches.push(found[0]);
    }

    matches.forEach((searchItem) => {
      searchResults[searchItem] = indexOfFile[searchItem];
    });

    return searchResults;
  }

  searchIndex(fileName, searchString) {
    this.fileName = fileName;
    if (this.fileName === 'all') {
      const resultForFile = {};

      const allFiles = Object.keys(localStorage);

      allFiles.forEach((file) => {
        resultForFile[file] = this.buildSearchResult(file, searchString);
      });

      return resultForFile;
    }

    return this.buildSearchResult(this.fileName, searchString);
  }

}
