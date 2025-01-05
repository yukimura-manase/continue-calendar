import { CalendarCheck } from "lucide-react";
import { GoogleLoginButton } from "../../ui-parts/GoogleLoginButton";

/**
 * Global Header
 *
 * - Title: 継続カレンダー
 * - Google ログイン / ログアウト Button
 */
export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarCheck className="text-blue-500" />
          継続カレンダー
        </h1>

        {/* Nav */}
        <nav>
          {/* Google ログイン Button */}
          <GoogleLoginButton />
        </nav>
      </div>
    </header>
  );
};
