const books = 
    {
      title: 'Algorithms',
      author: ['Robert Sedgewick', 'Kevin Wayne'],
      publisher: 'Addison-Wesley Professional',
      publicationDate: '2011-03-24',
      edition: 4,
      keywords: ['computer science', 'programming', 'algorithms', 'data structures', 'java', 'math', 'software', 'engineering'],
      pages: 976,
      format: 'hardcover',
      ISBN: '9780321573513',
      language: 'English',
      programmingLanguage: 'Java',
      onlineContent: true,
      thirdParty: {
        goodreads: {
          rating: 4.41,
          ratingsCount: 1733,
          reviewsCount: 63,
          fiveStarRatingCount: 976,
          oneStarRatingCount: 13
        }
      },
      highlighted: true,
      booksdetail: function({
        publicationDate, edition, keywordsIndex
      }){
         console.log(`Book ${this.title} Released ${publicationDate} is ${edition} edittion and ${this.keywords[keywordsIndex]}`);
      },
      booksdetail2: function({
        publicationDate ='2011-05-25' , edition, keywordsIndex
      }){
         console.log(`Book ${this.title} Released ${publicationDate} is ${edition} edittion and ${this.keywords[keywordsIndex]}`);
      }
    };


  //Set reference with desturcture/stucture function
    books.booksdetail({
        publicationDate: '2011-05-24',
        edition: 4,
        keywordsIndex: 3,
    }); 
    //also can set default result if can't destructure
    books.booksdetail2({
        edition: 4,
        keywordsIndex: 2,
    });
    //Result publicationDate will be se by reference default varialbe

  //how to get value from structure
    //1.
    const {title, author, keywords} = books;
    console.log(title, author, keywords);
    //2.
    const {title: booktitle, author: authorName, keywords: words} = books;
    console.log(booktitle, authorName, words);

    //3. Can't use without reference defined
    const {titlebooks = [], keywords: kwords = [] } = books;
    // titlebooks result will become undefined/ empty array

  //Mutating variables
    let a = 111;
    let b = 999;
    const obj = {a: 20, b: 18, c: 23};
    //(X){a,b}=obj;
    //(O){ { a,b } = obj };

  //Nested Objects
    //const {thirdParty} = books <= this get books reference thirdParty object
    //to get reference book thirdParty elements use below
    const {
        thirdParty: {
            rating, ratingsCount
        }
    } = books;
    //also the same set i, j
    const {
        thirdParty: {
            rating: i, ratingsCount: j
        }
    } = books;