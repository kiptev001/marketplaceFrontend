import 'react-toastify/dist/ReactToastify.min.css';
import './global.css';
import { Navbar } from '@/app/ui/widgets/Navbar';
import { SearchBar } from '@/app//ui/widgets/SearchBar';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './ui/providers/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar/>
          <SearchBar/>
          <div className='app'>
            {children}
          </div>
          <ToastContainer/>
        </AuthProvider>
      </body>
    </html>
  );
}
