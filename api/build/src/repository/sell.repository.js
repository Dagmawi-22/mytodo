"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class SellRepository {
    save(sell) {
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO sells (bookId, buyerName, price) VALUES(?,?,?)", [sell.bookId, sell.buyerName, sell.buyerName], (err, res) => {
                if (err)
                    reject(err);
                else {
                }
            });
        });
    }
}
exports.default = new SellRepository();
