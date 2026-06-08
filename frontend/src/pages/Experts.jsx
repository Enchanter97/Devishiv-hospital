import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { DOCTORS } from "../data/site";
import { Calendar, ArrowRight } from "lucide-react";

export default function Experts() {
  return (
    <div data-testid="experts-page">
      <section className="bg-surface py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#7ACBA5] font-medium mb-4">Our experts</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F172A] max-w-4xl leading-tight">
            Meet the clinicians behind Devishiv Hospital.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-6">
            A team of senior consultants with credentials from India&apos;s top medical institutions and global fellowships.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTORS.map((d) => (
              <div
                key={d.id}
                data-testid={`doctor-card-${d.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-border hover:border-[#7ACBA5] transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7">
                  <div className="text-xs uppercase tracking-[0.18em] text-[#7ACBA5] font-medium mb-2">{d.specialty}</div>
                  <h3 className="font-display text-2xl font-medium text-[#0F172A] mb-2">{d.name}</h3>
                  <p className="text-sm font-medium text-[#0A4273] mb-4">{d.credentials}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{d.bio}</p>
                  <Link to={`/appointment?doctor=${encodeURIComponent(d.name)}`}>
                    <Button
                      variant="outline"
                      data-testid={`book-${d.id}`}
                      className="rounded-full border-[#0A4273] text-[#0A4273] hover:bg-[#0A4273] hover:text-white transition-all"
                    >
                      <Calendar className="h-4 w-4 mr-2" /> Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl bg-[#E4F4E4] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-[#0A4273]">
                Not sure which specialist to consult?
              </h3>
              <p className="text-slate-700 mt-2">Call our reception and we&apos;ll guide you to the right care pathway.</p>
            </div>
            <Link to="/contact">
              <Button className="rounded-full bg-[#0A4273] hover:bg-[#083358] text-white h-12 px-7">
                Talk to us <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
