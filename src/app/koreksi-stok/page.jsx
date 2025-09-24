'use client';
import React, { useState } from 'react';
import { FormRow, FormInput, FormButton } from '@/components/Form';

export default function KoreksiStokPage() {
  const [plu, setPlu] = useState('');
  const [product, setProduct] = useState(null);
  const [stokBaru, setStokBaru] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const resetState = () => {
    setPlu(''); setProduct(null); setStokBaru(''); setMessage('');
  };

  const searchProduct = async () => {
    if (!plu) return;
    setIsLoading(true);
    setMessage(`Mencari PLU: ${plu}...`);
    try {
      const response = await fetch(`${apiUrl}/products`);
      if (!response.ok) throw new Error('Gagal mengambil data produk');
      const products = await response.json();
      const foundProduct = products.find(p => p.PLU.toString() === plu);
      if (foundProduct) {
        setProduct(foundProduct);
        setMessage('Produk ditemukan.');
      } else {
        setProduct(null);
        setMessage('Produk tidak ditemukan.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product || !stokBaru) {
        setMessage('Cari produk dan isi stok baru terlebih dahulu.');
        return;
    }
    setMessage('Menyimpan koreksi...');
    setIsLoading(true);
    try {
        const response = await fetch(`${apiUrl}/stock/${product.PLU}/correct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ STOK_BARU: parseInt(stokBaru) })
        });
        if (!response.ok) throw new Error('Gagal menyimpan koreksi stok');
        setMessage('Koreksi stok berhasil disimpan!');
        resetState();
    } catch (error) {
        setMessage(`Error: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Form Transaksi Koreksi Stok</h1>
      <form onSubmit={handleSubmit}>
        <FormRow label="PLU:">
          <FormInput name="PLU" value={plu} onChange={(e) => setPlu(e.target.value)} onBlur={searchProduct} disabled={isLoading} className="w-48" />
        </FormRow>
        <FormRow label="DESCP:">
          <FormInput value={product ? product.DESCP : ''} disabled className="w-96" />
        </FormRow>
        <FormRow label="STOK LAMA:">
          <FormInput value={product ? product.STOK : ''} disabled className="w-48" />
        </FormRow>
        <FormRow label="STOK BARU:">
          <FormInput name="STOK_BARU" value={stokBaru} onChange={(e) => setStokBaru(e.target.value)} type="number" className="w-48" disabled={!product || isLoading} />
        </FormRow>
        <div className="flex gap-2 mt-4 ml-28">
          <FormButton type="submit" disabled={!product || isLoading || !stokBaru}>{isLoading ? 'MEMPROSES...' : 'SIMPAN'}</FormButton>
          <FormButton type="button" onClick={resetState}>BATAL</FormButton>
        </div>
      </form>
      {message && <p className="mt-4 ml-28 text-sm">{message}</p>}
    </div>
  );
}