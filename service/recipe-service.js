const { Pool } = require("pg");
require('dotenv').config();

const pool  = new Pool({
  connectionString: process.env.DB_URI,
  max: 10
})

module.exports = {
  async getRecipes(id){
    console.log(process.env.DB_URI)
    let query = `SELECT 
      id, title, making_time, ingredients, serves, cost
    FROM recipes`
    if(id){
      query += " WHERE id = $1"
      let result = await pool.query(query,[id]);
      return result.rows;
    }else{
      let result = await pool.query(query);
      return result.rows;
    }
    
  },

  async createRecipe(r){
    const query = `
    INSERT INTO recipes(title, making_time, ingredients, serves, cost) 
    VALUES($1, $2, $3, $4, $5)`
    await pool.query(query, [r.title, r.making_time, r.ingredients, r.serves, r.cost]);
    
    return r;
  },
  
  async updateRecipe(id,r){
    const query = `
    UPDATE recipes
    SET 
      title = $1, 
      making_time = $2, 
      ingredients = $3, 
      serves = $4, 
      cost = $5
    WHERE id = $6 
    `
    await pool.query(query, [r.title, r.making_time, r.ingredients, r.serves, r.cost, id]);
    
    return r;
  },

  async deleteRecipe(id,r){
    const query = `
    DELETE FROM recipes
    WHERE id = $1
    RETURNING id
    `
    let result = await pool.query(query, [id]);
    return result.rows;
  }
}
