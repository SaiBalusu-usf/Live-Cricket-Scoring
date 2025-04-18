'use client';

import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = url => fetch(url).then(r => r.json());

export default function Overlay() {
  const { data, error } = useSWR('/api/score', fetcher, { refreshInterval: 15000 });

  if (error) return null;
  if (!data) return null;

  const { teams = [], scores = [], status = '' } = data;

  return (
    <div className="w-full p-4 bg-transparent text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={scores.join('-')}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-mono"
        >
          {teams[0]} {scores[0]} / {scores[1]} – {teams[1]}
        </motion.div>
      </AnimatePresence>
      <div className="text-lg">{status}</div>
    </div>
  );
}
