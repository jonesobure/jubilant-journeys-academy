// src/components/StudentsList.jsx
import { useEffect, useState } from 'react';
import { Api } from '../services/api';
import { toQuery } from '../utils/query';

export default function StudentsList({ cls, stream }) {
  const [rows, setRows]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); setError(null);
    Api.students(toQuery({ class: cls, stream }))
      .then(setRows)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [cls, stream]);

  if (loading) return <p>Loading students…</p>;
  if (error)   return <p style={{color:'crimson'}}>Error: {error}</p>;

  return (
    <ul>
      {rows.map(r => (
        <li key={r.admission_no}>
          {r.admission_no} — {r.student_name} ({r.class}{r.stream ? ` / ${r.stream}` : ''})
        </li>
      ))}
    </ul>
  );
}
