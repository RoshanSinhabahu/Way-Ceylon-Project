import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../data/data';


const Footer = () => (
    <footer className="bg-blac border-t border-gray-200 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Name and Slogan */}
            <h3 className="text-2xl font-bold text-gray-900">WayCeylon</h3>
            <p className="mt-2 text-sm text-gray-600">
                Plan your perfect trip to Sri Lanka with WayCeylon!
            </p>

            {/* Social Icons (Large) */}
            <div className="flex justify-center gap-6 mt-8 mb-6">
                {SOCIAL_LINKS.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors duration-200">
                        <link.icon className="w-6 h-6" />
                    </a>
                ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-500 mt-4">
                &copy; {new Date().getFullYear()} Time to Program. All rights reserved by Roshan Sinhabahu.
                <span className='block mt-2'>Images and content belong to their respective owners. Used for educational and non-commercial purposes only. </span>
                <span><Link to="/privacy-policy" className="text-emerald-600 underline hover:text-emerald-800">
                    Click here
                </Link> to view our Privacy Policy.</span>
            </p>
        </div>
    </footer>
);

export default Footer;