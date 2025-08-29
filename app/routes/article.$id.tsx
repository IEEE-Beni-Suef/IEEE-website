import { useParams, Link } from "react-router";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { useGetArticleSubsection } from "~/hooks/useApi";
import { Section } from "~/components/ui/Section";
import type { MetaArgs } from "react-router";

export function meta({ params }: MetaArgs) {
  const articleId = params.id ? parseInt(params.id) : 0;
  return [
    { title: `Article ${articleId} - IEEE BNS` },
    {
      name: "description",
      content:
        "Read the latest article from IEEE BNS - Beni Suef University Student Branch.",
    },
  ];
}

export default function ArticleView() {
  const { id } = useParams();
  const articleId = id ? parseInt(id) : 0;

  const {
    data: article,
    isLoading,
    error,
  } = useGetArticleSubsection(articleId);

  if (isLoading) {
    return (
      <Section variant="default" padding="xl" className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 sm:mb-6"></div>
            <div className="h-48 sm:h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4 sm:mb-6"></div>
            <div className="space-y-3 sm:space-y-4">
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (error || !article) {
    return (
      <Section variant="default" padding="xl" className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-target text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section variant="default" padding="xl" className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <nav className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors font-medium group touch-target"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Articles</span>
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md">
              {article.category.name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed font-light">
            {article.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Keywords:
              </span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {article.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {article.photo && (
            <div className="aspect-video overflow-hidden rounded-lg mb-6 sm:mb-8 shadow-lg">
              <img
                src={article.photo}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </header>

        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          {article.subsections && article.subsections.length > 0 ? (
            article.subsections.map((subsection: any, index: number) => (
              <section key={subsection.id} className="mb-12 sm:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 border-b-2 border-blue-600 pb-2">
                  {subsection.subtitle}
                </h2>

                {subsection.photo ? (
                  <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start mb-6 sm:mb-8">
                    <div className="order-2 lg:order-1">
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base lg:text-lg">
                        {subsection.paragraph}
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                        <img
                          src={subsection.photo}
                          alt={subsection.subtitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
                    {subsection.paragraph}
                  </div>
                )}

                {index < article.subsections.length - 1 && (
                  <hr className="my-8 sm:my-12 border-gray-200 dark:border-gray-700" />
                )}
              </section>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8 text-sm sm:text-base">
              No content available for this article.
            </p>
          )}
        </div>

        <footer className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-sm sm:text-base touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </footer>
      </div>
    </Section>
  );
}
