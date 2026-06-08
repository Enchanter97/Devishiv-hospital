import { Link } from "react-router-dom";
import { Phone, ArrowRight, ShieldCheck, Activity, Microscope, Baby, Heart, Stethoscope, Quote, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { HOSPITAL, DOCTORS } from "../data/site";

const SPECIALTIES = [
  { name: "Ultrasound", icon: Activity, desc: "High-resolution 4D & TVS imaging" },
  { name: "Endoscopy", icon: Microscope, desc: "Gastroscopy & Colonoscopy" },
  { name: "Gynaecology", icon: Heart, desc: "Comprehensive women's health" },
  { name: "Gastro Surgery", icon: Stethoscope, desc: "Advanced laparoscopic GI care" },
  { name: "IVF", icon: Baby, desc: "Fertility & reproductive medicine" },
];

const TESTIMONIALS = [
  {
    name: "Anita Sharma",
    role: "Patient",
    body: "Exceptional facilities and a team of doctors who genuinely care. The 24x7 emergency response gave my family complete peace of mind during a critical time.",
  },
  {
    name: "Rohit Verma",
    role: "Patient family",
    body: "Clean, modern and well-equipped. Dr. Renu and the gynaecology team handled my wife's delivery with incredible warmth and expertise.",
  },
  {
    name: "Suresh Kumar",
    role: "Patient",
    body: "From diagnostics to surgery, every department coordinates seamlessly. The pricing is transparent and the nursing staff is genuinely empathetic.",
  },
];

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/31836902/pexels-photo-31836902.jpeg"
            alt="Devishiv Hospital building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A4273]/95 via-[#0A4273]/85 to-[#0A4273]/40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-8 animate-fade-up">
              <ShieldCheck className="h-4 w-4 text-[#7ACBA5]" />
              <span className="text-xs uppercase tracking-[0.18em] font-medium">NABH Certified Entry Level</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6 animate-fade-up animate-delay-100">
              24/7 comprehensive care, <span className="text-[#7ACBA5]">close to home</span> in Lucknow.
            </h1>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-10 animate-fade-up animate-delay-200">
              A NABH-certified multi-specialty hospital combining advanced diagnostics, expert clinicians and compassionate nursing — round the clock, every single day.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-fade-up animate-delay-300">
              <a href={`tel:${HOSPITAL.tollFree.replace(/\s/g, "")}`} data-testid="hero-call-emergency">
                <Button
                  size="lg"
                  className="rounded-full bg-[#DC2626] hover:bg-[#b91c1c] text-white px-7 h-12 text-base font-semibold transition-all"
                >
                  <Phone className="h-5 w-5 mr-2" /> Call Emergency
                </Button>
              </a>
              <Link to="/services" data-testid="hero-view-specialties">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-white/0 hover:bg-white border-white text-white hover:text-[#0A4273] px-7 h-12 text-base font-semibold transition-all"
                >
                  View Specialties <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl animate-fade-up animate-delay-400">
              <div>
                <div className="font-display text-3xl font-semibold">24x7</div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70 mt-1">Emergency</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">5+</div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70 mt-1">Specialties</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">NABH</div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70 mt-1">Accredited</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES BENTO */}
      <section className="py-20 md:py-28" data-testid="specialties-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-[#7ACBA5] font-medium mb-3">Our specialties</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F172A]">
                Multi-specialty care under one roof.
              </h2>
            </div>
            <Link to="/services" className="text-[#0A4273] font-medium hover:underline inline-flex items-center gap-1">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTIES.map((s, i) => {
              const Icon = s.icon;
              const featured = i === 0;
              return (
                <div
                  key={s.name}
                  data-testid={`specialty-${s.name.toLowerCase().replace(/\s/g, "-")}`}
                  className={`group p-8 rounded-3xl border border-border bg-white hover:bg-[#F0FDF4] transition-all duration-300 ${
                    featured ? "lg:col-span-2 lg:row-span-2 bg-[#0A4273] hover:bg-[#0A4273] text-white" : ""
                  }`}
                >
                  <div className={`h-12 w-12 rounded-2xl grid place-items-center mb-6 ${
                    featured ? "bg-white/10 text-[#7ACBA5]" : "bg-[#E4F4E4] text-[#0A4273] group-hover:bg-white"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className={`font-display text-2xl font-medium mb-2 ${featured ? "text-white" : "text-[#0F172A]"}`}>
                    {s.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${featured ? "text-white/80" : "text-slate-600"}`}>
                    {s.desc}
                  </p>
                  {featured && (
                    <div className="mt-10 pt-10 border-t border-white/15">
                      <p className="text-white/85 text-base leading-relaxed max-w-md">
                        State-of-the-art ultrasound imaging including Color Doppler, TVS and Cardiotocography (NST) — delivered by experienced sonologists.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERTS PREVIEW */}
      <section className="py-20 md:py-28 bg-surface" data-testid="experts-preview">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-[#7ACBA5] font-medium mb-3">Our experts</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F172A]">
                Meet the doctors trusted by Lucknow families.
              </h2>
            </div>
            <Link to="/experts" className="text-[#0A4273] font-medium hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.slice(0, 3).map((d) => (
              <div key={d.id} className="bg-white rounded-3xl overflow-hidden border border-border group">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-[#7ACBA5] font-medium mb-2">{d.specialty}</div>
                  <h3 className="font-display text-xl font-medium text-[#0F172A] mb-1">{d.name}</h3>
                  <p className="text-sm text-slate-500">{d.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-[#7ACBA5] font-medium mb-3">Patient voices</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F172A]">
              Built on trust, recommended by families.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                data-testid={`testimonial-${i}`}
                className="p-8 rounded-3xl bg-[#F0FDF4] border border-[#7ACBA5]/30"
              >
                <Quote className="h-8 w-8 text-[#7ACBA5] mb-5" />
                <p className="text-base leading-relaxed text-slate-700 mb-6">&ldquo;{t.body}&rdquo;</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#0A4273] text-[#0A4273]" />
                  ))}
                </div>
                <div className="font-medium text-[#0F172A]">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0A4273] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-white">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-medium leading-tight max-w-xl">
                Need to see a specialist? Book your appointment today.
              </h3>
              <p className="text-white/75 mt-3 max-w-xl">
                Same-day appointments available for most specialties. Toll-Free: {HOSPITAL.tollFree}
              </p>
            </div>
            <Link to="/appointment" data-testid="cta-book-appointment">
              <Button
                size="lg"
                className="rounded-full bg-[#7ACBA5] hover:bg-[#5fb88c] text-[#0A4273] font-semibold h-12 px-7"
              >
                Book Appointment <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
