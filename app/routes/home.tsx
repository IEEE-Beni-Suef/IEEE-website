import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Section } from "../components/ui/Section";
import { ArticleDisplay } from "../components/ArticleDisplay";
import { useAllArticles } from "../hooks/useApi";
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "IEEE BSU - Beni Suef University Student Branch" },
    {
      name: "description",
      content:
        "Join IEEE BSU - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
  ];
}

export default function Home() {
  const { data: articles, isLoading, error } = useAllArticles();

  return (
    <Section variant="gradient" padding="xl" className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            IEEE BSU
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8">
            Beni Suef University Student Branch
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Connecting students with technology, innovation, and professional
            development opportunities in electrical engineering and related
            fields.
          </p>
        </div>

        {/* Articles Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
            Latest Articles
          </h2>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3"></div>
                    <div className="h-4 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 sm:mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                Failed to load articles. Please try again later.
              </p>
            </div>
          )}

          {articles && articles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((article: any) => (
                <ArticleDisplay key={article.id} article={article} />
              ))}
            </div>
          )}

          {articles && articles.length === 0 && !isLoading && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                No articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
