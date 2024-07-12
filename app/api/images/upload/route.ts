import {NextResponse} from 'next/server';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);

export async function POST(req:Request,res:NextResponse) {
  try{
    const formData = await req.formData();
    const file = formData.getAll('files')[0];

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `/Users/nikitakiptev/Documents/projects/jwt_auth/client/nextjs-dashboard/public/${fileName}`;
    const imageUrl = `/${fileName}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({status:'success',imageUrl:imageUrl});
  }
  catch (e) {
    return  NextResponse.json({status:'fail',data:e});
  }
}
