const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `select candidate.id,name,email,phone_no,party,gender,age,aadhaar,region,type 
    from contestant,candidate,election where candidate.id = contestant.id 
    and contestant.election_id = election.id`;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    // if (context.fac_code) {
    //     binds.fac_code = context.fac_code;
    //     query += `\nwhere fac_code = :fac_code`;
    // }
    // binds.name = context.name;
    // binds.party = context.party;
    // binds.votes = context.votes;

    // binds.check = {
    //     type: oracledb.NUMBER,
    //     dir: oracledb.BIND_OUT
    // }
    //console.log(binds);
    const result = await database.simpleExecute(query, binds);

    var finalResult = result.rows;
    return finalResult;
}

module.exports.find = find;

const createSql =
    `begin insert_entry(:username, :password, :age, :residence, :party, :res); end;`;

async function create(us) {
    const user = Object.assign({}, us);

    user.res = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    }
    const result = await database.simpleExecute(createSql, user);
    console.log(user);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];

    return JSON.parse(result.outBinds.res);
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