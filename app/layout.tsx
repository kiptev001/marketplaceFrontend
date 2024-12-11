import 'react-toastify/dist/ReactToastify.min.css';
import './global.css';
import { Navbar } from '@/src/ui/widgets/Navbar/index';
import { SearchBar } from '@/src/ui/widgets/SearchBar';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/src/ui/providers/AuthProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <SpeedInsights/>
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
