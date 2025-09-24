'use client';
import React, { useState, useEffect } from 'react';
import { FormInput, FormButton } from '@/components/Form';

export default function ReceivingPage() {
  const [noFaktur, setNoFaktur] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const searchOrder = async () => {
    if (!noFaktur) return;
    setIsLoading(true);
    setMessage('Mencari data order...');
    try {
      const [allOrdersRes, allProductsRes] = await Promise.all([
        fetch(`${apiUrl}/orders`),
        fetch(`${apiUrl}/products`)
      ]);
      if (!allOrdersRes.ok || !allProductsRes.ok) throw new Error('Gagal mengambil data');
      
      const allOrders = await allOrdersRes.json();
      const allProducts = await allProductsRes.json();
      const productsMap = new Map(allProducts.map(p => [p.PLU, p.DESCP]));
      const foundOrders = allOrders.filter(o => o.NO_FAKTUR === noFaktur);

      if (foundOrders.length > 0) {
        setOrderData(foundOrders[0]);
        const enrichedItems = foundOrders.map(o => ({ 
          ...o, 
          DESCP: productsMap.get(o.PLU) || 'N/A',
          QTY_REC: o.QTY, 
          TOTAL: o.HARGA * o.QTY
        }));
        setItems(enrichedItems);
        setMessage('Data order ditemukan.');
      } else {
        setOrderData(null); setItems([]);
        setMessage('No Faktur tidak ditemukan.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQtyRecChange = (plu, value) => {
    setItems(prev => prev.map(item =>
        item.PLU === plu ? { ...item, QTY_REC: parseInt(value) || 0, TOTAL: item.HARGA * (parseInt(value) || 0) } : item
    ));
  };
  
  const resetForm = () => {
    setNoFaktur(''); setOrderData(null); setItems([]); setMessage('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setMessage('Menyimpan data penerimaan...');
    setIsLoading(true);
    const payload = {
      NO_FAKTUR: noFaktur,
      TGL_RECEIVE: new Date().toISOString().split('T')[0],
      ITEMS: items.map(({ PLU, QTY_REC, HARGA }) => ({ PLU, QTY: QTY_REC, HARGA_BELI: HARGA }))
    };
    try {
      const response = await fetch(`${apiUrl}/receive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Gagal menyimpan data penerimaan');
      setMessage('Data penerimaan berhasil disimpan!');
      resetForm();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Form Receiving</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center">
            <label className="w-24 shrink-0">NO FAKTUR:</label>
            <FormInput value={noFaktur} onChange={(e) => setNoFaktur(e.target.value)} onBlur={searchOrder} disabled={isLoading} className="w-48" />
          </div>
          {orderData && (
            <div className="flex items-center">
              <label className="w-24 shrink-0">TGL ORDER:</label>
              <FormInput value={new Date(orderData.TGL_ORDER).toLocaleDateString('id-ID')} disabled className="w-48 bg-gray-300" />
            </div>
          )}
        </div>
        <table className="report-table mt-4">
          <thead>
            <tr>
              <th>NO</th>
              <th>PLU</th>
              <th>DESCP</th>
              <th>QTY ORDER</th>
              <th>QTY REC</th>
              <th>HARGA BELI</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={item.PLU}>
                <td className="text-center">{index + 1}</td>
                <td>{item.PLU}</td>
                <td>{item.DESCP}</td>
                <td className="text-center">{item.QTY}</td>
                <td><FormInput type="number" value={item.QTY_REC} onChange={(e) => handleQtyRecChange(item.PLU, e.target.value)} className="w-20 mx-auto block" disabled={isLoading}/></td>
                <td className="text-right">{item.HARGA.toLocaleString('id-ID')}</td>
                <td className="text-right">{item.TOTAL.toLocaleString('id-ID')}</td>
              </tr>
            )) : (
              <tr><td colSpan="7" className="p-2 text-center h-8">{message || 'Tidak ada data.'}</td></tr>
            )}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4">
          <FormButton type="submit" disabled={isLoading || items.length === 0}>{isLoading ? 'MENYIMPAN...' : 'SIMPAN'}</FormButton>
          <FormButton type="button" onClick={resetForm}>BATAL</FormButton>
        </div>
      </form>
    </div>
  );
}