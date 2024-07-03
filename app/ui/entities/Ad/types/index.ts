export interface Ad {
    userId: number;
    title: string;
    price: number;
    location: string;
    publicationDate: string;
    description: string;
    imagesUrls: Array<string>
}
