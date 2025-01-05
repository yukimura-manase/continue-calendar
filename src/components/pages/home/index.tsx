import { Header } from "@/components/shared/ui-elements/Header";
import { ContinueTargetSection } from "./parts/ContinueTargetSection";

/**
 * Top ページ
 */
export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 継続目標の設定 Section */}
          <ContinueTargetSection />
        </div>
      </main>
    </div>
  );
};
