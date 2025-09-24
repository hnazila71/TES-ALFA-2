import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#c0c0c0] px-6 py-3 border-t-2 border-white border-l-2 border-white border-r-2 border-gray-500 border-b-2 border-gray-500 shadow-sm">
      <nav className="flex items-center text-sm gap-x-10">
        <Link href="/master-barang" className="hover:text-purple-900 transition-colors">
          MASTER BARANG
        </Link>
        <Link href="/koreksi-stok" className="hover:text-purple-900 transition-colors">
          KOREKSI STOK
        </Link>
        <Link href="/proses-order" className="hover:text-purple-900 transition-colors">
          PROSES ORDER
        </Link>
        <Link href="/receiving" className="hover:text-purple-900 transition-colors">
          RECEIVING
        </Link>

        <div className="border-l-2 border-gray-500 h-6 mx-6"></div>

        <Link href="/laporan/produk" className="hover:text-purple-900 transition-colors">
          LAPORAN PRODUK
        </Link>
        <Link href="/laporan/order" className="hover:text-purple-900 transition-colors">
          LAPORAN ORDER
        </Link>
        <Link href="/laporan/receive" className="hover:text-purple-900 transition-colors">
          LAPORAN RECEIVE
        </Link>
      </nav>
    </header>
  );
}
