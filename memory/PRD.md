# Devishiv Hospital Website — PRD

## Original Problem Statement
Build a modern, responsive, professional hospital website for Devishiv Hospital (NABH Certified, Mahanagar Lucknow). 5 sections: Home, About, Experts, Services, Contact. Medical-blue + seafoam-green + white palette. Sticky header with prominent emergency contact. Stock photography, English only.

## Architecture
- Frontend: React 19 + React Router 7, Tailwind, shadcn/ui, sonner toasts, lucide icons, date-fns, framer-motion baseline.
- Backend: FastAPI, MongoDB (motor). All routes prefixed `/api`.
- Endpoints: `/api/contact`, `/api/appointments`, `/api/doctors`.

## Implemented (Dec 2025)
- Sticky header with emergency strip, toll-free + reception numbers, NABH badge.
- Home page: hero + dual CTAs, specialties bento (Ultrasound, Endoscopy, Gynaecology, Gastro Surgery, IVF), doctor preview, testimonials, CTA banner.
- About page: mission + values + location strip.
- Experts page: 5 doctors with exact credentials and book-CTA.
- Services page: Tabs (Clinical, Diagnostic, Allied) + at-a-glance grid.
- Contact page: form (Name/Phone/Email/Message) + Google Maps embed.
- Appointment page: doctor select, calendar date picker, time slot, patient details with success confirmation.
- Backend: contact submission (saved to Mongo), appointment booking (saved to Mongo), doctors list.

## Backlog (P1)
- Email notification on contact/appointment (Resend/SendGrid integration).
- Admin dashboard for receptionists to view appointments.
- WhatsApp click-to-chat CTA.

## Backlog (P2)
- Patient testimonial submission flow.
- Multi-language (Hindi).
- Doctor schedule/slot availability checking.
