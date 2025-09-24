'use client';
import React, { useState, useEffect } from 'react';

export default function LaporanProdukPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('Memuat data...');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) throw new Error('Gagal mengambil data');
        const data = await response.json();
        setProducts(data);
        if (data.length === 0) setMessage('Tidak ada data produk.');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };
    fetchData();
  }, [apiUrl]);

  return (
    <div>
      <h1 className="report-title">Laporan Data Barang</h1>
      {products.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>PLU</th>
              <th>DESCP</th>
              <th>QTY</th>
              <th>HARGA BELI</th>
              <th>HARGA JUAL</th>
              <th>MARGIN</th>
              <th>MIN STOK</th>
              <th>MIN ORDER</th>
              <th>TAG</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.PLU}>
                <td className="text-center">{index + 1}</td>
                <td>{p.PLU}</td>
                <td>{p.DESCP}</td>
                <td className="text-center">{p.STOK}</td>
                <td className="text-right">{p.HARGA_BELI.toLocaleString('id-ID')}</td>
                <td className="text-right">{p.HARGA_JUAL.toLocaleString('id-ID')}</td>
                <td className="text-right">{(p.HARGA_JUAL - p.HARGA_BELI).toLocaleString('id-ID')}</td>
                <td className="text-center">{p.MIN_STOK}</td>
                <td className="text-center">{p.MIN_ORDER}</td>
                <td className="text-center">{p.TAG_PRODUK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p className="text-center mt-4">{message}</p>)}
    </div>
  );
}