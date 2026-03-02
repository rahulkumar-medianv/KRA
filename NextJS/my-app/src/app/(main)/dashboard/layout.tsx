export default function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h2>Dashboard Menu</h2>

      {children}
    </div>
  );
}