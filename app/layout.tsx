import 'react-toastify/dist/ReactToastify.min.css';
import './global.css';
import { Navbar } from '@/app/ui/widgets/Navbar';
import { SearchBar } from '@/app//ui/widgets/SearchBar';
import { ToastContainer } from 'react-toastify';

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
        <div className='app'>
          {children}
        </div>
        <ToastContainer/>
      </body>
    </html>
  );
}
