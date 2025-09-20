// src/components/CollectionsWidget.jsx
import { useEffect, useState } from 'react';
import { Api } from '../services/api';

export default function CollectionsWidget({ granularity = 'daily' }) {
  const [rows, setRows] = useState([]);
  const [err, setErr]   = useState(null);

  useEffect(() => {
    Api.collections(`granularity=${granularity}`)
      .then(setRows)
      .catch(e => setErr(e.message));
  }, [granularity]);

  if (err) return <p style={{color:'crimson'}}>Error: {err}</p>;

  return (
    <div>
      <h3>Collections ({granularity})</h3>
      <ul>
        {rows.map((r, i) => (
          <li key={i}>{r.bucket} — {Number(r.total).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
