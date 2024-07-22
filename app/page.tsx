import { AdsList } from './ui/widgets/AdsList';

export default function Page() {
  console.log('API_URL',process.env.API_URL);
  console.log('CLIENT_URL',process.env.CLIENT_URL);
  return (
    <AdsList />
  );
}
