// import { IDBResponse } from '../../types';
// import { Ad } from '@/app/ui/entities/Ad/types/index';
// import { supabase } from './database';

// class AdModel {
//   async findOneById(id:number):Promise<IDBResponse<Ad>>{
//     const response = await supabase
//       .from('ads')
//       .select().eq('id', id);
//     return {data:response.data};
//   }

//   async findMany(): Promise<IDBResponse<Ad[]>> {
//     const response = await supabase
//       .from('ads')
//       .select();
//     return {data:response.data};
//   }

//   async create(ad:Ad):Promise<IDBResponse<Ad>>{
//     const imagesArray = `{${ad?.images?.map(image => `"${image}"`).join(',')}}`;
//     const contactsJson = JSON.stringify(ad.contacts);

//     const response = await supabase
//       .from('ads')
//       .insert({ title:ad.title, price:ad.price, location:ad.location, description:ad.description, images:imagesArray, userid:ad.userid, currency:ad.currency, contacts:contactsJson })
//       .select();
//     return response;
//   }

//   async search(keyword: string): Promise<IDBResponse<Ad[]>> {
//     const query = `
//         SELECT *
//         FROM ads
//         WHERE similarity(title, '${keyword}') > 0.1
//            OR similarity(description, '${keyword}') > 0.1
//         ORDER BY GREATEST(similarity(title, '${keyword}'), similarity(description, '${keyword}')) DESC;
//     `;

//     const { data, error } = await supabase
//       .rpc('execute_sql', { query });

//     if (error) {
//       console.error('Error:', error);
//       return { data: [], error: error.message };
//     }

//     return { data };
//   }
// }

// const model = new AdModel();

// export default model;
