// src/components/BalancesTable.jsx
import { useEffect, useState } from 'react';
import { Api } from '../services/api';
import { toQuery } from '../utils/query';

export default function BalancesTable({ cls, stream }) {
  const [rows, setRows]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); setError(null);
    const qs = toQuery({ class: cls, stream });
    Api.balances(qs)
      .then(setRows)
      .catch(err => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [cls, stream]);

  if (loading) return <p>Loading balances…</p>;
  if (error)   return <p style={{color:'crimson'}}>Error: {error}</p>;
  if (!rows.length) return <p>No data.</p>;

  const fmt = n => Number(n).toLocaleString();

  return (
    <table>
      <thead>
        <tr>
          <th>Adm #</th><th>Student</th><th>Class</th><th>Stream</th>
          <th>Required</th><th>Paid</th><th>Outstanding</th><th>Last Payment</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.admission_no}>
            <td>{r.admission_no}</td>
            <td>{r.student_name}</td>
            <td>{r.class}</td>
            <td>{r.stream || '-'}</td>
            <td>{fmt(r.required_fee)}</td>
            <td>{fmt(r.fees_paid)}</td>
            <td>{fmt(r.outstanding)}</td>
            <td>{r.last_payment_date ? new Date(r.last_payment_date).toLocaleString() : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
