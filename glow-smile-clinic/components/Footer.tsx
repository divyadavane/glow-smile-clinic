import { clinic } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-porcelain/60 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between gap-8 pb-10 border-b border-porcelain/10">
          <div>
            <p className="font-display italic text-xl text-porcelain">
              Adidx Glow &amp; Smile Clinic
            </p>
            <p className="text-sm mt-2 max-w-xs">
              Gentle dental, hair, and skin care in the heart of Masoli,
              Dahanu.
            </p>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div>
              <p className="eyebrow text-porcelain/40 mb-3">Explore</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-porcelain transition-colors">Services</a></li>
                <li><a href="#doctor" className="hover:text-porcelain transition-colors">The Doctor</a></li>
                <li><a href="#reviews" className="hover:text-porcelain transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-porcelain transition-colors">Visit</a></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-porcelain/40 mb-3">Contact</p>
              <ul className="space-y-2 text-sm">
                <li><a href={clinic.phoneHref} className="hover:text-porcelain transition-colors">{clinic.phone}</a></li>
                <li className="max-w-[220px]">{clinic.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-porcelain/35">
          <p>© {new Date().getFullYear()} Dr Adidx Glow &amp; Smile Clinic. All rights reserved.</p>
          <p>An inclusive, judgement-free clinic — everyone is welcome here.</p>
        </div>
      </div>
    </footer>
  );
}
