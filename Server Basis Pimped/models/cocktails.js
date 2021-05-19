const db = require('../db');

async function getCocktails() {
  const { rows } = await db.query('SELECT * FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}

async function getCocktail(name) {
  const { rows } = await db.query('SELECT * FROM cocktail WHERE cname = $1', [name]);
  if (rows.length > 0)
    return {
      code: 200,
      data: rows[0],
    };
  else
    return {
      code: 404,
      data: `the specified cocktail ${name} was not found in the database`,
    };
}

async function getZutaten(name) {
  const {
    rows,
  } = await db.query('SELECT zbez FROM zutat JOIN besteht USING(zid) JOIN cocktail USING(cid) WHERE cname= $1', [name]);
  if (rows.length > 0) {
    //for (let i = 0; rows.length > i; i++) {
    return {
      code: 200,
      data: rows, //rows[i]
    };
  } else {
    return {
      code: 404,
      data: `the specified cocktail ${name} was not found in the database`,
    };
  }
}

async function getPreise() {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}

async function getSchnaeppchen(preis) {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail WHERE preis <= $1', [preis]);
  return {
    code: 200,
    data: rows,
  };
}

async function delCocktail(name) {
  const { rows } = await db.query('SELECT cid FROM cocktail WHERE cname = $1', [name]);
  for (const row of rows) {
    await db.query('DELETE FROM besteht WHERE cid = $1', [row.cid]);
    await db.query('DELETE FROM bestellt WHERE cid = $1', [row.cid]);
  }
  await db.query('DELETE FROM cocktail WHERE cname = $1', [name]);
  if (rows.length > 0)
    return {
      code: 200,
      data: 'Deleted',
    };
  else
    return {
      code: 404,
      data: `Cocktail ${name} not found!`,
    };
}

async function insertCocktail(e) {
  let { rows } = await db.query('SELECT MAX(cid) AS max FROM cocktail');
  let cid = rows[0].max + 1;
  await db.query(
    `INSERT INTO cocktail (cid, cname, preis, zubereitung, kid, zgid, sgid)
                           VALUES($1,$2,$3,$4, $5, $6, $7)`,
    [cid, e.cname, e.preis, e.zubereitung, e.kid, e.zgid, e.sgid]
  );
  return {
    code: 200,
    data: cid,
  };
}

module.exports = {
  getCocktails,
  getCocktail,
  getZutaten,
  getPreise,
  getSchnaeppchen,
  delCocktail,
  insertCocktail,
};
