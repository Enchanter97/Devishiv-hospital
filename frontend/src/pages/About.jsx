import { ShieldCheck, HeartPulse, Microscope, Users, Award } from "lucide-react";
import { HOSPITAL } from "../data/site";

const VALUES = [
  { icon: ShieldCheck, title: "Patient Safety", body: "NABH-aligned protocols, infection control and continuous clinical audits." },
  { icon: Microscope, title: "Advanced Diagnostics", body: "Modern imaging, endoscopy and pathology — all under one roof." },
  { icon: HeartPulse, title: "Compassionate Care", body: "Empathetic nursing, transparent communication and dignified service." },
];

export default function About() {
  return (
    <div data-testid="about-page">
      {/* HERO */}
      <section className="bg-[#34D399] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-black font-medium mb-4">About Devishiv</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0A0F0D] max-w-4xl leading-tight">
            A leading multi-specialty hospital in the heart of Mahanagar, Lucknow.
          </h1>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#0D9B6B] font-medium mb-3">Our mission</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0F0D] leading-tight mb-6">
              Healing built on three commitments — safety, science and empathy.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-4">
              At Devishiv Hospital, every clinical decision begins with patient safety. Our NABH-accredited systems, modern diagnostics and an empathetic care team ensure that you receive answers quickly, treatment that is evidence-based, and a recovery experience that respects your dignity.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              Located in Mahanagar, we have served families across Lucknow with round-the-clock emergency response, multi-specialty OPD, in-patient care and a fully integrated diagnostic suite.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842"
              alt="Compassionate hospital care"
              className="w-full h-[520px] object-cover rounded-3xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 border border-border shadow-sm max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-[#D1FAE5] grid place-items-center text-[#0D9B6B]">
                  <Award className="h-5 w-5" />
                </div>
                <div className="font-display text-base font-semibold text-[#0D9B6B]">NABH Certified</div>
              </div>
              <p className="text-sm text-slate-600">Entry-level accreditation — a quality benchmark trusted across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-24 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#0D9B6B] font-medium mb-3">What we stand for</div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#0A0F0D]">
              Three principles that guide every shift.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-8 rounded-3xl bg-white border border-border" data-testid={`value-${v.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="h-12 w-12 rounded-2xl bg-[#0D9B6B] text-white grid place-items-center mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-[#0A0F0D] mb-3">{v.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION STRIP */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl border border-border p-10 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#0D9B6B] font-medium mb-2">Address</div>
              <p className="text-base text-slate-700 leading-relaxed">{HOSPITAL.address}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#0D9B6B] font-medium mb-2">Hours</div>
              <p className="text-base text-slate-700">{HOSPITAL.hours}</p>
              <p className="text-sm text-[#DC2626] font-medium mt-1">Emergency available 24x7</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#0D9B6B] font-medium mb-2">Reach us</div>
              <p className="text-base text-slate-700">Toll-Free: {HOSPITAL.tollFree}</p>
              <p className="text-base text-slate-700">{HOSPITAL.phones.join(" | ")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

