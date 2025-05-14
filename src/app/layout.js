import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Facebook App',
  description: 'Facebook integration app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Toaster reverseOrder={false} />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
