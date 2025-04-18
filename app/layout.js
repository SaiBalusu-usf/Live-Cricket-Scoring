import './styles.css';

export const metadata = {
  title: 'Live Cricket Score',
  description: 'Dynamic live cricket scoreboard overlay',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
