'use client';
import React, { useState } from 'react';
import { FormRow, FormInput, FormButton } from '@/components/Form';

export default function ProsesOrderPage() {
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Memproses order...');
    const payload = {
        NO_FAKTUR: `INV-${Date.now()}`,
        TGL_ORDER: tanggal
    };
    try {
      const response = await fetch(`${apiUrl}/orders/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal memproses order');
      }
      const result = await response.json();
      if (result.length > 0) {
        setMessage(`${result.length} produk berhasil diorder dengan No Faktur: ${payload.NO_FAKTUR}.`);
      } else {
        setMessage('Tidak ada produk yang perlu diorder saat ini.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Form Proses Order Barang</h1>
      <form onSubmit={handleSubmit}>
        <FormRow label="TANGGAL:">
          <FormInput type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-48" />
        </FormRow>
        <div className="flex gap-2 mt-4 ml-28">
          <FormButton type="submit" disabled={isLoading}>{isLoading ? 'MEMPROSES...' : 'PROSES'}</FormButton>
          <FormButton type="button" onClick={() => setMessage('')}>BATAL</FormButton>
        </div>
      </form>
      {message && <p className="mt-4 ml-28 text-sm">{message}</p>}
    </div>
  );
}