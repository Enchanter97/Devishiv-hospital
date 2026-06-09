import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Stethoscope } from "lucide-react";
import { HOSPITAL } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F0D] text-white mt-24" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-xl bg-[#0D9B6B] grid place-items-center">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <div className="font-display text-2xl font-semibold">{HOSPITAL.name}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#34D399]">{HOSPITAL.cert}</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-md">
            A multi-specialty NABH-certified hospital in Lucknow delivering compassionate, advanced and round-the-clock medical care.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-[#34D399] font-medium mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#0D9B6B]" />
              <span>{HOSPITAL.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0D9B6B]" />
              <span>Toll-Free: {HOSPITAL.tollFree}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0D9B6B]" />
              <span>{HOSPITAL.phones.join(" | ")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#0D9B6B]" />
              <span>{HOSPITAL.hours} — Emergency 24x7</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-[#34D399] font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-[#34D399] transition-colors">About Us</Link></li>
            <li><Link to="/experts" className="hover:text-[#34D399] transition-colors">Our Experts</Link></li>
            <li><Link to="/services" className="hover:text-[#34D399] transition-colors">Services</Link></li>
            <li><Link to="/appointment" className="hover:text-[#34D399] transition-colors">Book Appointment</Link></li>
            <li><Link to="/contact" className="hover:text-[#34D399] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Devishiv Hospital. All rights reserved.</span>
          <span>NABH Certified Entry Level • Lucknow, Uttar Pradesh</span>
        </div>
      </div>
    </footer>
  );
}
