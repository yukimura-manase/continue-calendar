import { CalendarCheck } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarCheck className="text-blue-500" />
          継続カレンダー
        </h1>

        <nav className="mt-4 flex gap-4">
          <a href="#" className="text-gray-900 hover:text-gray-700">
            ホーム
          </a>
          <a href="#" className="text-gray-900 hover:text-gray-700">
            設定
          </a>
        </nav>
      </div>
    </header>
  );
};
