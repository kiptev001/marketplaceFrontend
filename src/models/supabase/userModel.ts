import { supabase } from './database';
import { PostgrestResponse } from '@supabase/supabase-js';
import { ApiError } from '../../services/apiError';
import { IUserFromDb } from '../../types';

class UserModel {
  async findOne(email: string):Promise<PostgrestResponse<IUserFromDb>> {
    const response = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    return response;
  }

  async findById(id: string):Promise<PostgrestResponse<IUserFromDb>> {
    const response = await supabase
      .from('users')
      .select('*')
      .eq('id', id);

    return response;
  }

  async create(email: string, password: string, activationlink: string):Promise<PostgrestResponse<IUserFromDb>> {
    const response = await supabase
      .from('users')
      .insert({ email, password, activationlink })
      .select('*');

    return response;
  }

  async activate(activationLink: string) {
    const response = await supabase
      .from('users')
      .select('*')
      .eq('activationlink', activationLink)
      .single();

    if (response.error || !response.data) {
      throw ApiError.BadRequest('Activation link not found.');
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ isactivated: true })
      .eq('activationlink', activationLink);

    if (updateError) {
      throw ApiError.BadRequest('Error activating user.');
    }

    return { status: 204 };
  }

  async findAll():Promise<PostgrestResponse<IUserFromDb>> {
    const response = await supabase
      .from('users')
      .select('*');

    return response;
  }
}

const model = new UserModel();

export default model;
