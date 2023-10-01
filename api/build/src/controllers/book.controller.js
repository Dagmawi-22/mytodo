"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_repository_1 = __importDefault(require("../repository/book.repository"));
class BookController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.title) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const book = req.body;
                const savedBook = yield book_repository_1.default.save(book);
                res.status(201).send(savedBook);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving tutorials."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let books = yield book_repository_1.default.retrieveAll();
                let page = req.query.page;
                let page1 = parseInt(page);
                let limit = req.query.limit;
                let limit1 = parseInt(limit);
                const startIndex = page1 - 1;
                const endIndex = page1 * limit1;
                books = books.slice(startIndex, endIndex);
                res.status(200).send(books);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving books."
                });
            }
        });
    }
    buyBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let books = yield book_repository_1.default.retrieveAll();
                let page = req.query.page;
                let page1 = parseInt(page);
                let limit = req.query.limit;
                let limit1 = parseInt(limit);
                const startIndex = page1 - 1;
                const endIndex = page1 * limit1;
                books = books.slice(startIndex, endIndex);
                res.status(200).send(books);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving books."
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const book = yield book_repository_1.default.retrieveById(id);
                if (book)
                    res.status(200).send(book);
                else
                    res.status(404).send({
                        message: `Cannot find Book with id=${id}.`
                    });
            }
            catch (err) {
                res.status(500).send({
                    message: `Error retrieving Book with id=${id}.`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const num = yield book_repository_1.default.delete(id);
                if (num == 1) {
                    res.send({
                        message: "Book was deleted successfully!"
                    });
                }
                else {
                    res.send({
                        message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Could not delete Book with id==${id}.`
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const num = yield book_repository_1.default.deleteAll();
                res.send({ message: `${num} Books were deleted successfully!` });
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while removing all books."
                });
            }
        });
    }
}
exports.default = BookController;
