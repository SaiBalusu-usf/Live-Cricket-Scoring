'use client';

import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = url => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR('/api/score', fetcher, { refreshInterval: 15000 });

  if (error) return <div className="p-4 text-red-500">Failed to load.</div>;
  if (!data) return <div className="p-4">Loading…</div>;

  const { teams = [], scores = [], status = '' } = data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">{teams.join(' vs ')}</h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={scores.join('-')}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-mono mb-2"
        >
          {scores.join(' / ')}
        </motion.div>
      </AnimatePresence>

      <div className="text-xl italic">{status}</div>
    </main>
  );
}
