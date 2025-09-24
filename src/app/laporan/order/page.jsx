'use client';
import React, { useState, useEffect } from 'react';

export default function LaporanOrderPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('Memuat data...');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch(`${apiUrl}/orders`), fetch(`${apiUrl}/products`)
        ]);
        if (!ordersRes.ok || !productsRes.ok) throw new Error('Gagal mengambil data');
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        const productsMap = new Map(productsData.map(p => [p.PLU, p.DESCP]));
        const enrichedOrders = ordersData.map(order => ({
          ...order,
          DESCP: productsMap.get(order.PLU) || 'N/A',
          TOTAL: order.QTY * order.HARGA
        }));
        setOrders(enrichedOrders);
        if (enrichedOrders.length === 0) setMessage('Tidak ada data order.');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };
    fetchData();
  }, [apiUrl]);

  return (
    <div>
      <h1 className="report-title">Laporan Order Barang</h1>
      {orders.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>NO FAKTUR</th>
              <th>TANGGAL</th>
              <th>PLU</th>
              <th>DESCP</th>
              <th>QTY</th>
              <th>HARGA BELI</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={`${o.NO_FAKTUR}-${o.PLU}`}>
                <td className="text-center">{index + 1}</td>
                <td>{o.NO_FAKTUR}</td>
                <td className="text-center">{new Date(o.TGL_ORDER).toLocaleDateString('id-ID')}</td>
                <td>{o.PLU}</td>
                <td>{o.DESCP}</td>
                <td className="text-center">{o.QTY}</td>
                <td className="text-right">{o.HARGA.toLocaleString('id-ID')}</td>
                <td className="text-right">{o.TOTAL.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p className="text-center mt-4">{message}</p>)}
    </div>
  );
}