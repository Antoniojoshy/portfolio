import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Add dark class to html element
        document.documentElement.classList.add('dark');

        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingScreen key="loading" />
                ) : (
                    <div key="content" className="w-full">
                        <Navbar />
                        <HeroSection />
                        <AboutSection />
                        <ProjectsSection />
                        <SkillsSection />
                        <GallerySection />
                        <ContactSection />
                        <Footer />
                    </div>
                )}
            </AnimatePresence>

            <Toaster position="top-right" theme="dark" />
        </div>
    );
}
