// import { supabase } from './database';

// class TokenModel {
//   async findOneByUserId(userId:number){
//     const response = await supabase
//       .from('tokens')
//       .select()
//       .eq('userid', userId);

//     return response;
//   }

//   async create(userId:number, refreshToken:string){
//     const response = await supabase
//       .from('tokens')
//       .insert({ userid: userId, refreshtoken: refreshToken })
//       .select();

//     return response;
//   }

//   async findOne(refreshToken:string){
//     const response = await supabase
//       .from('tokens')
//       .select()
//       .eq('refreshtoken', refreshToken);

//     return response;
//   }

//   async saveToken(userId:number, refreshToken:string){
//     const result = await sql`UPDATE tokens SET refreshtoken = ${refreshToken} WHERE userId = ${userId} RETURNING *;`;

//     return { refreshToken: result.rows[0], status: 200 };
//   }

//   async deleteOne(refreshToken:string){
//     const result = await sql`DELETE FROM tokens WHERE refreshToken = ${refreshToken};`;
//     return result;
//   }
// }

// const model = new TokenModel();

// export default model;
