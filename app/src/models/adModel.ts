import { sql } from '@vercel/postgres';
import { IAd, IDBResponse } from '../types';

class AdModel {
  async findOneById(id:number):Promise<IAd>{
    const result = await sql`
      SELECT * FROM ads WHERE id = ${id};
    `;

    if (result.rowCount === 0) {
      return { error: 'Ad not found' };
    }

    return { ad: result.rows[0] ,status: 200 };
  }

  async create(ad:IAd):Promise<IDBResponse<IAd>>{
    const result = await sql<IAd>`
    INSERT INTO ads (title, price, createdAt, location, description, images, userId) 
    VALUES (${ad.title}, ${ad.price}, CURRENT_TIMESTAMP, ${ad.location}, ${ad.description}, ${JSON.stringify(ad.images)}, ${ad.userId})
    RETURNING *;
  `;

    return { data: result.rows[0] ,status: 200 };
  }

  //   async saveToken(userId:number, refreshToken:string){
  //     const result = await sql`UPDATE tokens SET refreshtoken = ${refreshToken} WHERE userId = ${userId} RETURNING *;`;

  //     return {refreshToken: result.rows[0], status: 200};
  //   }

//   async deleteOne(refreshToken:string){
//     const result = await sql`DELETE FROM tokens WHERE refreshToken = ${refreshToken};`;
//     return result;
//   }
}

const model = new AdModel();

export default model;
