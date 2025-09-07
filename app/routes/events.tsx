import type { MetaArgs } from "react-router";
import { Section } from "~/components/ui/Section";
import { ArticleDisplay } from "../components/ArticleDisplay";
import { useAllArticles } from "../hooks/useApi";
import type { Article } from "../types";


export function meta({}: MetaArgs) {
  return [
    { title: "Events - IEEE BNS" },
    {
      name: "description",
      content: "Discover upcoming IEEE BNS events, workshops, and activities",
    },
  ];
}

export default function Events() {
  const { data: articles, isLoading, error } = useAllArticles();

  // Filter articles to show only those with the "event" category
  const filteredArticles = articles
    ? articles.filter((article: Article) => article.categoryName === 'Events' && typeof article.id === 'number' && article.id > 22)
    : [];

  return (
    <>
      {/* Articles Section */}
      <Section id="articles" padding="xl" className="bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Events
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article: Article) => (
              <ArticleDisplay key={article.id} article={article} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}