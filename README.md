# Inverted-Index

[![Build Status](https://travis-ci.org/andela-tAdedotun/Inverted-Index.svg?branch=master)](https://travis-ci.org/andela-tAdedotun/Inverted-Index)
[![Coverage Status](https://coveralls.io/repos/github/andela-tAdedotun/Inverted-Index/badge.svg?branch=development)](https://coveralls.io/github/andela-tAdedotun/Inverted-Index?branch=development)
[![Code Climate](https://codeclimate.com/github/andela-tAdedotun/Inverted-Index/badges/gpa.svg)](https://codeclimate.com/github/andela-tAdedotun/Inverted-Index)

[Staging App](https://ta-inverted-index-staging.herokuapp.com/)

[Production App](https://ta-inverted-index-production.herokuapp.com/)

###### This app allows users create inverted indices for documents in JSON files.

### Technologies:
- JavaScript
- AngularJS
- Twitter Bootstrap
- Node.js

### Features
- Upload JSON file whose contents you want indexed
- Indices are stored
- Doesn't allow duplicate documents in JSON file
- Keeps history of indexed files
- Separate search queries with any character (punctation, whitespace etc.)

## USING THE APP
There is a structure to JSON files this app accepts.

A valid JSON file is one that has this (EXACT) structure:

```
[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
```

##### Uploading and Creating Index
- Click on the 'Upload JSON' button
- The 'Create Index' button and a selection of files uploaded appears after you upload valid file(s)
- Select any file you want indexed and click on the 'Create Index' button

###### The Output
Once you've performed the above, a table is displayed containing a mapping of words and documents they appear in:
![Inverted Index Table](http://i.imgur.com/KBtKPhf.png)

For files with duplicates like the example valid file above, duplicates are treated as one.
![Duplicates in File](http://i.imgur.com/jwiKpCV.png)

If, for example, one of the 'The Lord of the Rings: The Fellowship of the Ring.' has different content from the other, the table looks like this:
![Duplicates with Different Contents](http://i.imgur.com/KAoJmMf.png)

*Documents with the same content but different titles, like in the first picture, are treated as separate documents. 'The Lord of the Rings: The Fellowship of the Ring.' and 'The Lord of the Rings' have the same content*

##### Searching Through Indexed Documents
- A selection of indexed files appears after creating indices, together with a search box.
- Select a file whose documents you want to search through and type your search queries. (Search queries can be separated by any character. 'Alice,the-ring/el' is a valid search query.) You can also select 'All Files'
to search through all indexed files.
- Live search is implemented. You'll see search results as you type.

###### The Output
Search through one file:
![Search Result for One File](http://i.imgur.com/VQvXEsz.png)

Search through all indexed files:
![Search Result for All Files](http://i.imgur.com/OsTud05.png)

##### Viewing History of Indexed Files
If, after using the app for the first time, you use it again, you don't have to upload already indexed files again to view or search through their indices. The app keeps a history of *15* most recently indexed files for you. A 'Recently Indexed' button appears on the next visit that contains a dropdown that contains your history.

**Issue Tracker:**

https://github.com/andela-tAdedotun/Inverted-Index/issues

### Support
If you are having issues, please let me know.
Mail me at: taiwo.adedotun@andela.com
