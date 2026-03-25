// src/components/contact/ContactSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Building2, AlertCircle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const EMPTY_FORM = { name: '', business: '', email: '', phone: '', message: '' };

const contactInfo = [
  { icon: Phone,  title: 'Phone',        content: '1300 XXX XXX',        detail: 'Mon–Fri, 8am–6pm AEST' },
  { icon: Mail,   title: 'Email',        content: 'info@syncline.com.au', detail: 'Fast response times' },
  { icon: MapPin, title: 'Service Area', content: 'Victoria, Australia',  detail: 'Melbourne & Regional VIC' },
  { icon: Clock,  title: 'Emergency',   content: '24/7 Available',       detail: 'For managed clients' },
];

const nextSteps = [
  'We review your inquiry within 24 hours',
  'Schedule a free 30-minute consultation',
  'Receive a custom IT assessment',
  'Start protecting & growing your business',
];

const ContactSection = () => {
  const [formData,     setFormData]     = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const [errorMsg,     setErrorMsg]     = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);

      setIsSubmitted(true);
      setFormData(EMPTY_FORM);
      setTimeout(() => setIsSubmitted(false), 8000);

    } catch (err) {
      setErrorMsg(
        err.message.includes('fetch')
          ? 'Could not reach the server. Please check your connection and try again.'
          : err.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm font-medium mb-4">
            Get Started Today
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 lg:mb-6 leading-tight text-balance">
            Ready to{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Transform
            </span>{' '}
            Your IT?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
            Get a free IT health check and discover how we can secure and streamline your technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Contact Form ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-6 sm:p-8 lg:p-10" gradient>
              <AnimatePresence mode="wait">

                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-slate-300 text-lg">
                      Your message is on its way — we'll be in touch within 24 hours.
                    </p>
                  </motion.div>

                ) : (

                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5 sm:space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name <span className="text-blue-400">*</span>
                        </label>
                        <input
                          id="name" name="name" type="text" required
                          value={formData.name} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          placeholder="John Smith"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="business" className="block text-sm font-medium text-slate-300 mb-2">
                          Business Name
                        </label>
                        <input
                          id="business" name="business" type="text"
                          value={formData.business} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          placeholder="Your Company Pty Ltd"
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email <span className="text-blue-400">*</span>
                        </label>
                        <input
                          id="email" name="email" type="email" required
                          value={formData.email} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          placeholder="john@company.com.au"
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                          Phone
                        </label>
                        <input
                          id="phone" name="phone" type="tel"
                          value={formData.phone} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          placeholder="04XX XXX XXX"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        How can we help? <span className="text-blue-400">*</span>
                      </label>
                      <textarea
                        id="message" name="message" required rows={5}
                        value={formData.message} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                        placeholder="Tell us about your business and IT challenges..."
                      />
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Get Free IT Assessment
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-slate-500 mt-2">
                      We respond within 24 hours. For urgent issues, call us directly.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          {/* ── Right column ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6 lg:space-y-8"
          >
            <GlassCard className="p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-400">{item.title}</p>
                      <p className="font-semibold text-base text-white mt-0.5">{item.content}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 lg:p-8 bg-gradient-to-br from-blue-900/10 to-cyan-900/10 border border-blue-800/20">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">What Happens Next?</h3>
              <ol className="space-y-4 list-decimal list-inside text-slate-300">
                {nextSteps.map((step, i) => (
                  <li key={i} className="text-base">{step}</li>
                ))}
              </ol>
            </GlassCard>

            <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <Building2 className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">ABN: XX XXX XXX XXX</p>
                  <p className="text-xs text-slate-500">Victorian IT Services Pty Ltd</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;




// // src/components/contact/ContactSection.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Individual Lucide icon imports (tree-shake friendly + alias)
// import Phone from '@lucide/phone';
// import Mail from '@lucide/mail';
// import MapPin from '@lucide/map-pin';
// import Clock from '@lucide/clock';
// import Send from '@lucide/send';
// import CheckCircle from '@lucide/check-circle';
// import Building2 from '@lucide/building-2';

// import GlassCard from '../ui/GlassCard';

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     business: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call (replace with real fetch/axios later)
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     setFormData({ name: '', business: '', email: '', phone: '', message: '' });

//     // Auto-reset success message after 5 seconds
//     setTimeout(() => setIsSubmitted(false), 5000);
//   };

//   const contactInfo = [
//     { icon: Phone, title: 'Phone', content: '1300 XXX XXX', detail: 'Mon-Fri, 8am-6pm AEST' },
//     { icon: Mail, title: 'Email', content: 'info@syncline.com.au', detail: 'fast response times' },
//     { icon: MapPin, title: 'Service Area', content: 'Victoria, Australia', detail: 'Melbourne & Regional VIC' },
//     { icon: Clock, title: 'Emergency', content: '24/7 Available', detail: 'For managed clients' }
//   ];

//   const nextSteps = [
//     'We review your inquiry within 24 hours',
//     'Schedule a free 30-minute consultation',
//     'Receive a custom IT assessment',
//     'Start protecting & growing your business'
//   ];

//   return (
//     <section
//       id="contact"
//       className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
//     >
//       {/* Subtle background (very low opacity for performance) */}
//       <div className="absolute inset-0 pointer-events-none opacity-30">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
//         {/* Header � fluid responsive sizing */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8 }}
//           className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
//         >
//           <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm font-medium mb-4">
//             Get Started Today
//           </span>
          
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 lg:mb-6 leading-tight text-balance">
//             Ready to{' '}
//             <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Transform
//             </span>{' '}
//             Your IT?
//           </h2>
          
//           <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
//             Get a free IT health check and discover how we can secure and streamline your technology.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="lg:col-span-3"
//           >
//             <GlassCard className="p-6 sm:p-8 lg:p-10" gradient>
//               <AnimatePresence mode="wait">
//                 {isSubmitted ? (
//                   <motion.div
//                     key="success"
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.5 }}
//                     className="text-center py-12"
//                   >
//                     <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
//                       <CheckCircle className="w-10 h-10 text-green-400" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
//                     <p className="text-slate-300 text-lg">We'll be in touch within 24 hours.</p>
//                   </motion.div>
//                 ) : (
//                   <motion.form
//                     key="form"
//                     onSubmit={handleSubmit}
//                     className="space-y-5 sm:space-y-6"
//                   >
//                     <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
//                       <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
//                           Full Name *
//                         </label>
//                         <input
//                           id="name"
//                           name="name"
//                           type="text"
//                           required
//                           value={formData.name}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                           placeholder="John Smith"
//                           autoComplete="name"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="business" className="block text-sm font-medium text-slate-300 mb-2">
//                           Business Name
//                         </label>
//                         <input
//                           id="business"
//                           name="business"
//                           type="text"
//                           value={formData.business}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                           placeholder="Your Company Pty Ltd"
//                           autoComplete="organization"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
//                       <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
//                           Email *
//                         </label>
//                         <input
//                           id="email"
//                           name="email"
//                           type="email"
//                           required
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                           placeholder="john@company.com.au"
//                           autoComplete="email"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
//                           Phone
//                         </label>
//                         <input
//                           id="phone"
//                           name="phone"
//                           type="tel"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
//                           placeholder="04XX XXX XXX"
//                           autoComplete="tel"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
//                         How can we help? *
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         required
//                         rows={5}
//                         value={formData.message}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
//                         placeholder="Tell us about your business and IT challenges..."
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className={`
//                         relative w-full py-4 px-6
//                         bg-gradient-to-r from-blue-600 to-cyan-600
//                         text-white font-bold text-lg rounded-xl
//                         hover:shadow-lg hover:shadow-blue-500/30
//                         transition-all duration-300
//                         disabled:opacity-70 disabled:cursor-not-allowed
//                         flex items-center justify-center gap-3
//                         hover:scale-[1.02]
//                       `}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                           Sending...
//                         </>
//                       ) : (
//                         <>
//                           Get Free IT Assessment
//                           <Send className="w-5 h-5" />
//                         </>
//                       )}
//                     </button>

//                     <p className="text-center text-sm text-slate-500 mt-2">
//                       We respond within 24 hours. For urgent issues, call us directly.
//                     </p>
//                   </motion.form>
//                 )}
//               </AnimatePresence>
//             </GlassCard>
//           </motion.div>

//           {/* Contact Info & Next Steps */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="lg:col-span-2 space-y-6 lg:space-y-8"
//           >
//             {/* Contact Info Card */}
//             <GlassCard className="p-6 lg:p-8">
//               <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Contact Information</h3>
//               <div className="space-y-6">
//                 {contactInfo.map((item, i) => (
//                   <div key={i} className="flex items-start gap-4">
//                     <div className={`p-3 rounded-lg bg-slate-800/50 ${item.color || ''}`}>
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-slate-400">{item.title}</p>
//                       <p className="font-semibold text-base text-white mt-0.5">{item.content}</p>
//                       <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>

//             {/* What Happens Next */}
//             <GlassCard className="p-6 lg:p-8 bg-gradient-to-br from-blue-900/10 to-cyan-900/10 border border-blue-800/20">
//               <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">What Happens Next?</h3>
//               <ol className="space-y-4 list-decimal list-inside text-slate-300">
//                 {nextSteps.map((step, i) => (
//                   <li key={i} className="text-base">{step}</li>
//                 ))}
//               </ol>
//             </GlassCard>

//             {/* Business Info */}
//             <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-700/50">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 rounded-lg bg-slate-800/50">
//                   <Building2 className="w-6 h-6 text-slate-400" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-slate-400">ABN: XX XXX XXX XXX</p>
//                   <p className="text-xs text-slate-500">Victorian IT Services Pty Ltd</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;




// // src/components/contact/ContactSection.jsx

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Phone, Mail, MapPin, Clock, Send,
//   CheckCircle, Building2
// } from 'lucide-react';
// import GlassCard from '../ui/GlassCard';

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     business: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate submission
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     setFormData({ name: '', business: '', email: '', phone: '', message: '' });
    
//     // Reset after 5 seconds
//     setTimeout(() => setIsSubmitted(false), 5000);
//   };

//   const contactInfo = [
//     { icon: Phone, title: 'Phone', content: '1300 XXX XXX', detail: 'Mon-Fri, 8am-6pm AEST' },
//     { icon: Mail, title: 'Email', content: 'info@syncline.com.au', detail: 'fast response times' },
//     { icon: MapPin, title: 'Service Area', content: 'Victoria, Australia', detail: 'Melbourne & Regional VIC' },
//     { icon: Clock, title: 'Emergency', content: '24/7 Available', detail: 'For managed clients' }
//   ];

//   const nextSteps = [
//     'We review your inquiry within 24 hours',
//     'Schedule a free 30-minute consultation',
//     'Receive a custom IT assessment',
//     'Start protecting & growing your business'
//   ];

//   return (
//     <section 
//       id="contact" 
//       className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
//         >
//           <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
//             Get Started
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 lg:mb-6" id="contact-heading">
//             Ready to{' '}
//             <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Transform
//             </span>{' '}
//             Your IT?
//           </h2>
//           <p className="text-base sm:text-lg text-slate-400">
//             Get a free IT health check and discover how we can secure and streamline your technology.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 xl:gap-12">
//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-3"
//           >
//             <GlassCard className="p-6 sm:p-8" gradient>
//               {isSubmitted ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-12"
//                 >
//                   <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
//                     <CheckCircle className="w-10 h-10 text-green-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
//                   <p className="text-slate-400">We'll be in touch within 24 hours.</p>
//                 </motion.div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
//                   <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
//                     <div className="relative z-10">
//                       <label 
//                         htmlFor="contact-name"
//                         className="block text-sm font-medium text-slate-300 mb-2"
//                       >
//                         Full Name *
//                       </label>
//                       <input
//                         id="contact-name"
//                         name="name"
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus:bg-white/10"
//                         placeholder="John Smith"
//                         autoComplete="name"
//                         style={{ position: 'relative', zIndex: 10 }}
//                       />
//                     </div>
//                     <div className="relative z-10">
//                       <label 
//                         htmlFor="contact-business"
//                         className="block text-sm font-medium text-slate-300 mb-2"
//                       >
//                         Business Name
//                       </label>
//                       <input
//                         id="contact-business"
//                         name="business"
//                         type="text"
//                         value={formData.business}
//                         onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus:bg-white/10"
//                         placeholder="Your Company Pty Ltd"
//                         autoComplete="organization"
//                         style={{ position: 'relative', zIndex: 10 }}
//                       />
//                     </div>
//                   </div>

//                   <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
//                     <div className="relative z-10">
//                       <label 
//                         htmlFor="contact-email"
//                         className="block text-sm font-medium text-slate-300 mb-2"
//                       >
//                         Email *
//                       </label>
//                       <input
//                         id="contact-email"
//                         name="email"
//                         type="email"
//                         required
//                         value={formData.email}
//                         onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus:bg-white/10"
//                         placeholder="john@company.com.au"
//                         autoComplete="email"
//                         style={{ position: 'relative', zIndex: 10 }}
//                       />
//                     </div>
//                     <div className="relative z-10">
//                       <label 
//                         htmlFor="contact-phone"
//                         className="block text-sm font-medium text-slate-300 mb-2"
//                       >
//                         Phone
//                       </label>
//                       <input
//                         id="contact-phone"
//                         name="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus:bg-white/10"
//                         placeholder="04XX XXX XXX"
//                         autoComplete="tel"
//                         style={{ position: 'relative', zIndex: 10 }}
//                       />
//                     </div>
//                   </div>

//                   <div className="relative z-10">
//                     <label 
//                       htmlFor="contact-message"
//                       className="block text-sm font-medium text-slate-300 mb-2"
//                     >
//                       How can we help? *
//                     </label>
//                     <textarea
//                       id="contact-message"
//                       name="message"
//                       required
//                       rows={5}
//                       value={formData.message}
//                       onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
//                       className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none focus:bg-white/10"
//                       placeholder="Tell us about your business and IT challenges..."
//                       style={{ position: 'relative', zIndex: 10 }}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="relative z-10 w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base sm:text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-[1.02]"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         Get Free IT Assessment
//                         <Send className="w-5 h-5" />
//                       </>
//                     )}
//                   </button>

//                   <p className="text-center text-sm text-slate-500">
//                     We respond within 24 hours. For urgent issues, call us directly.
//                   </p>
//                 </form>
//               )}
//             </GlassCard>
//           </motion.div>

//           {/* Contact Info & Next Steps */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-2 space-y-5 sm:space-y-6"
//           >
//             {/* Contact Info Card */}
//             <GlassCard className="p-5 sm:p-6">
//               <h3 className="text-base sm:text-lg font-bold text-white mb-5 sm:mb-6">Contact Information</h3>
//               <div className="space-y-4 sm:space-y-5">
//                 {contactInfo.map((item, i) => (
//                   <div key={i} className="flex items-start gap-3 sm:gap-4">
//                     <div className="p-2.5 sm:p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
//                       <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-xs sm:text-sm text-slate-400">{item.title}</p>
//                       <p className="font-semibold text-sm sm:text-base text-white break-words">{item.content}</p>
//                       <p className="text-xs text-slate-500">{item.detail}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>

//             {/* What Happens Next */}
//             <GlassCard className="p-5 sm:p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/20" gradient>
//               <h3 className="text-base sm:text-lg font-bold text-white mb-5 sm:mb-6">What Happens Next?</h3>
//               <ol className="space-y-3 sm:space-y-4">
//                 {nextSteps.map((step, i) => (
//                   <li key={i} className="flex items-start gap-3 sm:gap-4">
//                     <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
//                       <span className="text-sm sm:text-base text-white font-bold">{i + 1}</span>
//                     </div>
//                     <span className="text-sm sm:text-base text-slate-300 pt-1">{step}</span>
//                   </li>
//                 ))}
//               </ol>
//             </GlassCard>

//             {/* Business Info */}
//             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
//               <div className="flex items-center gap-3">
//                 <Building2 className="w-5 h-5 text-slate-400 flex-shrink-0" />
//                 <div className="min-w-0">
//                   <p className="text-sm text-slate-400">ABN: XX XXX XXX XXX</p>
//                   <p className="text-xs text-slate-500">Victorian IT Services Pty Ltd</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;



// import React, { useState } from 'react';




// import { motion } from 'framer-motion';
// import { 
//   Phone, Mail, MapPin, Clock, ArrowRight, Send,
//   CheckCircle, MessageSquare, Calendar, Building2
// } from 'lucide-react';
// import GlassCard from '../ui/GlassCard';

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     business: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate submission
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     setFormData({ name: '', business: '', email: '', phone: '', message: '' });
    
//     // Reset after 5 seconds
//     setTimeout(() => setIsSubmitted(false), 5000);
//   };

//   const contactInfo = [
//     { icon: Phone, title: 'Phone', content: '1300 XXX XXX', detail: 'Mon-Fri, 8am-6pm AEST' },
//     { icon: Mail, title: 'Email', content: 'info@syncline.com.au', detail: 'fast response times' },
//     { icon: MapPin, title: 'Service Area', content: 'Victoria, Australia', detail: 'Melbourne & Regional VIC' },
//     { icon: Clock, title: 'Emergency', content: '24/7 Available', detail: 'For managed clients' }
//   ];

//   const nextSteps = [
//     'We review your inquiry within 24 hours',
//     'Schedule a free 30-minute consultation',
//     'Receive a custom IT assessment',
//     'Start protecting & growing your business'
//   ];

//   return (
//     <section id="contact" className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
//             Get Started
//           </span>
//           <h2 className="text-4xl lg:text-5xl font-black text-white mb-6" id="contact-heading">
//             Ready to{' '}
//             <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Transform
//             </span>{' '}
//             Your IT?
//           </h2>
//           <p className="text-lg text-slate-400">
//             Get a free IT health check and discover how we can secure and streamline your technology.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-3"
//           >
//             <GlassCard className="p-8" gradient>
//               {isSubmitted ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-12"
//                 >
//                   <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
//                     <CheckCircle className="w-10 h-10 text-green-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
//                   <p className="text-slate-400">We'll be in touch within 24 hours.</p>
//                 </motion.div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="John Smith"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Business Name
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.business}
//                         onChange={(e) => setFormData({...formData, business: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="Your Company Pty Ltd"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Email *
//                       </label>
//                       <input
//                         type="email"
//                         required
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="john@company.com.au"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Phone
//                       </label>
//                       <input
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="04XX XXX XXX"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-2">
//                       How can we help? *
//                     </label>
//                     <textarea
//                       required
//                       rows={5}
//                       value={formData.message}
//                       onChange={(e) => setFormData({...formData, message: e.target.value})}
//                       className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                       placeholder="Tell us about your business and IT challenges..."
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         Get Free IT Assessment
//                         <Send className="w-5 h-5" />
//                       </>
//                     )}
//                   </button>

