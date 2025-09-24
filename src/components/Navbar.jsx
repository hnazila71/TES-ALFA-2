import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#c0c0c0] px-4 py-2 border-t-2 border-white border-l-2 border-white border-r-2 border-gray-500 border-b-2 border-gray-500 shadow-sm">
      <nav className="flex flex-wrap items-center gap-6 text-sm">
        {/* Main Navigation Links */}
        <Link 
          href="/master-barang" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          MASTER BARANG
        </Link>
        <Link 
          href="/koreksi-stok" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          KOREKSI STOK
        </Link>
        <Link 
          href="/proses-order" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          PROSES ORDER
        </Link>
        <Link 
          href="/receiving" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          RECEIVING
        </Link>
        
        {/* Vertical Separator */}
        <div className="border-l-2 border-gray-500 h-5 mx-2"></div>
        
        {/* Report Links */}
        <Link 
          href="/laporan/produk" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          LAPORAN PRODUK
        </Link>
        <Link 
          href="/laporan/order" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          LAPORAN ORDER
        </Link>
        <Link 
          href="/laporan/receive" 
          className="text-purple-800 underline hover:text-purple-900 transition-colors"
        >
          LAPORAN RECEIVE
        </Link>
      </nav>
    </header>
  );
}