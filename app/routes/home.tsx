import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ArticleDisplay } from "../components/ArticleDisplay";
import { useAllArticles, useCommittees } from "../hooks/useApi";
import { Link, type MetaArgs } from "react-router";
import type { Article, Committee } from "../types";
import {
  Users,
  Calendar,
  Wrench,
  Handshake,
  ArrowRight,
  Rocket,
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

export function meta({}: MetaArgs) {
  return [
    { title: "IEEE BNS - Beni Suef University Student Branch" },
    {
      name: "description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
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
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Calculate pagination
  const totalPages = articles
    ? Math.ceil(articles.length / articlesPerPage)
    : 0;
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles ? articles.slice(startIndex, endIndex) : [];

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
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    if (currentPage > 3) pages.push(1, '...');
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...', totalPages);
    return pages;
  };

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl">
        <div className="max-w-7xl mx-auto  text-center">
          <div className="space-y-8">
            {/* IEEE Logo and Navigation */}
            <div className="flex flex-col items-center space-y-4 mb-12">
                <figure className="h-24 p-2">
                <Logo />
              </figure>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Institute of Electrical and Electronics Engineers
              </p>
            </div>

            {/* Main Tagline */}
            <div className="space-y-4">
              <p className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl font-medium tracking-wide uppercase">
                It's not faith in technology
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-tight">
                IEEE BNS
              </h1>
              <p className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl font-medium tracking-wide uppercase">
                It's faith in people
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Beni Suef University Student Branch - Empowering the next
              generation of engineers and innovators
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link to="/Register">
                <Button size="xl" variant="gradient" className="min-w-48">
                  <Rocket className="w-5 h-5" />
                  Join IEEE BNS
                </Button>
              </Link>
              <Link to="/about">
                <Button size="xl" variant="outline" className="min-w-48">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* About IEEE Section */}
      <Section id="about" variant="primary" padding="xl">
        <div className="max-w-7xl mx-auto ">
          <SectionHeader>
            <SectionTitle className="text-blue-600 dark:text-blue-400">
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
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
                  What is IEEE?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  IEEE is the world's largest technical professional
                  association, focused on advancing technology for the benefit
                  of humanity. It publishes a wide range of journals and
                  standards in the fields of electrical engineering and computer
                  science.
                </p>
              </Card>

              <Card variant="elevated" className="p-8">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4">
                  Who Are We?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                      className="p-6 text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Committees Section */}
      <Commitees />

      <Section id="articles" padding="xl" className="bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest News & Articles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest developments, events, and insights
              from our IEEE BNS community.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Loading articles...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">
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
                      if (typeof page === 'string') {
                        return <span key={page} className="px-2 text-gray-500">...</span>;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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
              <p className="text-gray-600 dark:text-gray-400">
                No articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </Section>


      <footer className="relative bg-white dark:bg-gray-900 text-gray-600 dark:text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-500 dark:bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6 h-24 w-fit">
                <Logo />
              </div>
              <p className="text-gray-800 dark:text-gray-300  mb-6 max-w-md leading-relaxed">
                Empowering students through technology, fostering innovation, and building a community of future engineering leaders at Beni Suef University.
              </p>
              
              {/* Social Media Links */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.facebook.com/ieee.bns" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-300 hover:text-white dark:bg-gray-800  hover:bg-blue-600  rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/ieee-benisuef-student-branch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-300 hover:text-white dark:bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/orgs/IEEE-Beni-Suef" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-300 hover:text-white dark:bg-gray-800 hover:bg-black rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-300 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    Events
                  </Link>
                </li>
                <li>
                  <a href="#committees" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    Committees
                  </a>
                </li>
                <li>
                  <a href="#articles" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    Articles
                  </a>
                </li>
                {/* <li>
                  <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    Contact
                  </Link>
                </li> */}
                <li>
                  <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    Join IEEE
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-300 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors" />
                  <div>
                    <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">Beni Suef University</span>
                    <br />
                    <span className="text-gray-400 text-sm">Beni Suef, Egypt</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors" />
                  <a
                    href="mailto:info@ieeebns.org"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    benisuef.ieee@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} IEEE BNS. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
