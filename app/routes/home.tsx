import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ArticleDisplay } from "../components/ArticleDisplay";
import {
  useAllArticles,
  useAllSponsors,
  useCommittees,
  useCreateSponsor,
  useDeleteSponsor,
  useUpdateSponsor,
} from "../hooks/useApi";
import { Link, type MetaArgs } from "react-router";
import type { Article, Committee } from "../types";
import {
  Users,
  Calendar,
  Wrench,
  Handshake,
  ArrowRight,
  Rocket,
  ChartNoAxesCombined,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Mail,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react";
import { useState } from "react";
import Commitees from "../routes/commitees";
import Logo from "~/components/ui/Logo";
import { property } from "zod";
import SponsersSection from "~/components/Sponsors/SponserSection";

import toast from "react-hot-toast";

import HeroSection from "../components/home/HeroSection";
import Events from "../components/home/Events"
import About from "../components/home/About"
import Footer from "../components/home/Footer"





export function meta({}: MetaArgs) {
  return [
    { title: "IEEE BNS - Beni Suef University Student Branch" },
    {
      name: "description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
    {
      property: "og:title",
      content: "IEEE BNS - Beni Suef University Student Branch",
    },
    {
      property: "og:description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
    {
      property: "og:image",
      content: "https://ieee-mangment.vercel.app/og-image.jpg",
    },
    {
      name: "twitter:title",
      content: "IEEE BNS - Beni Suef University Student Branch",
    },
    {
      name: "twitter:description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
    {
      name: "twitter:image",
      content: "https://ieee-mangment.vercel.app/og-image.jpg",
    },
  ];
}

export default function Home() {
  const { data: articles, isLoading, error } = useAllArticles();
  const {
    data: committees,
    isLoading: committeesLoading,
    error: committeesError,
  } = useCommittees();

  const statistics = [
    { label: "Active Members", value: "250+", icon: Users },
    { label: "Events Organized", value: "50+", icon: Calendar },
    { label: "Technical Workshops", value: "30+", icon: Wrench },
    { label: "Industry Partnerships", value: "15+", icon: Handshake },
    {
      label: "Social Media Reach",
      value: "12,000+",
      icon: ChartNoAxesCombined,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Filter articles to show only those
  const filteredArticles = articles
    ? articles.filter((article: Article) => article.categoryName !== "Events")
    : [];

  // Calculate pagination
  // const totalPages = articles? Math.ceil(articles.length / articlesPerPage): 0;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  // const currentArticles = articles ? articles.slice(startIndex, endIndex) : [];
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    if (currentPage > 3) pages.push(1, "...");
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...", totalPages);
    return pages;
  };

  return (
    <>

      <HeroSection />
      <About />
      <Events />

      {/* About IEEE Section
      <Section id="about" variant="primary" padding="xl">
        <div className="max-w-7xl mx-auto ">
          <SectionHeader>
            <SectionTitle className="text-blue-600">
              IEEE BNS: Where Knowledge Meets Passion!
            </SectionTitle>
            <SectionSubtitle>
              Connecting students with cutting-edge technology, professional
              development, and innovation opportunities
            </SectionSubtitle>
          </SectionHeader>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card variant="feature" className="p-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                  What is IEEE?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  IEEE is the world's largest technical professional
                  association, focused on advancing technology for the benefit
                  of humanity. It publishes a wide range of journals and
                  standards in the fields of electrical engineering and computer
                  science.
                </p>
              </Card>

              <Card variant="elevated" className="p-8">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  Who Are We?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  IEEE BNS Student Branch is a volunteer organization at Beni
                  Suef University, led by students. Our branch consists of two
                  societies: Technical Society and Non-Technical Society.
                </p>
              </Card>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {statistics.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card
                      key={index}
                      variant="glass"
                      hover
                      glow
                      className={`p-6 text-center ${
                        index === statistics.length - 1
                          ? "col-span-2 mx-auto"
                          : ""
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section> */}

      {/* Committees Section */}
      <Commitees />

      <Section id="articles" padding="xl" className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest News & Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments, events, and insights
              from our IEEE BNS community.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">
                Loading articles...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">
                Failed to load articles. Please try again later.
              </p>
            </div>
          ) : currentArticles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {currentArticles.map((article: Article) => (
                  <ArticleDisplay key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-0  md:mr-2" />
                    <span className="hidden md:inline">Previous</span>
                  </Button>

                  <div className="flex items-center space-x-2">
                    {getVisiblePages(currentPage, totalPages).map((page) => {
                      if (typeof page === "string") {
                        return (
                          <span key={page} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center"
                  >
                    <span className="hidden md:inline">Next</span>
                    <ChevronRight className="w-4 h-4 ml-0 md:ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* Sponsers Section */}

      <SponsersSection />


      <Footer />
    </>
  );
}
