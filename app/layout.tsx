import React from 'react';
import './globals.css'; // Si usas Tailwind, o si tienes un CSS global.
import { Inter } from 'next/font/google'; // Si usas una fuente de Google Fonts

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard de Usuarios',
  description: 'Una aplicación de análisis de usuarios.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-xl">Mi Dashboard</h1>
        </header>
        <main>{children}</main>
        <footer className="bg-blue-600 p-4 text-white text-center">
          <p>© 2025 Mi Empresa</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
