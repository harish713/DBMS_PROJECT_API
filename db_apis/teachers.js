const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `select id,type,no_of_const,dates,eligibility from election`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    // if (context.fac_code) {
    //     binds.fac_code = context.fac_code;
    //     query += `\nwhere fac_code = :fac_code`;
    // }

    const result = await database.simpleExecute(query, binds);
    console.log(result)

    return result.rows;
}

module.exports.find = find;

const createSql =
    `begin ins_teacher(
    :fac_code,
    :first_name,
    :last_name,
    :designation,
    :dept
  ); end;`;

async function create(tec) {
    const teacher = Object.assign({}, tec);

    // teacher.fac_code_id = {
    //     dir: oracledb.BIND_OUT,
    //     type: oracledb.STRING
    // }
    const result = await database.simpleExecute(createSql, teacher);
    console.log(teacher);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];

    return teacher;
}

module.exports.create = create;

const updateSql =
    `
    update tab_teacher
  set first_name = :first_name,
    last_name = :last_name
  where fac_code = :fac_code
  `;

async function update(tec) {
    const teacher = Object.assign({}, tec);
    delete teacher.designation;
    delete teacher.dept;
    const result = await database.simpleExecute(updateSql, teacher);
    if (result.rowsAffected && result.rowsAffected === 1) {
        return teacher;
    } else {
        return null;
    }
}

module.exports.update = update;

const deleteSql =
    `begin
    del_teacher(:fac_code);
    :rowcount := sql%rowcount;
  end;`

async function del(fac_code) {
    const binds = {
        fac_code: fac_code,
        rowcount: {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        }
    }

    const result = await database.simpleExecute(deleteSql, binds);
    console.log(result);
    return teacher;
}

module.exports.delete = del;