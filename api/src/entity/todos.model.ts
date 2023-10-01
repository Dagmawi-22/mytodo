import { RowDataPacket } from "mysql2"

export default interface Todo extends RowDataPacket {
  id? : BigInt,
  content?: string;
  completed?: boolean;
}
