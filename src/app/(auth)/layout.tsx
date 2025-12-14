export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center p-4">
      {children}
    </div>
  );
}
