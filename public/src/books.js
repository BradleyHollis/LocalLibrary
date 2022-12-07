function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {

  let r = [];
  let b = [];

  for(let key in books){
    const { borrows: [ { returned } ]} = books[key];
    returned ? r.push(books[key]) : b.push(books[key]);
  }

  return [[...b], [...r]]
}

function getBorrowersForBook(book, accounts) {

  const { borrows } = book;
  let borrower_ids = borrows.filter(borrow => borrow).map(({id} ) => id);
  let returns = borrows.filter(borrow => borrow).map(({returned} ) => returned);
  let borrowers = accounts.filter((account) => borrower_ids.includes(account.id));
  
  borrowers.forEach((account, index) => {
    account['returned'] = returns[index];
  })

  
  return borrowers;
}

function getReturnedStatus(book, accountId){
  const { borrows } = book;
  const found = borrows.filter(( {id} ) => id === accountId);
  const { returned } = found;

  return returned;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
