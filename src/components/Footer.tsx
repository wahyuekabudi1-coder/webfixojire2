import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { useLanguageCurrency } from '../sharetour/LanguageCurrencyContext';
import { Mail, MapPin, Phone, Clock, MessageSquare, Instagram, Facebook, Youtube, Share2, Sparkles, QrCode, Copy, Check, X, ShieldCheck, FileText, Lock, Eye, EyeOff, ExternalLink } from 'lucide-react';

function WeChatIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" 
      viewBox="0 0 16 16"
      className={className}
    >
      <path d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.32.32 0 0 0-.12.366l.218.81a.6.6 0 0 1 .029.117.166.166 0 0 1-.162.162.2.2 0 0 1-.092-.03l-1.057-.61a.5.5 0 0 0-.256-.074.5.5 0 0 0-.142.021 5.7 5.7 0 0 1-1.576.22M9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.6.6 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.63.63 0 0 0 .098.356"/>
      <path d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.5.5 0 0 0-.032.14.19.19 0 0 0 .193.193q.06 0 .111-.029l1.268-.733a.6.6 0 0 1 .308-.088q.088 0 .171.025a6.8 6.8 0 0 0 1.625.26 4.5 4.5 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02l.15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826m4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0m3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0"/>
    </svg>
  );
}

