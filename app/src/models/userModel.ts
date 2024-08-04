import { sql } from '@vercel/postgres';
import { ApiError } from '../services/apiError';

class UserModel {
  async findOne(email:string){
    const result = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    if (result.rowCount === 0) {
      return { error: 'User not found', status: 404 };
    }

    return { user: result.rows[0], status: 200 };
  }

  async findById(id:string){
    const result = await sql`
      SELECT * FROM users WHERE id = ${id};
    `;

    if (result.rowCount === 0) {
      return { error: 'User not found', status: 404 };
    }

    return { user: result.rows[0], status: 200 };
  }

  async create(email:string, password:string, activationLink:string){
    const result = await sql`
      INSERT INTO users (email, password, activationLink)
      VALUES (${email}, ${password}, ${activationLink})
      RETURNING *;
    `;

    return { user: result.rows[0], status: 200 };
  }

  async activate(activationLink:string){
    const result = await sql`
      SELECT * FROM users WHERE activationLink = ${activationLink};
    `;
    if (!result.rows[0]) {
      throw ApiError.BadRequest('Incorrect activation link');
    }
    const result2 = await sql`UPDATE users SET isActivated = TRUE WHERE activationLink = ${activationLink};`;
    return {status: 200};
  }

  async findAll(){
    const result = await sql`SELECT * FROM users;`;
    return result.rows;
  }
}

const model = new UserModel();

export default model;
