import { OkPacket } from "mysql2";
import connection from "../db";

import Todo from "../entity/todos.model";

interface ITodoRepository {
  save(todo: Todo): Promise<Todo>;
  retrieveAll(): Promise<Todo[]>;
  retrieveById(todoId: number): Promise<Todo | undefined>;
  delete(todoId: number): Promise<number>;
  deleteAll(): Promise<number>;
}


class TodoRepository implements ITodoRepository {
  save(todo: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO todos (content, completed) VALUES(?,?,?)",
        [todo.content, todo.completed],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((user) => resolve(user!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(): Promise<Todo[]> {
    let query: string = "SELECT * FROM todos";
    
    return new Promise((resolve, reject) => {
      connection.query<Todo[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(todoId: number): Promise<Todo> {
    return new Promise((resolve, reject) => {
      connection.query<Todo[]>(
        "SELECT * FROM todos WHERE id = ?",
        [todoId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }


  delete(todoId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM todos WHERE id = ?",
        [todoId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM todos", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new TodoRepository();
