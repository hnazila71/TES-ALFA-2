'use client';
import React, { useState, useEffect } from 'react';

export default function LaporanReceivePage() {
  const [receives, setReceives] = useState([]);
  const [message, setMessage] = useState('Memuat data...');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [receivesRes, ordersRes, productsRes] = await Promise.all([
          fetch(`${apiUrl}/receive`), fetch(`${apiUrl}/orders`), fetch(`${apiUrl}/products`),
        ]);
        if (!receivesRes.ok || !ordersRes.ok || !productsRes.ok) throw new Error('Gagal mengambil data');
        const receivesData = await receivesRes.json();
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        const ordersMap = new Map(ordersData.map(o => [`${o.NO_FAKTUR}-${o.PLU}`, o]));
        const productsMap = new Map(productsData.map(p => [p.PLU, p.DESCP]));
        const enrichedReceives = receivesData.map(r => {
            const orderInfo = ordersMap.get(`${r.NO_FAKTUR}-${r.PLU}`) || {};
            return {
                ...r,
                DESCP: productsMap.get(r.PLU) || 'N/A',
                TGL_ORDER: orderInfo.TGL_ORDER,
                QTY_ORDER: orderInfo.QTY,
                TOTAL: r.QTY * r.HARGA_BELI
            }
        });
        setReceives(enrichedReceives);
        if (enrichedReceives.length === 0) setMessage('Tidak ada data penerimaan barang.');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };
    fetchData();
  }, [apiUrl]);

  return (
    <div>
      <h1 className="report-title">Laporan Receive Barang</h1>
      {receives.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>NO FAKTUR</th>
              <th>TANGGAL ORDER</th>
              <th>TANGGAL RECEIVE</th>
              <th>PLU</th>
              <th>DESCP</th>
              <th>QTY ORDER</th>
              <th>QTY REC</th>
              <th>HARGA BELI</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {receives.map((r, index) => (
              <tr key={`${r.NO_FAKTUR}-${r.PLU}-${index}`}>
                <td className="text-center">{index + 1}</td>
                <td>{r.NO_FAKTUR}</td>
                <td className="text-center">{r.TGL_ORDER ? new Date(r.TGL_ORDER).toLocaleDateString('id-ID') : '-'}</td>
                <td className="text-center">{new Date(r.TGL_RECEIVE).toLocaleDateString('id-ID')}</td>
                <td>{r.PLU}</td>
                <td>{r.DESCP}</td>
                <td className="text-center">{r.QTY_ORDER || '-'}</td>
                <td className="text-center">{r.QTY}</td>
                <td className="text-right">{r.HARGA_BELI.toLocaleString('id-ID')}</td>
                <td className="text-right">{r.TOTAL.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p className="text-center mt-4">{message}</p>)}
    </div>
  );
}