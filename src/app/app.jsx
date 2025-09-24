import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-serif"></h1>
      <p className="mt-4"></p>
      <div className="mt-6">
        <Link href="/master-barang" className="text-blue-600 hover:underline">
     
        </Link>
      </div>
    </div>
  );
}