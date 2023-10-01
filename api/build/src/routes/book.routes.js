"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const sell_controller_1 = __importDefault(require("../controllers/sell.controller"));
class BookRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new book_controller_1.default();
        this.sellController = new sell_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        // Create a new Book
        this.router.post("/", this.controller.create);
        // Retrieve all Books
        this.router.get("/", this.controller.findAll);
        // Retrieve a single Book with id
        this.router.get("/:id", this.controller.findOne);
        // Delete a Book with id
        this.router.delete("/:id", this.controller.delete);
        // Delete all Books
        this.router.delete("/", this.controller.deleteAll);
        // Buy a Book
        this.router.post("/", this.sellController.create);
    }
}
exports.default = new BookRoutes().router;
