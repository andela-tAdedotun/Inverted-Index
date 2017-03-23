const index = require('../src/js/inverted-index.js');
const newIndex = new index();

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

  describe('Tests for the validateFile method', function() {
    it('returns contents of file if the file structure is valid', function() {
      expect(newIndex.validateFile(testFile)).toEqual(testFile);
    });

    it('should throw error for invalid files', function() {
      expect(function() {newIndex.validateFile(invalidTestFile)} )
      .toThrow(new Error('Your JSON file does not have the expected format. Documents are to have title and text keys alone.'));
    });
  });

  describe('Tests for the splitText method', function() {
    it('returns ["the", "boy", "went"] for argument "the boy went"', function() {
      expect(newIndex.splitText('the boy went')).toEqual(['the', 'boy', 'went']);
    });

    it('only splits at spaces', function() {
      expect(newIndex.splitText('theboy.hello how, to')).toEqual(['theboy.hello', 'how,', 'to']);
    });
  });

  describe('Tests for the tokenize method', function() {
    it('should return a sorted array of words without non-letters', function() {
      expect(newIndex.tokenize(shortFile)).toEqual(['Alice', 'a', 'falls', 'hole', 'into', 'rabbit']);
    });

    it('only takes objects as arguments', function() {
      expect(function() { newIndex.tokenize('hello') }).toThrowError(TypeError);
    });
  });

  describe('Tests for the getTitles method', function() {
    it('should return the titles of documents in an array', function() {
      expect(newIndex.getTitles(testFile)).toEqual(['Alice in Wonderland', 'The Lord of the Rings: The Fellowship of the Ring.', 'The Lord of the Rings: The Fellowship of the Ring.']);
    });
  });

  describe('Tests for the createIndex method', function() {
    it('should return error message for non-Array objects', function() {
      expect(newIndex.createIndex('hello', 'Hello World')).toEqual('Invalid file format. Only array of objects can be contained in file.');
      expect(newIndex.createIndex('test', new Set(['a', 'the']))).toEqual('Invalid file format. Only array of objects can be contained in file.');
      expect(newIndex.createIndex('test', 200)).toEqual('Invalid file format. Only array of objects can be contained in file.');
    });

    it('should return error message for files with improper key values', function() {
      const testFile = [
        {
        'tite': 'Alice in Wonderland',
        'text': 'Alice. falls- into@ a+ rabbit hole.'
      }
      ];

      expect(newIndex.createIndex('doc1.json', invalidTestFile)).toEqual('Your JSON file does not have the expected format. Documents are to have title and text keys alone');
      expect(newIndex.createIndex('test.json', testFile)).toEqual('Your JSON file does not have the expected format. Documents are to have title and text keys alone');
    });

    it('should return the correct indices for words in documents', function() {
      expect(newIndex.createIndex('doc.json', shortFile2)).toEqual({'a': [0,1], 'alice': [0], 'alliance': [1], 'an':[1], 'elf': [1], 'falls': [0], 'hole': [0], 'into': [0], 'man': [1], 'of': [1], 'rabbit': [0], 'unusual': [1]});
    });
  });

    it('should only accept an array of objects', function() {
      const testObj = {
        'title': 'Alice in Wonderland',
        'text': 'Alice. falls- into@ a+ rabbit hole.'
      };

      expect(newIndex.createIndex('test.json', testObj)).toEqual('Invalid file format. Only array of objects can be contained in file.');
    });

});
