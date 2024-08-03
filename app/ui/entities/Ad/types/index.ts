export interface Ad {
    id?:number;
    userid?: number;
    title: string;
    price: number;
    currency:string;
    location: string;
    description: string;
    images: Array<string> | null;
    createdat?:string;
    contacts?: Array<Contact>
}

export interface Contact {
    type: ContactTypes;
    value: string;
}

export enum ContactTypes {
    'WhatsApp'= 'WhatsApp',
    'Telegram' = 'Telegram',
    'Phone' = 'Phone'
}

export enum Currencies {
  'RUB'= 'RUB',
  'USD' = 'USD',
  'THB' = 'THB'
}
