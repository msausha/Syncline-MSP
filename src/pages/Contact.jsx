// src/pages/Contact.jsx
import React from 'react';
import ContactSection from '../components/contact/ContactSection';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us | Syncline IT Solutions"
        description="Get in touch with Syncline IT Solutions for IT support, cloud services, automation, and security. We respond within 24 hours."
        path="/contact"
      />
      <h1 className="sr-only">Contact Syncline IT Solutions</h1>
      <ContactSection />
    </>
  );
}