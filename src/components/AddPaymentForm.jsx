// src/components/AddPaymentForm.jsx
import { useState } from 'react';
import { Api } from '../services/api';

export default function AddPaymentForm() {
  const [payload, setPayload] = useState({
    admission_no: '',
    amount: '',
    paid_at: new Date().toISOString().slice(0,19).replace('T',' '),
    receipt_no: '',
    msisdn: '',
    account_ref: ''
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const onChange = e => setPayload(p => ({...p, [e.target.name]: e.target.value}));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg('');
    try {
      const body = {
        ...payload,
        amount: Number(payload.amount || 0)
      };
      await Api.addPayment(body);
      setMsg('Saved!');
      setPayload(p => ({...p, amount:'', receipt_no:''}));
    } catch (e) {
      setMsg(`Error: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="admission_no" placeholder="Admission #" value={payload.admission_no} onChange={onChange} />
      <input name="amount" placeholder="Amount" type="number" step="0.01" value={payload.amount} onChange={onChange} />
      <input name="paid_at" placeholder="YYYY-MM-DD HH:MM:SS" value={payload.paid_at} onChange={onChange} />
      <input name="receipt_no" placeholder="Receipt (optional)" value={payload.receipt_no} onChange={onChange} />
      <input name="msisdn" placeholder="MSISDN (optional)" value={payload.msisdn} onChange={onChange} />
      <input name="account_ref" placeholder="Account Ref (optional)" value={payload.account_ref} onChange={onChange} />
      <button disabled={saving}>{saving ? 'Saving…' : 'Save payment'}</button>
      {msg && <div style={{marginTop:8}}>{msg}</div>}
    </form>
  );
}
