import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("post.db");

export class DB {

    static init() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS posts (
                        id INTEGER PRIMARY KEY NOT NULL, 
                        img TEXT,
                        text TEXT NOT NULL,
                        date TEXT,
                        booked INT
                    )`,
                    [],
                    resolve,
                    (_, error) => reject(error)
                );
            });
        });
    }

    static getPosts() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM posts`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static updatePost({id, booked}) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE posts SET booked = ? WHERE id = ?`,
                    [booked ? 0 : 1, id],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static createPost({text, date, img}) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
                    [text, date, 0, img],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static removePost(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM posts WHERE id = ?`,
                    [id],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                );
            });
        });
    }


}
