import type { Viewport } from 'next';
import AdminLayoutClient from './AdminLayoutClient';

export const viewport: Viewport = {
  width: 1200,
  initialScale: 0.3,
  maximumScale: 5,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}