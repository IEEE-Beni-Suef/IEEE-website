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
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            IEEE BSU
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Beni Suef University Student Branch
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Connecting students with technology, innovation, and professional
            development opportunities in electrical engineering and related
            fields.
          </p>
        </div>

        {/* Articles Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Latest Articles
          </h2>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Failed to load articles. Please try again later.
              </p>
            </div>
          )}

          {articles && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any) => (
                <ArticleDisplay key={article.id} article={article} />
              ))}
            </div>
          )}

          {articles && articles.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