//                   <p className="text-center text-sm text-slate-500">
//                     We respond within 24 hours. For urgent issues, call us directly.
//                   </p>
//                 </form>
//               )}
//             </GlassCard>
//           </motion.div>

//           {/* Contact Info & Next Steps */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-2 space-y-6"
//           >
//             {/* Contact Info Card */}
//             <GlassCard className="p-6">
//               <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
//               <div className="space-y-5">
//                 {contactInfo.map((item, i) => (
//                   <div key={i} className="flex items-start gap-4">
//                     <div className="p-3 rounded-lg bg-blue-500/10">
//                       <item.icon className="w-5 h-5 text-blue-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-400">{item.title}</p>
//                       <p className="font-semibold text-white">{item.content}</p>
//                       <p className="text-xs text-slate-500">{item.detail}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>

//             {/* What Happens Next */}
//             <GlassCard className="p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/20" gradient>
//               <h3 className="text-lg font-bold text-white mb-6">What Happens Next?</h3>
//               <ol className="space-y-4">
//                 {nextSteps.map((step, i) => (
//                   <li key={i} className="flex items-start gap-4">
//                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
//                       <span className="text-white font-bold">{i + 1}</span>
//                     </div>
//                     <span className="text-slate-300 pt-1">{step}</span>
//                   </li>
//                 ))}
//               </ol>
//             </GlassCard>

//             {/* Business Info */}
//             <div className="p-4 bg-white/5 rounded-xl">
//               <div className="flex items-center gap-3">
//                 <Building2 className="w-5 h-5 text-slate-400" />
//                 <div>
//                   <p className="text-sm text-slate-400">ABN: XX XXX XXX XXX</p>
//                   <p className="text-xs text-slate-500">Victorian IT Services Pty Ltd</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;
