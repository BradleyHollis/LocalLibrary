function findAccountById(accounts, id) {
return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last > b.name.last ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  const { id } = account; 
  
  for(let key in books){
    const { borrows } = books[key];
    borrows.forEach((borrow) => {
      if(id === borrow.id){
        result += 1;
      }
    })
  }

  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
// 1. Use the account id to find out which books are checked out by the account; -> returns a list of books
  let result = [];
  const { id } = account;

  for(let key in books){
    const { borrows } = books[key];
    borrows.filter((borrow) => id === borrow.id && !borrow.returned ? result.push(books[key]) : null);
  }
  
  result.forEach((book) => {
    book['author'] = {
      id: book.authorId, 
      name: {
        first: getAuthorFirstName(book.authorId, authors),
        last: getAuthorLastName(book.authorId, authors)
      }
    }
  })
  
  return result;
}

// Helper function to retrieve author first name --> used for getBooksPossessedByAccount
function getAuthorFirstName(id, authors){
  const found = authors.find((author) => author.id === id);
  const {name: {first}} = found
  return first;
}

// Helper function to retrieve author last name --> used for getBooksPossessedByAccount
function getAuthorLastName(id, authors){
  const found = authors.find((author) => author.id === id);
  const {name: {last}} = found;
  return last;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
