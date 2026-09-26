import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Sidebar />

      <div className="lg:pl-60">
        <Header />

        <main className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}