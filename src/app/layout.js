import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Tes 2 Alfamidi',
  description: 'Aplikasi untuk manajemen inventaris gudang',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-black">
        <Navbar />
        <main>
          <div className="content-container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}