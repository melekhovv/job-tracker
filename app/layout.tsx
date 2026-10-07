import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Трекер откликов: Работа и Практика — Андрей Мелехов',
  description: 'Интерактивный трекер поиска работы и практики по сетевому и системному администрированию',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
