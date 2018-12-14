const express = require('express');
const bookRouter = express.Router();

function router(nav) {
    const books = [
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich',
            read: false
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            res.render(
                'bookListView',
                {
                    nav,
                    title: 'Library',
                    books
                }
            );
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Library',
                    book: books[id]
                }
            );
        });
    return bookRouter;
}
module.exports = router;