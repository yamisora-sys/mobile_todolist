import * as SQLite from 'expo-sqlite';

const dbName = 'ToDo.db';


export function dbConnect() {
    return SQLite.openDatabase(dbName);
}


export function createTable(db, tableName, fields) {

    db.transaction(tx => {
        // tx.executeSql(`drop table if exists ${tableName};`);
        tx.executeSql(`create table if not exists ${tableName} ${fields}`);
    });
}


export async function getData(db, tableName): Promise {
    const data = [];
    db.transaction(tx => {
        tx.executeSql(`select * from ${tableName};`, [], (_, { rows }) => {
            rows._array.forEach(item => {
                data.push(item);
            });
        });
    });
    return data;
}

export function insertData(db, tableName, fields, values) {
    const query = `insert into ${tableName} ${fields} values ${values};`;
    console.log(query);
    db.transaction(tx =>{
        tx.executeSql(`insert into ${tableName} ${fields} values ${values};`)
    })
}

export async function getData(db, tableName): Promise {
    const data = [];
    db.transaction(tx => {
        tx.executeSql(`select * from ${tableName};`, [], (_, { rows }) => {
            rows._array.forEach(item => {
                data.push(item);
            });
        });
    });
    return data;
}