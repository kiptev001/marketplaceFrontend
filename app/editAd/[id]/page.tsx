import React from 'react';
import { cookies } from 'next/headers';
import EditAdForm from '@/src/ui/widgets/EditAdForm/EditAdForm';

type StringRecord = {
  [key: string]: string;
};

const page = async ({ params }: {params: StringRecord}) => {
  const apiUrl = process.env.API_URL || 'http://thaisell.net/api';
  const cookiesStore = cookies();
  const cookieString = cookiesStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  async function requestAdData(id:string) {
    'use server';

    const response = await fetch(`${apiUrl}/ads/getOne?id=${params.id}`,{ method: 'GET',  headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieString,
    }, });

    const jsonResponse = await response.json();

    return jsonResponse;
  }

  const ad = await requestAdData(params?.id);

  return (
    <EditAdForm ad={ad} />
  );
};

export default page;
