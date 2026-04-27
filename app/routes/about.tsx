import type { MetaArgs } from "react-router";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import Logo from "~/components/ui/Logo";
import { Link } from "react-router";
import { Rocket, Users, Brain, Network } from "lucide-react";

export function meta({}: MetaArgs) {
  return [
    { title: "About - IEEE BNS" },
    {
      name: "description",
      content: "Learn about IEEE BNS and our mission at Beni Suef University",
    },
  ];
}

const About = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section variant="gradient" padding="xl" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto mt-14">
          <div className="text-center space-y-8">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Transform Your University Years
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              IEEE Beni Suef Student Branch is where students transform their university 
              years into a journey of growth, learning, and achievement. Whether you are 
              passionate about technology, leadership, or simply want to expand your 
              horizons.
            </p>
          </div>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-7xl mx-auto">
          <SectionHeader>
            <SectionTitle>Our Journey</SectionTitle>
            <SectionSubtitle>
              Key milestones in our branch's history
            </SectionSubtitle>
          </SectionHeader>

          <div className="relative mt-10">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>

            {/* Timeline Items */}
            <div className="space-y-24 relative">
              {/* 2017 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 text-center md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2017</h3>
                  <p className="text-gray-600 dark:text-gray-300">Branch Establishment</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center z-10">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="flex-1 md:pl-12">
                  <Card variant="glass" className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      IEEE BNS was founded, marking the beginning of our journey to empower students
                      through technology and innovation.
                    </p>
                  </Card>
                </div>
              </div>

              {/* 2022 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 text-center md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2022</h3>
                  <p className="text-gray-600 dark:text-gray-300">Space Committees Launch</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center z-10">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="flex-1 md:pl-12">
                  <Card variant="glass" className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      Expansion into space technologies with the establishment of Astronomy & GNC Committees,
                      opening new frontiers for student research and innovation.
                    </p>
                  </Card>
                </div>
              </div>

              {/* 2025 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 text-center md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2025</h3>
                  <p className="text-gray-600 dark:text-gray-300">Web Development Committees</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center z-10">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="flex-1 md:pl-12">
                  <Card variant="glass" className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      Formation of the Front End & Back End Commitees, focusing on modern web technologies
                      and creating real-world applications for the digital age.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

{/* Features Section */}
      <Section padding="xl">
        <div className="max-w-7xl mx-auto">
          <SectionHeader>
            <SectionTitle>Our Impact Areas</SectionTitle>
            <SectionSubtitle>
              Discover how IEEE BNS empowers students through multiple dimensions of growth
            </SectionSubtitle>
          </SectionHeader>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Growth */}
            <Card variant="feature" className="p-8 space-y-6">
              <div className="flex justify-center">
                <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                Technical Growth and Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Through projects, workshops, and competitions, students gain hands-on 
                experience in fields such as space technologies, AI, data analysis, and more. 
                Over the past three years alone, more than 500 students have been involved 
                in technical activities that push the boundaries of innovation.
              </p>
            </Card>

            {/* Soft Skills */}
            <Card variant="feature" className="p-8 space-y-6">
              <div className="flex justify-center">
                <Users className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                Soft Skills and Leadership
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Beyond technology, IEEE Beni Suef focuses on building essential life 
                and career skills. Students engage in activities that enhance leadership, 
                teamwork, communication, and creativity—qualities that employers and 
                future ventures demand.
              </p>
            </Card>

            {/* Community */}
            <Card variant="feature" className="p-8 space-y-6">
              <div className="flex justify-center">
                <Network className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                Community and Networking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Being part of IEEE Beni Suef means joining a community of ambitious 
                students who share knowledge, support each other, and connect with 
                industry professionals. With a reach of more than 12,000 students 
                through social media and events, the branch creates a strong impact in 
                both the university and the wider tech community.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* SAC Section */}
      <Section variant="gradient" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                IEEE Student Activities Committee (SAC)
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  The IEEE Student Activities Committee (SAC) is a global network within IEEE 
                  dedicated to supporting and nurturing student members. As the central body 
                  overseeing programs and activities for over 100,000 student members worldwide, 
                  SAC plays a crucial role in shaping the future of engineering education and 
                  professional development.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Operating at multiple levels - global, regional (IEEE Region 8 SAC), and local 
                  (IEEE Egypt Section SAC) - the committee works closely with university Student 
                  Branches to create impactful events, competitions, and networking opportunities.
                </p>
                <div className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Key Focus Areas
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Providing high-quality IEEE experiences for students
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Supporting career development and preparation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Recognizing outstanding student achievements
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Providing resources for Student Branch success
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm"></div>
              <Card variant="glass" className="relative p-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Global Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100k+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Student Members</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">IEEE Regions</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg col-span-2">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3000+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Student Branches</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Egypt Section Section */}
      <Section padding="xl" className="bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Historical Timeline */}
            <div className="md:col-span-4">
              <Card variant="feature" className="p-8 mt-22">
                <div className="space-y-6 ">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mx-auto">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">1955</span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
                    Historical Legacy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Established in 1955, making it the <strong>Second IEEE Section in Region 8</strong>,
                    covering Africa, Europe, and the Middle East.
                  </p>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    IEEE Egypt Section
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    A cornerstone of engineering excellence in Egypt, the IEEE Egypt Section serves
                    as a vital bridge between academia, industry, and government. Through its extensive
                    network of technical Student Branches and Chapters, Continues to be a vital hub for professional development, technological collaboration
                    enriching the journey of students and young professionals in their engineering careers

                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                          Signature initiative: 
                        <span className="text-gray-600 dark:text-gray-300"><strong> Egyptian Engineering Day (EED)</strong> - Annual flagship event showcasing innovation
                        </span>
                   </p>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                  {/* Affinity Groups */}
                  <Card variant="glass" className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Affinity Groups
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong>Student Branches (SB):</strong>Nurturing future engineering leaders
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong>Young Professionals (YP):</strong> Supporting early-career engineers
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong>Women in Engineering (WIE):</strong> Promoting gender diversity
                        </span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

