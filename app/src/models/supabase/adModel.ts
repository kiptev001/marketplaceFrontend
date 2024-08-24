import { Ad } from '@/app/ui/entities/Ad/types/index';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from './database';

class AdModel {
  async findOneById(id:string):Promise<PostgrestResponse<Ad>>{
    const response = await supabase
      .from('ads')
      .select().eq('id', id);

    return response;
  }

  async findMany({ page, pageSize }: { page?: number; pageSize?: number } = { page: 1, pageSize: 10 }): Promise<PostgrestResponse<Ad>> {
    let response;

    if (page && pageSize) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      response = await supabase
        .from('ads')
        .select('*')
        .range(from, to);
    } else {
      response = await supabase
        .from('ads')
        .select('*');
    }

    return response;
  }

  async create(ad:Ad): Promise<PostgrestResponse<Ad>> {
    const imagesArray = ad.images ? `{${ad?.images?.map(image => `"${image}"`).join(',')}}` : null;
    const contactsJson = JSON.stringify(ad.contacts);

    const response = await supabase
      .from('ads')
      .insert({ title: ad.title, price: ad.price, location: ad.location, description: ad.description, images: imagesArray, userid: ad.userid, currency: ad.currency, contacts: contactsJson })
      .select();

    return response;
  }

  async search(keyword: string): Promise<PostgrestResponse<Ad>> {
    const query = `
        SELECT *
        FROM ads
        WHERE similarity(title, '${keyword}') > 0.1
           OR similarity(description, '${keyword}') > 0.1
        ORDER BY GREATEST(similarity(title, '${keyword}'), similarity(description, '${keyword}')) DESC;
    `;

    const response = await supabase
      .rpc('execute_sql', { query });

    return response;
  }
}

const model = new AdModel();

export default model;
