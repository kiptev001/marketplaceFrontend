import { supabase } from './database';

class TokenModel {
  async findOneByUserId(userId:string){
    const response = await supabase
      .from('tokens')
      .select()
      .eq('userid', userId);

    return response;
  }

  async create(userId:number | string, refreshToken:string){
    const response = await supabase
      .from('tokens')
      .insert({ userid: userId, refreshtoken: refreshToken })
      .select();

    return response;
  }

  async findOne(refreshToken:string){
    const response = await supabase
      .from('tokens')
      .select()
      .eq('refreshtoken', refreshToken);

    return response;
  }

  async saveToken(userId:number | string, refreshToken:string) {
    const response = await supabase
      .from('tokens')
      .update({ refreshtoken: refreshToken })
      .eq('userid', userId).select();

    return response;
  }

  async deleteOne(refreshToken:string) {
    const response = await supabase
      .from('tokens')
      .delete()
      .eq('refreshtoken', refreshToken);

    return response;
  }
}

const model = new TokenModel();

export default model;
