import { sql } from '@vercel/postgres';
import { IAd, IDBResponse, ISQLResponse } from '../types';

class AdModel {
  async findOneById(id:number):Promise<IDBResponse<IAd>>{
    const result = await sql<IAd>`
      SELECT * FROM ads WHERE id = ${id};
    `;

    if (result.rowCount === 0) {
      return { error: 'Ad not found' };
    }

    return { data: result.rows[0] ,status: 200 };
  }

  async findMany(limit: number): Promise<IDBResponse<IAd[]>> {
    const result = await sql<IAd>`
    SELECT * FROM ads LIMIT ${limit};
  `;

    if (result.rowCount === 0) {
      return { error: 'No ads found' };
    }

    return { data: result.rows, status: 200 };
  }

  async create(ad:IAd):Promise<IDBResponse<IAd>>{
    const imagesArray = `{${ad?.images?.map(image => `"${image}"`).join(',')}}`;
    const contactsJson = JSON.stringify(ad.contacts);
    const result = await sql<IAd>`
    INSERT INTO ads (title, price, createdAt, location, description, images, userId, currency, contacts) 
    VALUES (${ad.title}, ${ad.price}, CURRENT_TIMESTAMP, ${ad.location}, ${ad.description}, ${imagesArray}, ${ad.userId}, ${ad.currency}, ${contactsJson}::jsonb)
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