{/* Region 8 Section */}
      <Section variant="secondary" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map and Stats Column */}
            <div className="lg:col-span-1">
              <Card variant="glass" className="p-6 space-y-6">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
                  IEEE Region 8
                </h3>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1963</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Established Year</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">64</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Geographic Coverage
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Europe
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Middle East
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Africa
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Main Content Columns */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  IEEE's Largest Geographic Region
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  As IEEE's most extensive geographic region, Region 8 represents a diverse and 
                  multicultural community of professionals and students across Europe, the Middle East, 
                  and Africa. Since its establishment, it has been at the forefront of 
                  technological advancement and professional development.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Events and Conferences */}
                <Card variant="elevated" className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Major Events & Conferences
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        AFRICON - African conference
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        EUROCON - European flagship conference
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        MELECON - Mediterranean conference
                      </span>
                    </li>
                  </ul>
                </Card>

                {/* Standards and Technology */}
                <Card variant="elevated" className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Promote the adoption of IEEE standards like
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        IEEE 802.11 (Wi-Fi) standards
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        IEEE 802.3 (Ethernet) specifications
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Focus Areas */}
              <Card variant="glass" className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Focus Areas
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Young Professionals Development</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Student Activities</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Women in Engineering</span>
                    </div>
                    <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Humanitarian technology initiatives</span>
                    </div>
                  </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Start Your Journey Section */}
      <Section variant="primary" padding="xl">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            This is your chance to be part of something bigger.
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Start Your Journey Today!
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Join a community of innovators, leaders, and changemakers at IEEE Beni Suef 
            Student Branch.
          </p>
          <Link to="/Register">
            <Button size="xl" className="bg-blue-500 text-white cursor-pointer">
              <Rocket className="w-5 h-5 mr-2" />
              Join IEEE BNS
            </Button>
          </Link>
        </div>
      </Section>
    </main>
  );
};

export default About;
