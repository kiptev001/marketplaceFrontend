import { supabase } from './database';
import { PostgrestResponse } from '@supabase/supabase-js';
import { IUser } from '../../types';
import Error from 'next/error';
import { ApiError } from '../../services/apiError';

class UserModel {
  async findOne(email: string):Promise<PostgrestResponse<IUser>> {
    const response = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    return response;
  }

  async findById(id: string):Promise<PostgrestResponse<IUser>> {
    const response = await supabase
      .from('users')
      .select('*')
      .eq('id', id);

    return response;
  }

  async create(email: string, password: string, activationlink: string):Promise<PostgrestResponse<IUser>> {
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

  async findAll():Promise<PostgrestResponse<IUser>> {
    const response = await supabase
      .from('users')
      .select('*');

    return response;
  }
}

const model = new UserModel();

export default model;
