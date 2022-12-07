function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
 return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0; 
  books.filter( ({ borrows: [ { returned }] }) => !returned ? total += 1: null);
  return total;
}

function getMostCommonGenres(books) {
  let rankings = books.reduce(function (result, book) {
    let key = book.genre;
    if (!result[key]) {
      result[key] = 1;
    } else {
      result[key] += 1;
    }
    return result
  }, {})

  let toReturn = [];
  for(let element in rankings){
    toReturn.push({name: element, count: rankings[element]})
  }

  toReturn = toReturn.sort((a, b) => a.count > b.count ? -1 : 1);
  toReturn = toReturn.filter((element, index) => index < 5);

  return toReturn;
}

function getMostPopularBooks(books) {
  let result = [];

  books.filter((book) => {
    const { title } = book;
    const { borrows } = book;
    result.push({'name': title, 'count': borrows.length})
  })

  return result.sort((a, b) => a.count > b.count ? -1 : 1).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // 1. Find the books written by the Author
  let result = [];
  books.forEach((book) => {
    let titles = getBooksByAuthor(book.authorId, books);
    result.push({'name': getAuthorFullName(book.authorId, authors), 'count': getViewsByAuthor(titles, books)})
  })
  
  return result.sort((a, b) => a.count > b.count ? -1 : 1).slice(0, 5)
}

function getBooksByAuthor(authId, books){
  return books.filter((book) => book.authorId === authId).map(book => book.title)
}

function getViewsByAuthor(titles, books){
  let result = 0; 
  books.filter((book) => {
    const { title, borrows } = book;
    if(titles.includes(title)){
      result += borrows.length;
    }
  })
  return result;
}

function getAuthorFullName(authId, authors){
  let toReturn = "";
  authors.find((author) => author.id === authId ? toReturn += `${author.name.first} ${author.name.last}` : null);
  return toReturn;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};