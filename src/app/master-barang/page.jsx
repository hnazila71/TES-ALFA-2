'use client';
import React, { useState } from 'react';
import { FormRow, FormInput, FormSelect, FormButton } from '@/components/Form';

export default function MasterBarangPage() {
  const [formData, setFormData] = useState({
    PLU: '', DESCP: '', HARGA_BELI: '', HARGA_JUAL: '',
    MIN_ORDER: '', MIN_STOK: '', MAX_STOK: '', TAG_PRODUK: 'F',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      PLU: '', DESCP: '', HARGA_BELI: '', HARGA_JUAL: '',
      MIN_ORDER: '', MIN_STOK: '', MAX_STOK: '', TAG_PRODUK: 'F'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Menyimpan...');
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Gagal menyimpan data');
      const result = await response.json();
      setMessage(`Produk ${result.DESCP} berhasil disimpan!`);
      resetForm();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBatal = () => {
     resetForm();
     setMessage('');
  };

  return (
    <div>
      <h1 className="page-title">Form Input Master Barang</h1>
      <form onSubmit={handleSubmit}>
        <FormRow label="PLU:">
          <FormInput name="PLU" value={formData.PLU} onChange={handleChange} required className="w-48" />
        </FormRow>
        <FormRow label="DESCP:">
          <FormInput name="DESCP" value={formData.DESCP} onChange={handleChange} required className="w-96" />
        </FormRow>
        <FormRow label="HARGA BELI:">
          <FormInput name="HARGA_BELI" value={formData.HARGA_BELI} onChange={handleChange} type="number" className="w-48" />
        </FormRow>
        <FormRow label="HARGA JUAL:">
          <FormInput name="HARGA_JUAL" value={formData.HARGA_JUAL} onChange={handleChange} type="number" className="w-48" />
        </FormRow>
        <FormRow label="MIN ORDER:">
          <FormInput name="MIN_ORDER" value={formData.MIN_ORDER} onChange={handleChange} type="number" className="w-48" />
        </FormRow>
        <FormRow label="MIN STOK:">
          <FormInput name="MIN_STOK" value={formData.MIN_STOK} onChange={handleChange} type="number" className="w-48" />
        </FormRow>
        <FormRow label="MAX STOK:">
          <FormInput name="MAX_STOK" value={formData.MAX_STOK} onChange={handleChange} type="number" className="w-48" />
        </FormRow>
        <FormRow label="TAG PRODUK:">
          <FormSelect name="TAG_PRODUK" value={formData.TAG_PRODUK} onChange={handleChange} className="w-48">
            <option value="F">Paling Laku (Aktif)</option>
            <option value="B">Laku Sedang (Aktif)</option>
            <option value="D">Non Aktif</option>
          </FormSelect>
        </FormRow>
        <div className="flex gap-2 mt-4 ml-28">
          <FormButton type="submit" disabled={isLoading}>{isLoading ? 'MENYIMPAN...' : 'SIMPAN'}</FormButton>
          <FormButton type="button" onClick={handleBatal}>BATAL</FormButton>
        </div>
      </form>
      {message && <p className="mt-4 ml-28 text-sm">{message}</p>}
    </div>
  );
}