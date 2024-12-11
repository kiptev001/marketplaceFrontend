import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

class TokenModel {
  async findOneByUserId(userId:string | number){
    const result = await sql`
      SELECT * FROM tokens WHERE userId = ${userId};
    `;

    if (result.rowCount === 0) {
      return { error: 'Token not found' };
    }

    return { refreshToken: result.rows[0] ,status: 200 };
  }

  async findOne(refreshToken:string){
    const result = await sql`
      SELECT * FROM tokens WHERE refreshToken = ${refreshToken};
    `;

    if (result.rowCount === 0) {
      return { error: 'Token not found' };
    }

    return { refreshToken: result.rows[0] ,status: 200 };
  }

  async create(userId: string | number, refreshToken: string){
    const result = await sql`
      INSERT INTO tokens (userId, refreshToken)
      VALUES (${userId}, ${refreshToken})
      RETURNING *;
    `;

    return { refreshToken: result.rows[0] ,status: 200 };
  }

  async saveToken(userId:string | number, refreshToken:string){
    const result = await sql`UPDATE tokens SET refreshtoken = ${refreshToken} WHERE userId = ${userId} RETURNING *;`;

    return { refreshToken: result.rows[0], status: 200 };
  }

  async deleteOne(refreshToken:string){
    const result = await sql`DELETE FROM tokens WHERE refreshToken = ${refreshToken};`;
    return result;
  }
}

const model = new TokenModel();

export default model;