export default function Footer() {
  const { setPage, setPrivacyOpen, setTermsOpen } = useApp();
  const { t } = useLanguageCurrency();
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [qrImageError, setQrImageError] = useState(false);

  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);

  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount >= 8 && nextCount <= 10) {
      setClickCount(nextCount);
      setShowPasswordModal(true);
      console.log(`Secret portal click inside range (8-10): ${nextCount}`);
    } else if (nextCount >= 11) {
      setClickCount(0);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      console.log(`Secret portal click reached 11, resetting to 0.`);
    } else {
      setClickCount(nextCount);
      console.log(`Secret portal click: ${nextCount}/8`);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sawahjaya2026') {
      setShowPasswordModal(false);
      setClickCount(0);
      setPassword('');
      setPasswordError('');
      setPage('admin');
    } else {
      setPasswordError('Kunci akses salah. Silakan hubungi tim IT Smart Journey.');
    }
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('sjtrans');
    setCopiedWeChat(true);
    setTimeout(() => setCopiedWeChat(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="main-footer" className="bg-neutral-50 text-neutral-600 pb-24 sm:pb-12 border-t border-neutral-200/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: About Info */}
          <div className="space-y-3">
            <h3 className="text-neutral-900 font-bold text-xs tracking-wider uppercase mb-4 border-l-2 border-amber-500 pl-2.5">
              Smart Journey
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {t('footer.aboutText')}
            </p>
          </div>
 
          {/* Column 2: Services & Quick Links */}
          <div className="border-t border-neutral-200/60 pt-6 md:border-t-0 md:pt-0">
            <h3 className="text-neutral-900 font-bold text-xs tracking-wider uppercase mb-4 border-l-2 border-amber-500 pl-2.5">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setPage('tours')} className="hover:text-amber-600 text-neutral-700 transition-colors cursor-pointer font-medium">
                  {t('nav.tours')}
                </button>
              </li>
              <li>
                <button onClick={() => setPage('share-tour')} className="hover:text-amber-600 text-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium">
                  <span>{t('nav.shareTour')}</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold uppercase">{t('nav.newBadge')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setPage('airport')} className="hover:text-amber-600 text-neutral-700 transition-colors cursor-pointer font-medium">
                  {t('nav.airport')}
                </button>
              </li>
              <li>
                <button onClick={() => setPage('taxi')} className="hover:text-amber-600 text-neutral-700 transition-colors cursor-pointer font-medium">
                  {t('nav.taxi')}
                </button>
              </li>
              <li>
                <button onClick={() => setPage('car-rental')} className="hover:text-amber-600 text-neutral-700 transition-colors cursor-pointer font-medium">
                  {t('nav.carRental')}
                </button>
              </li>
              <li className="pt-2 border-t border-neutral-200/60 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                <button onClick={() => setPage('about')} className="hover:text-amber-600 transition-colors cursor-pointer">
                  {t('nav.about')}
                </button>
                <span>•</span>
                <button onClick={() => setPage('partnerships')} className="hover:text-amber-600 transition-colors cursor-pointer">
                  {t('footer.partnerships')}
                </button>
              </li>
            </ul>
          </div>
 
          {/* Column 3: Contact Details */}
          <div id="footer-contact-column" className="border-t border-neutral-200/60 pt-6 md:border-t-0 md:pt-0 rounded-2xl p-2 transition-all duration-500">
            <h3 className="text-neutral-900 font-bold text-xs tracking-wider uppercase mb-4 border-l-2 border-amber-500 pl-2.5">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <a href="https://wa.me/6285212347289" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 font-medium text-neutral-700 transition-colors">
                  +62 852-1234-7289 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <a href="mailto:Info@sawahjayatrans.com" className="hover:text-amber-600 font-medium text-neutral-700 transition-colors">
                  Info@sawahjayatrans.com
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-700 space-y-0.5 leading-snug">
                  <div><strong>Malang:</strong> Jl. Puntadewa No. 192, Tumpang</div>
                  <div><strong>Bali:</strong> Jl. By Pass Ngurah Rai, Denpasar</div>
                </div>
              </li>
            </ul>

            {/* Quick Contact Buttons */}
            <div className="mt-4 pt-4 border-t border-neutral-200/50 flex gap-2">
              <a 
                id="footer-wa-btn"
                href="https://wa.me/6285212347289" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-[1.01] duration-200 flex-1 text-center"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>

              <button 
                id="footer-wechat-btn"
                onClick={() => {
                  setQrImageError(false);
                  setIsWeChatModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-[1.01] duration-200 flex-1 text-center"
              >
                <WeChatIcon className="h-3.5 w-3.5" />
                <span>WeChat</span>
              </button>
            </div>
          </div>
 
        </div>
 
        {/* 2. DESAIN 4: SECURITY & PAYMENT METHODS STRIP (Website Green Theme & Multi-Language) */}
        <div className="bg-[#203c34] text-white py-5 px-6 lg:px-8 rounded-2xl border border-[#315B4F] my-8 shadow-lg max-w-5xl mx-auto w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          
          {/* LEFT: Security Section */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#315B4F] border border-[#467b6b] flex items-center justify-center text-amber-300 shrink-0 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black tracking-wider text-white uppercase font-sans">
                {t('footer.secure')}
              </span>
              <p className="text-[11px] text-emerald-100/90 font-normal leading-tight mt-0.5">
                {t('footer.secureSubtitle')}
              </p>
            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden md:block w-px h-10 bg-[#315B4F] shrink-0 self-center" />

          {/* RIGHT: Payment Methods Section */}
          <div className="flex flex-col md:items-end gap-2.5 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/90 font-mono">
              {t('footer.paymentMethods')}
            </span>
            
            {/* Single Row of Payment Pills on Desktop */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
              {/* VISA */}
              <div className="w-[58px] h-[30px] bg-white rounded-lg flex items-center justify-center select-none shrink-0 border border-slate-200/90 shadow-xs hover:scale-105 transition-transform" title="VISA">
                <span className="text-[#1A1F71] font-black italic tracking-wide text-xs font-sans">VISA</span>
              </div>

              {/* Mastercard */}
              <div className="w-[58px] h-[30px] bg-white rounded-lg flex items-center justify-center select-none shrink-0 border border-slate-200/90 shadow-xs hover:scale-105 transition-transform" title="Mastercard">
                <div className="relative w-6 h-4 flex items-center justify-center">
                  <div className="absolute left-0.5 w-[13px] h-[13px] rounded-full bg-[#EB001B] opacity-95" />
                  <div className="absolute right-0.5 w-[13px] h-[13px] rounded-full bg-[#F79E1B] opacity-90 mix-blend-multiply" />
                </div>
              </div>

              {/* JCB */}
              <div className="w-[58px] h-[30px] bg-white rounded-lg flex items-center justify-center select-none shrink-0 border border-slate-200/90 shadow-xs hover:scale-105 transition-transform" title="JCB">
                <div className="flex items-center gap-0.5 font-sans">
                  <span className="text-[#004193] font-black tracking-tight text-xs italic">J</span>
                  <span className="text-[#D31115] font-black tracking-tight text-xs italic">C</span>
                  <span className="text-[#008938] font-black tracking-tight text-xs italic">B</span>
                </div>
              </div>

              {/* QRIS */}
              <div className="w-[58px] h-[30px] bg-white rounded-lg flex items-center justify-center select-none shrink-0 border border-slate-200/90 shadow-xs hover:scale-105 transition-transform" title="QRIS">
                <span className="text-[#012d5e] font-black tracking-tight text-xs font-sans">QRIS</span>
              </div>

              {/* Alipay */}
              <div className="w-[58px] h-[30px] bg-white rounded-lg flex items-center justify-center select-none shrink-0 border border-slate-200/90 shadow-xs hover:scale-105 transition-transform" title="Alipay">
                <span className="text-[#00A1E9] font-extrabold text-xs tracking-tight font-sans">Alipay</span>
              </div>

              {/* PayPal */}
              <div className="w-[58px] h-[30px] bg-white rounded-lg flex items-center justify-center select-none shrink-0 border border-slate-200/90 shadow-xs hover:scale-105 transition-transform" title="PayPal">
                <div className="flex items-center justify-center font-sans tracking-tight font-black italic text-xs">
                  <span className="text-[#003087]">Pay</span>
                  <span className="text-[#0079C1]">Pal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. POLICY & CONTACT NAVIGATION (Horizontal & Center Aligned) */}
        <div className="border-t border-neutral-200/80 mt-8 pt-6 flex justify-center text-xs text-neutral-500">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-neutral-500 text-xs font-medium">
            <button 
              onClick={() => setPrivacyOpen(true)} 
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              {t('footer.privacyPolicy')}
            </button>
            <span className="text-neutral-300 select-none">•</span>
            <button 
              onClick={() => setTermsOpen(true)} 
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              {t('footer.termsConditions')}
            </button>
            <span className="text-neutral-300 select-none">•</span>
            <button 
              onClick={() => {
                const element = document.getElementById('footer-contact-column');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  element.classList.add('bg-amber-500/10', 'ring-2', 'ring-amber-500/20');
                  setTimeout(() => {
                    element.classList.remove('bg-amber-500/10', 'ring-2', 'ring-amber-500/20');
                  }, 2000);
                }
              }} 
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              {t('footer.contactUs')}
            </button>
          </div>
        </div>

        {/* 4. COPYRIGHT & TEMPORARY ADMIN ACCESS BUTTONS */}
        <div className="mt-4 pb-2 flex flex-col items-center justify-center gap-2.5 text-center text-xs text-neutral-500 font-normal">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-neutral-700">PT Sawah Jaya Trans</span>. {t('footer.allRightsReserved')}.
          </p>

          {/* Both Admin Access Buttons */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
            {/* 1. Admin Website (Smart Journey) */}
            <button
              id="btn-admin-smart-journey-footer"
              type="button"
              onClick={() => {
                window.location.hash = '';
                setPage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#203c34] hover:bg-[#315B4F] text-amber-300 hover:text-amber-200 text-[11px] font-mono font-semibold rounded-lg border border-[#315B4F] hover:border-[#467b6b] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              title="Akses Dashboard Admin Smart Journey (/admin)"
            >
              <Lock className="w-3 h-3 text-amber-300" />
              <span>{t('footer.adminWebsite')}</span>
            </button>

            {/* 2. Admin Share Tour */}
            <button
              id="btn-admin-share-tour-footer"
              type="button"
              onClick={() => {
                setPage('share-tour');
                window.location.hash = '#admin';
                window.dispatchEvent(new HashChangeEvent('hashchange'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#203c34] hover:bg-[#315B4F] text-emerald-300 hover:text-emerald-200 text-[11px] font-mono font-semibold rounded-lg border border-[#315B4F] hover:border-[#467b6b] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              title="Akses Dashboard Admin Share Tour (/share-tour#admin)"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              <span>{t('footer.adminShareTour')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* WeChat Info Modal */}
      {isWeChatModalOpen && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md cursor-pointer animate-fade-in"
          onClick={() => setIsWeChatModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-[440px] bg-white rounded-3xl shadow-2xl border border-neutral-150 p-5 space-y-4 animate-scale-up cursor-default"
          >
            {/* Header / Profile Row */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center overflow-hidden border border-neutral-200 shadow-sm p-1">
                  <img 
                    src="/logo.png" 
                    alt="Smart Journey Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-800 text-sm sm:text-base leading-tight">Smart Journey</h3>
                  <p className="text-xs text-neutral-500 font-medium">{t('wechat.title')}</p>
                </div>
              </div>
              
              {/* Highly visible Close Button in the header */}
              <button 
                id="close-wechat-modal-btn"
                onClick={() => setIsWeChatModalOpen(false)}
                className="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all border border-neutral-200/50"
                title={t('common.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* QR Code Container (Dynamic, scaled for maximum scanning size) */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center bg-neutral-50 rounded-2xl p-2.5 border border-neutral-200/60 relative"
            >
              {!qrImageError ? (
                <div className="relative w-full aspect-[888/1248] max-h-[460px] bg-white p-2 rounded-xl border border-neutral-200/60 shadow-sm flex items-center justify-center overflow-hidden">
                  <img 
                    src="/wechat-qr.png" 
                    alt="Smart Journey WeChat QR Code"
                    className="w-full h-full object-contain rounded-lg select-none"
                    onError={() => {
                      setQrImageError(true);
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-emerald-600 w-full bg-neutral-50 rounded-xl">
                  <QrCode className="h-32 w-32 text-neutral-800 mb-2 animate-pulse" />
                  <span className="text-xs text-neutral-500 text-center px-6 leading-relaxed">
                    Unggah file QR Code Anda ke folder <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-amber-600 font-mono font-semibold">public</code> dengan nama <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-amber-600 font-mono font-semibold">wechat-qr.png</code>
                  </span>
                </div>
              )}
            </div>

            {/* Copy ID Block */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/60 space-y-2"
            >
              <div className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400">WeChat ID / Username</div>
              <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-neutral-200/40 shadow-sm">
                <span className="font-mono text-sm font-bold text-neutral-800">sjtrans</span>
                <button 
                  onClick={handleCopyWeChat}
                  className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 font-semibold transition-colors bg-amber-50 hover:bg-amber-100/80 px-3 py-1.5 rounded-lg border border-amber-200/30"
                >
                  {copiedWeChat ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>{t('wechat.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{t('wechat.copyId')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Help / Instructions */}
            <div className="text-xs text-neutral-500 text-center leading-relaxed px-2">
              {t('wechat.instruction')}
            </div>

            {/* Primary Selesai Button */}
            <button 
              onClick={() => setIsWeChatModalOpen(false)}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl text-sm transition-all shadow-md hover:shadow-lg duration-200"
            >
              {t('wechat.done')}
            </button>
          </div>
        </div>
      )}

      {/* Hidden Admin Access Password Modal */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => {
            setShowPasswordModal(false);
            setClickCount(0);
          }}
        >
          <div 
            className="relative w-full max-w-[400px] bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-3xl shadow-2xl p-6 space-y-5 animate-scale-up cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight text-neutral-100">Kunci Akses Admin</h4>
                  <p className="text-[10px] text-neutral-400 font-medium font-sans">SMARTJOURNEY SECURITY GATEWAY</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowPasswordModal(false);
                  setClickCount(0);
                }}
                className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content / Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-300 block">Masukkan Kode Sandi</label>
                  <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 rounded-md font-mono">
                    Password: sawahjaya2026
                  </span>
                </div>
                <div className="relative">
                  <input 
                    type={showPasswordText ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder="••••••••••••••"
                    autoFocus
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl pl-4 pr-10 py-3 text-sm text-neutral-100 font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-neutral-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3.5 top-3.5 text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showPasswordText ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-rose-500 text-[11px] font-semibold leading-relaxed font-sans">{passwordError}</p>
                )}
              </div>

              {/* Security Hint */}
              <div className="bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/50 flex gap-2.5 items-start text-[11px] text-neutral-400 font-medium">
                <ShieldCheck className="h-4 w-4 text-amber-500/80 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Akses dibatasi hanya untuk staf resmi Smart Journey. Seluruh aktivitas login dipantau oleh server audit.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-1">
                <button 
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setClickCount(0);
                  }}
                  className="flex-1 py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 font-bold rounded-2xl text-xs transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black rounded-2xl text-xs shadow-md transition-all active:scale-[0.98]"
                >
                  Konfirmasi Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
