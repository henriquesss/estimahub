import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'estimahub',
  description: 'O melhor lugar pra estimar tarefas',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <AuthProvider>
            <body className={inter.className}>{children}</body>
          </AuthProvider>
      </html>
  )
}
