import './global.css';
import { Navbar } from '@/app/ui/widgets/Navbar';
import { SearchBar } from '@/app//ui/widgets/SearchBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <SearchBar/>
        {children}
      </body>
    </html>
  );
}
