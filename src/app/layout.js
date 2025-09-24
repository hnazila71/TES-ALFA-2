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
        <main className="p-4">
          <div className="content-container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}