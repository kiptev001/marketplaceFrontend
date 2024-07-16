export interface Ad {
    id:number;
    userId: number;
    title: string;
    price: number;
    currency:string;
    location: string;
    description: string;
    images: Array<string>;
    createdat:string;
    contacts: Array<Contact>
}

export interface Contact {
    type: ContactTypes;
    value: string;
}

export enum ContactTypes {
    'WHATSAPP'='WHATSAPP',
    'TELEGRAM' = 'TELEGRAM'
}
