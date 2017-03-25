const newIndex = new InvertedIndex();

const testFile = [
  {
    'title': 'Alice in Wonderland',
    'text': 'Alice falls into a rabbit hole and enters a world full of imagination.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }
];

const testFile2 = [
  {
    'title': 'Alice in Wonderland',
    'text': 'Alice falls into a rabbit hole and enters a world full of imagination.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  },

  {
    'title': 'The Lord of the Rings.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }
];

const testFile3 = [
  {
    'title': 'Alice in Wonderland',
    'text': 'Alice falls into a rabbit hole and enters a world full of imagination.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'Hello, is it me you are looking for?'
  }
];

const shortFile = [
  {
    'title': 'Alice in Wonderland',
    'text': 'Alice. falls- into@ a+ rabbit hole.'
  }
];

const shortFile2 = [
  {
    'title': 'Alice in Wonderland',
    'text': 'Alice. falls- into@ a+ rabbit hole.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf.'
  }
];


const invalidTestFile = [
  {
    'name': 'Alice in Wonderland',
    'text': 'Alice falls into a rabbit hole and enters a world full of imagination.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }
];


describe('Tests for the InvertedIndex class', function() {
  localStorage.indexedDocs = JSON.stringify({});

  describe('Tests for the validateFile method', function() {
    it('returns contents of file if the file structure is valid', function() {
      expect(newIndex.validateFile(testFile)).toEqual(testFile);
    });

    it('should throw error for invalid files', function() {
      expect(function() {newIndex.validateFile(invalidTestFile)} )
      .toThrow(new Error('Your JSON file does not have the expected format. Documents are to have title and text keys alone.'));
    });
  });

  describe('Tests for the tokenize method', function() {
    it('should return a sorted array of words without non-letters', function() {
      expect(newIndex.tokenize(shortFile)).toEqual(['Alice', 'a', 'falls', 'hole', 'into', 'rabbit']);
    });

    it('should return only words for words not separated by space', function() {
      expect(newIndex.tokenize('hello.boy to-home')).toEqual(['hello', 'boy', 'to', 'home']);
    })

    it('only takes objects and strings as arguments', function() {
      expect(newIndex.tokenize(1000)).toBe(undefined);
    });
  });

  describe('Tests for the getTitles method', function() {
    it('should return the titles of documents in an array', function() {
      expect(newIndex.getTitles(shortFile2)).toEqual(['Alice in Wonderland', 'The Lord of the Rings: The Fellowship of the Ring.']);
    });

    it('treats documents with the same name and content as one', function() {
      expect(newIndex.getTitles(testFile)).toEqual(['Alice in Wonderland', 'The Lord of the Rings: The Fellowship of the Ring.']);
    });

    it('should append " - Copy" to title if title already exists but has different text', function() {
      expect(newIndex.getTitles(testFile3)).toEqual(['Alice in Wonderland', 'The Lord of the Rings: The Fellowship of the Ring.', 'The Lord of the Rings: The Fellowship of the Ring. - Copy']);
    });

    it('should include title in array if it has the same text as another but different title name', function() {
      expect(newIndex.getTitles(testFile2)).toEqual(['Alice in Wonderland', 'The Lord of the Rings: The Fellowship of the Ring.', 'The Lord of the Rings.']);
    });
  });

  describe('Tests for the createIndex method', function() {
    it('should return error message for non-Array objects', function() {
      expect( function() {newIndex.createIndex('hello', 'Hello World')} ).toThrow(new Error('Invalid file format. Only array of objects can be contained in file.'));
      expect( function() {newIndex.createIndex('test', new Set(['a', 'the']))} ).toThrow(new Error('Invalid file format. Only array of objects can be contained in file.'));
      expect( function() {newIndex.createIndex('test', 200)} ).toThrow(new Error('Invalid file format. Only array of objects can be contained in file.'));
    });

    it('should return error message for files with improper key values', function() {
      const testFile = [
        {
        'tite': 'Alice in Wonderland',
        'text': 'Alice. falls- into@ a+ rabbit hole.'
      }
      ];

      expect( function() {newIndex.createIndex('doc1.json', invalidTestFile)} ).toThrow(new Error('Your JSON file does not have the expected format. Documents are to have title and text keys alone.'));
      expect( function() {newIndex.createIndex('test.json', testFile)} ).toThrow(new Error('Your JSON file does not have the expected format. Documents are to have title and text keys alone.'));
    });

    it('should return the correct indices for words in documents', function() {
      expect(newIndex.createIndex('doc.json', shortFile2)[0]).toEqual({'a': [0], 'alice': [0], 'alliance': [1], 'an':[1], 'elf': [1], 'falls': [0],
       'hole': [0], 'into': [0], 'man': [1], 'of': [1], 'rabbit': [0], 'unusual': [1]});
    });

    it('returns an array of file indices and the file name', function() {
      expect(newIndex.createIndex('doc.json', shortFile2)).toEqual([{'a': [0], 'alice': [0], 'alliance': [1], 'an':[1], 'elf': [1], 'falls': [0],
       'hole': [0], 'into': [0], 'man': [1], 'of': [1], 'rabbit': [0], 'unusual': [1]}, 'doc.json']);
    });

    it('should only accept an array of objects', function() {
      const testObj = {
        'title': 'Alice in Wonderland',
        'text': 'Alice. falls- into@ a+ rabbit hole.'
      };

      expect(function() {newIndex.createIndex('test.json', testObj)} ).toThrow(new Error('Invalid file format. Only array of objects can be contained in file.'));
    });
  });

  describe('Tests for the getIndex method', function() {
    it('should retrieve an array of file indices and array of file titles from localStorage', function() {
      expect(newIndex.getIndex('doc.json')).toEqual([{'a': [0], 'alice': [0], 'alliance': [1], 'an':[1], 'elf': [1], 'falls': [0],
       'hole': [0], 'into': [0], 'man': [1], 'of': [1], 'rabbit': [0], 'unusual': [1]}, ['Alice in Wonderland', 'The Lord of the Rings: The Fellowship of the Ring.']]);
    });

    it('should retrieve indices of file from localStorage', function() {
      expect(newIndex.getIndex('doc.json')[0]).toEqual({'a': [0], 'alice': [0], 'alliance': [1], 'an':[1], 'elf': [1], 'falls': [0],
       'hole': [0], 'into': [0], 'man': [1], 'of': [1], 'rabbit': [0], 'unusual': [1]});
    });
  });

  describe('Tests for the indexInLocalStorage method', function() {
    it('returns true if at least one file index is stored in localStorage', function() {
      // doc.json has been stored by createIndex above
      expect(newIndex.indexInLocalStorage()).toBeTruthy();
    });

    it('returns false if no file has been indexed', function() {
      localStorage.indexedDocs = JSON.stringify({});
      expect(newIndex.indexInLocalStorage()).toBeFalsy();
    });
  });

  describe('Tests for the getRecentlyIndexed method', function() {
    it('only returns an array of 15 most recently indexed files', function() {
      for (let i = 0; i < 20; i += 1) {
        let fileName = 'test' + String(i) + '.json';
        newIndex.createIndex(fileName, testFile);
      }

      const recentlyIndexedFiles = newIndex.getRecentlyIndexed();
      expect(recentlyIndexedFiles.length).toEqual(15);
    });

    it('initializes indexedDocs object in the localStorage', function() {
      localStorage.clear();
      newIndex.getRecentlyIndexed();
      expect(!!localStorage.indexedDocs).toBeTruthy();
    });

    it('returns an array of file names in indexedDocs in localStorage', function() {
      newIndex.createIndex('doc.json', shortFile2);
      newIndex.createIndex('test.json', testFile);
      expect(newIndex.getRecentlyIndexed()).toEqual(['doc.json', 'test.json']);
    });
  });

  describe('Tests for the Search methods', function() {
    it('should return an object of words that appear in a single indexed file', function() {
      expect(newIndex.searchIndex('doc.json', 'alice,an,hole a man'))
          .toEqual({alice: [0], an: [1], hole: [0], a: [0], man: [1]});
    });

    it('returns an object of file names against their search results for a search of all files', function() {
      const allFilesResult = newIndex.searchIndex('All Files', 'alice,an,hole,a - man', JSON.parse(localStorage.indexedDocs));
      expect(allFilesResult).toEqual({'doc.json': {alice: [0], an: [1], hole: [0], a: [0], man: [1]}
      , 'test.json': {alice: [0], an: [1, 2], hole: [0], a: [0, 1, 2], man: [1, 2]} })
    });

    it('should take search string in any case and return result', function() {
      expect(newIndex.searchIndex('doc.json', 'ALICE,AN,HOLE A MAN'))
          .toEqual({alice: [0], an: [1], hole: [0], a: [0], man: [1]});
    });
  });
});
