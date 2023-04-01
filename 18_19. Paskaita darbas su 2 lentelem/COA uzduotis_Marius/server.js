// Pats laikas pritaikyti savo žinias praktikoje.
// Susikuriame dvi lenteles:

// authors (id, name, surname)
// books (id, author_id, title, year)
// Įrašome bent du autorius, ir kiekvienam autoriui bent po dvi knygas (t.y. iš viso bent 4 knygos).

// Pasirašome SQL JOIN, kuris atvaizduotų lentelę visų knygų su jų autoriais (books.id, authors.name, authors.surname, books.title, books.year).
// select books.id as book_id, authors.name, authors.surname, books.title, books.year from books join authors on books.author_id = authors.id
//
// explained: prie viso sito join'inam authors; tada per ka norim sujungti kur books.author_id = authors.id (principe kur FK = PK)

// Parašome SQL, kuris atvaizduotų visus autorius ir kiek jie knygų turi (t.y. author.id, author.name, author.surname, count(by books.author_id))
// select authors.id as author_id, authors.name, authors.surname, count(books.author_id) as book_amount from authors join books on authors.id = books.author_id group by authors.id
//
// explained: count be grupavimo neveikia. (Principe reik, kad visus autorius, kuriu id yra toks pats, kad sutrauktu i viena eilute)
