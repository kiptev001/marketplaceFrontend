import { sql } from '@vercel/postgres';
import { IDBResponse } from '../types';
import { Ad } from '@/src/ui/entities/Ad/types/index';

class AdModel {
  async findOneById(id:number):Promise<IDBResponse<Ad>>{
    const result = await sql<Ad>`
      SELECT * FROM ads WHERE id = ${id};
    `;

    if (result.rowCount === 0) {
      return { error: 'Ad not found' };
    }

    return { data: result.rows[0] ,status: 200 };
  }

  async findMany(): Promise<IDBResponse<Ad[]>> {
    const result = await sql<Ad>`
    SELECT * FROM ads;
  `;

    if (result.rowCount === 0) {
      return { error: 'No ads found' };
    }

    return { data: result.rows, status: 200 };
  }

  async create(ad:Ad):Promise<IDBResponse<Ad>>{
    const imagesArray = `{${ad?.images?.map(image => `"${image}"`).join(',')}}`;
    const contactsJson = JSON.stringify(ad.contacts);
    const result = await sql<Ad>`
    INSERT INTO ads (title, price, createdAt, location, description, images, userId, currency, contacts) 
    VALUES (${ad.title}, ${ad.price}, CURRENT_TIMESTAMP, ${ad.location}, ${ad.description}, ${imagesArray}, ${ad.userid}, ${ad.currency}, ${contactsJson}::jsonb)
    RETURNING *;
  `;

    return { data: result.rows[0] ,status: 200 };
  }

  async search(query: string): Promise<IDBResponse<Ad[]>> {
    const result = await sql<Ad>`
      SELECT *,
        CASE 
          WHEN title ILIKE ${'%' + query + '%'} THEN 1
          WHEN description ILIKE ${'%' + query + '%'} THEN 2
          WHEN title ILIKE ${'%' + query.split(' ')[0] + '%'} OR description ILIKE ${'%' + query.split(' ')[0] + '%'} THEN 3
          ELSE 4
        END as priority
      FROM ads
      WHERE title ILIKE ${'%' + query + '%'}
      OR description ILIKE ${'%' + query + '%'}
      OR title ILIKE ${'%' + query.split(' ')[0] + '%'}
      OR description ILIKE ${'%' + query.split(' ')[0] + '%'}
      ORDER BY priority, title ILIKE ${'%' + query + '%'} DESC, description ILIKE ${'%' + query + '%'} DESC;
    `;

    if (result.rowCount === 0) {
      return { error: 'No ads found' };
    }

    return { data: result.rows, status: 200 };
  }
}

const model = new AdModel();

export default model;
