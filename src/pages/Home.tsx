import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import PricingTeaser from '../components/PricingTeaser';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <main className="relative min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <PricingTeaser />
            <Footer />
        </main>
    );
}