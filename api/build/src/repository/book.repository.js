"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class Bookepository {
    save(book) {
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO books (title, description, discount, cover_image, price) VALUES(?,?,?)", [book.title, book.description, book.discount, book.cover_image, book.price], (err, res) => {
                if (err)
                    reject(err);
                else
                    this.retrieveById(res.insertId)
                        .then((book) => resolve(book))
                        .catch(reject);
            });
        });
    }
    retrieveAll() {
        let query = "SELECT * FROM books";
        return new Promise((resolve, reject) => {
            db_1.default.query(query, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
    retrieveById(bookId) {
        return new Promise((resolve, reject) => {
            db_1.default.query("SELECT * FROM books WHERE id = ?", [bookId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    update(tutorial) {
        return new Promise((resolve, reject) => {
            db_1.default.query("UPDATE books SET title = ?, description = ?, published = ? WHERE id = ?", [tutorial.title, tutorial.description, tutorial.published, tutorial.id], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
    delete(tutorialId) {
        return new Promise((resolve, reject) => {
            db_1.default.query("DELETE FROM books WHERE id = ?", [tutorialId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            db_1.default.query("DELETE FROM books", (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
}
exports.default = new Bookepository();
