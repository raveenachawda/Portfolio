import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Briefcase, Code2, GraduationCap, User, ExternalLink, ChevronRight, Terminal, X, CheckCircle2, Phone, Menu } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

import insaaf1 from './assets/inssaf.png';
import insaaf2 from './assets/insaf5.png';
import insaaf3 from './assets/insaf2.png';
import insaaf4 from './assets/insaaf4.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Add a small delay to let the mobile menu closing animation start
    // so it doesn't interrupt the smooth scrolling on mobile devices
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 80; // approximate navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 10);
  };
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c3dcc886-8aa2-4814-8337-d23f377f6459",
          ...formData
        }),
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const travelProjectInfo = {
    title: "Travel Booking Platform",
    overview: "A comprehensive B2B/B2C travel booking platform where agencies and users can build, customize, and book complete travel packages.",
    features: [
      "Custom package creation & customization",
      "Book complete packages in one go",
      "Individual bookings (Sightseeing, Transfers, Hotels)",
      "Secure payment integration via Cashfree",
      "User inquiry management system",
      "Integrated travel blog section",
      "Fully mobile-responsive design"
    ],
    tech: ['React.js', 'Tailwind CSS', 'Redux', 'Third-Party APIs', 'Routing', 'Cashfree']
  };

  const legalProjectInfo = {
    title: "AI-Powered Legal Platform (Insaaf AI)",
    overview: "A revolutionary AI-powered Legal Operating System designed for lawyers, firms, and citizens to seamlessly draft, research, and automate legal workflows.",
    features: [
      "4 distinct chat modes: Case Research, Legal Q&A, Document Review, and Speech-to-Text / Text-to-Speech",
      "Seamless document upload and interaction",
      "Thread management to organize and persist chat history",
      "Custom project creation for organized workflow"
    ],
    tech: ['React.js', 'Tailwind CSS', 'REST APIs', 'Real-time', 'Voice APIs'],
    images: [insaaf1, insaaf2, insaaf3, insaaf4],
    link: "https://www.insaafai.com/"
  };

  const hireHubProjectInfo = {
    title: "HireHub",
    overview: "A centralized recruiting platform streamlining the recruitment process for organizations, enabling efficient management of job postings and candidate applications.",
    features: [
      "Job posting functionality for recruiters",
      "Seamless job application process for candidates",
      "Resume uploading and sharing",
      "Recruiter dashboard for viewing and shortlisting candidates",
      "Automated notification system for application status updates"
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Redux', 'API Integration', 'Authentication', 'SendGrid'],
    images: [] // No screenshots available yet
  };

  const activeInfo = selectedProject === 'travel' ? travelProjectInfo : 
                     selectedProject === 'legal' ? legalProjectInfo : 
                     selectedProject === 'hirehub' ? hireHubProjectInfo : null;

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-violet-500/30 scroll-smooth">
      {/* Premium Floating Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/40 backdrop-blur-xl border-b border-gray-800/60 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter text-white">Portfolio<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">.</span></span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all group-hover:w-full rounded-full"></span>
            </a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition-colors relative group">
              Experience
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all group-hover:w-full rounded-full"></span>
            </a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors relative group">
              Projects
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all group-hover:w-full rounded-full"></span>
            </a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition-colors relative group">
              Skills
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all group-hover:w-full rounded-full"></span>
            </a>
          </div>
          
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-transparent border border-white/20 rounded-full hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 shadow-sm">
            Contact Me
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800/60 bg-gray-950/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 space-y-2 font-medium">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="block w-full py-3 text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="block w-full py-3 text-gray-400 hover:text-white transition-colors">Experience</a>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="block w-full py-3 text-gray-400 hover:text-white transition-colors">Projects</a>
                <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="block w-full py-3 text-gray-400 hover:text-white transition-colors">Skills</a>
                <div className="pt-4 mt-2 border-t border-gray-800/60">
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="block w-full text-center px-4 py-3 text-black bg-white rounded-lg hover:bg-gray-200 transition-colors">
                    Contact Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section id="about" className="min-h-[80vh] flex flex-col justify-center relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10"
          >
            <motion.div variants={slideUp} className="inline-flex items-center space-x-2 bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-violet-500/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span>Available for new opportunities</span>
            </motion.div>

            <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Hi, I'm Raveena Chawda <br />
              <motion.span 
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-[length:200%_auto]"
              >
                Frontend Developer.
              </motion.span>
            </motion.h1>

            <motion.p variants={slideUp} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              I specialize in building high-performance, user-centric web applications. Proficient in React.js, Next.js, and TypeScript, I deliver scalable solutions with a focus on premium UI/UX.
            </motion.p>

            <motion.div variants={slideUp} className="flex items-center gap-6">
              <a href="#projects" className="bg-white text-gray-950 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                View My Work
              </a>
              <a href="/Raveena_Chawda_CV.pdf" download className="flex items-center gap-2 bg-transparent text-gray-300 border border-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:text-white hover:border-gray-500 transition-all hover:scale-105">
                Download CV &darr;
              </a>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/raveena-chawda-4a9769282" target="_blank" rel="noreferrer" className="p-3 bg-gray-900 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all hover:scale-110 border border-gray-800">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="text-violet-400 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
            </div>
            <div className="relative max-w-4xl mx-auto mt-4">
              {/* Main vertical line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-white/10" />

              {/* Experience 1 */}
              <motion.div variants={slideUp} className="relative pl-8 md:pl-24 pb-16 group">
                <div className="absolute left-[-5px] md:left-[27px] top-6 w-3 h-3 bg-gray-900 border-2 border-gray-600 rounded-full group-hover:border-gray-300 transition-colors duration-300" />
                <div className="bg-[#161616] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors duration-300 shadow-sm relative overflow-hidden">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-2xl font-bold text-white">Frontend Developer</h3>
                    <span className="inline-block px-4 py-1.5 bg-white/5 text-gray-300 text-sm font-medium rounded-full border border-white/10 whitespace-nowrap self-start md:self-auto">Aug 2025 – Present</span>
                  </div>
                  <p className="text-gray-400 text-lg mb-6 font-medium">Next Gen Tech Services, Indore</p>

                  <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span>Built a real-time travel booking interface with dynamic package customization (itinerary, hotels, activities).</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span>Architected scalable, reusable component systems for complex UI flows (dashboards, chat interfaces).</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span>Developed a modular chat-based UI system (Q&A, case search, document review) with real-time messaging, threads, and persistent history.</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span>Implemented file upload and document interaction flows for review systems.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Experience 2 */}
              <motion.div variants={slideUp} className="relative pl-8 md:pl-24 pb-4 group">
                <div className="absolute left-[-5px] md:left-[27px] top-6 w-3 h-3 bg-gray-900 border-2 border-gray-600 rounded-full group-hover:border-gray-300 transition-colors duration-300" />
                <div className="bg-[#161616] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors duration-300 shadow-sm relative overflow-hidden">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-2xl font-bold text-white">Mern Intern</h3>
                    <span className="inline-block px-4 py-1.5 bg-white/5 text-gray-300 text-sm font-medium rounded-full border border-white/10 whitespace-nowrap self-start md:self-auto">Jan 2025 – May 2025</span>
                  </div>
                  <p className="text-gray-400 text-lg mb-6 font-medium">Shanti infosoft LLP – Indore, India</p>

                  <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span><strong className="text-gray-300">Web Development:</strong> Developed React web applications, improving backend logic efficiency by 30%.</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span><strong className="text-gray-300">Frontend Integration:</strong> Utilize HTML, CSS, and JavaScript to integrate backend features effectively.</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span><strong className="text-gray-300">Learning & Growth:</strong> Acquire hands-on experience with software development best practices.</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 mr-3 group-hover:text-gray-400 transition-colors" />
                      <span>Collaborated using Git and GitHub for version control tested endpoints using Postman.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <div className="flex items-center gap-3 mb-12">
              <Code2 className="text-violet-400 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project 1 */}
              <motion.div 
                variants={slideUp}
                onClick={() => setSelectedProject('travel')}
                className="group rounded-2xl bg-[#161616] border border-white/5 p-8 hover:border-white/10 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-2"
              >
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">Travel Booking Platform</h3>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-white transition-colors"><ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" /></a>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed relative z-10">
                  Responsive B2B travel booking platform for Agencies with role-based access. Includes complete booking workflow, dynamic pricing, and secure online payment integration. Click to view full details.
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['React.js', 'Tailwind CSS', 'API Integration', 'Routing'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 text-sm font-medium rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div 
                variants={slideUp}
                onClick={() => setSelectedProject('legal')}
                className="group rounded-2xl bg-[#161616] border border-white/5 p-8 hover:border-white/10 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-2"
              >
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">AI-Powered Legal Platform</h3>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-white transition-colors"><ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" /></a>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed relative z-10">
                  Web application for AI-powered legal research with real-time AI chat interface, threaded conversations, and document upload/review workflows. Click to view full details.
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['React.js', 'Tailwind CSS', 'REST APIs', 'Real-time'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 text-sm font-medium rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div 
                variants={slideUp}
                onClick={() => setSelectedProject('hirehub')}
                className="group rounded-2xl bg-[#161616] border border-white/5 p-8 hover:border-white/10 transition-all duration-300 cursor-pointer relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-sm hover:shadow-md hover:-translate-y-2"
              >
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">HireHub</h3>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-white transition-colors"><ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" /></a>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed relative z-10">
                  A centralized recruiting platform streamlining the recruitment process for organizations, enabling efficient management of job postings and candidate applications. Click to view full details.
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['Next.js', 'Tailwind CSS', 'Redux', 'API Integration', 'Authentication', 'SendGrid'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 text-sm font-medium rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <div className="flex items-center gap-3 mb-12">
              <Terminal className="text-gray-400 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#161616] rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group shadow-sm">
                
                <h3 className="text-2xl font-bold mb-6 text-white">Frontend & Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite', 'Redux', 'HTML5', 'CSS3'].map(skill => (
                    <span key={skill} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-white/10 hover:border-white/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[#161616] rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group shadow-sm">
                
                <h3 className="text-2xl font-bold mb-6 text-white">Tools & Database</h3>
                <div className="flex flex-wrap gap-3">
                  {['Git', 'GitHub', 'MongoDB', 'MySQL', 'Postman', 'Vercel', 'VS Code'].map(skill => (
                    <span key={skill} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-white/10 hover:border-white/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <div className="flex items-center gap-3 mb-12">
              <GraduationCap className="text-gray-400 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
            </div>

            <div className="space-y-8">
              <div className="bg-[#161616] p-6 rounded-2xl border border-white/5 border-l-4 border-l-gray-600">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-2xl font-bold text-white">Master of Computer Applications</h3>
                  <span className="text-gray-400 font-medium mt-2 md:mt-0">Aug 2023 – Jun 2025</span>
                </div>
                <p className="text-gray-400 text-lg">Medi-Caps University, Indore, M.P.</p>
                <p className="text-gray-300 mt-2 font-medium">CGPA: 8.95</p>
              </div>

              <div className="bg-[#161616] p-6 rounded-2xl border border-white/5 border-l-4 border-l-gray-600">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-2xl font-bold text-white">Bachelor of Computer Applications</h3>
                  <span className="text-gray-400 font-medium mt-2 md:mt-0">Aug 2020 – July 2023</span>
                </div>
                <p className="text-gray-400 text-lg">Rajiv Gandhi Govt PG College, Mandsaur, M.P.</p>
                <p className="text-gray-300 mt-2 font-medium">Percentage: 79.2%</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideUp} className="max-w-3xl mx-auto">
            <div className="bg-[#161616] border border-white/5 p-10 md:p-16 rounded-3xl relative overflow-hidden text-center shadow-sm">
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                  Let's build something <span className="text-white">together.</span>
                </h2>
                <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
                </p>
                <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-950 hover:bg-gray-200 font-bold text-base rounded-xl transition-all hover:-translate-y-1 shadow-sm group">
                  Say Hello
                  <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-800/60 text-gray-500 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
              <p className="font-medium order-2 md:order-1">© {new Date().getFullYear()} Raveena Chawda. All rights reserved.</p>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 md:order-2">
                <a href="mailto:raveenachawda0228@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-[#161616] rounded-full border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all shadow-sm group-hover:shadow-md">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  raveenachawda0228@gmail.com
                </a>
                <a href="tel:+919174991074" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-[#161616] rounded-full border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all shadow-sm group-hover:shadow-md">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-center gap-2">
                    +91 9174991074
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" title="Available to take calls"></span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
            
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-y-auto overflow-x-hidden flex flex-col shadow-2xl custom-scrollbar"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-gray-800 bg-[#0a0a0a]/90 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white">
                  {activeInfo?.title}
                </h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-violet-400 mb-3">Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {activeInfo?.overview}
                    {activeInfo?.link && (
                      <span className="block mt-2">
                        <a href={activeInfo.link} target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-4 font-semibold">
                          Visit Website
                        </a>
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-violet-400 mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeInfo?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-800/50 hover:bg-gray-800/50 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-violet-400 mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeInfo?.tech.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-violet-500/10 text-violet-300 text-sm rounded-full border border-violet-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {activeInfo?.images && activeInfo.images.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-violet-400 mb-4">Screenshots</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeInfo.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="rounded-xl overflow-hidden border border-gray-800 relative group shadow-lg cursor-pointer"
                          onClick={() => setFullscreenImage(img)}
                        >
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
            onClick={() => setFullscreenImage(null)}
          >
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage}
              alt="Fullscreen Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsContactModalOpen(false)} />
            
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#0a0a0a]/90">
                <h3 className="text-2xl font-bold text-white">
                  Send me a message
                </h3>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                  <div className="relative">
                    <input type="text" id="modal-name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="peer w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all shadow-inner" placeholder="Name" />
                    <label htmlFor="modal-name" className="absolute left-4 -top-2.5 bg-[#0a0a0a] px-1 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white peer-focus:bg-[#0a0a0a] pointer-events-none">Name</label>
                  </div>
                  <div className="relative mt-6">
                    <input type="email" id="modal-email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="peer w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all shadow-inner" placeholder="Email" />
                    <label htmlFor="modal-email" className="absolute left-4 -top-2.5 bg-[#0a0a0a] px-1 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white peer-focus:bg-[#0a0a0a] pointer-events-none">Email</label>
                  </div>
                  <div className="relative mt-6">
                    <textarea id="modal-message" required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="peer w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none shadow-inner" placeholder="Message"></textarea>
                    <label htmlFor="modal-message" className="absolute left-4 -top-2.5 bg-[#0a0a0a] px-1 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white peer-focus:bg-[#0a0a0a] pointer-events-none">Message</label>
                  </div>
                  
                  <button type="submit" disabled={formStatus === 'submitting'} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 mt-4 bg-white text-gray-950 hover:bg-gray-200 disabled:opacity-50 font-bold text-base rounded-xl transition-all shadow-sm">
                    {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                    <Mail className="w-5 h-5" />
                  </button>
                  
                  {formStatus === 'success' && (
                    <p className="text-green-400 text-sm text-center font-medium mt-3 bg-green-500/10 py-2 rounded-lg border border-green-500/20">Thanks for reaching out! I'll get back to you soon.</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center font-medium mt-3 bg-red-500/10 py-2 rounded-lg border border-red-500/20">Oops! Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
