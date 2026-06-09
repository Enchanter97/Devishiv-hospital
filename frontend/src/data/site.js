export const DOCTORS = [
  {
    id: "dr-renu",
    name: "Dr. Renu Lakhtakia",
    credentials: "MBBS, MD, MRCOG (London)",
    specialty: "Obstetrician & Gynaecologist",
    image: "./images/DrRenu.png",
    bio: "Internationally trained women's health expert with deep experience in obstetrics, fertility care and gynaecologic surgery.",
  },
  {
    id: "dr-sanjai",
    name: "Dr. Sanjai Srivastava",
    credentials: "MS, DNB, MCh (Gastro Surgery, SGPGI)",
    specialty: "Surgical Gastroenterologist",
    image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2",
    bio: "Senior gastrointestinal and HPB surgeon trained at SGPGI, specialising in advanced laparoscopic and oncology surgery.",
  },
  {
    id: "dr-sanjay",
    name: "Dr. Sanjay Lakhtakia",
    credentials: "MD (Medicine)",
    specialty: "Endoscopist & Sonologist",
    image: "./images/Drsanjay.png",
    bio: "Experienced internal medicine consultant offering precise diagnostic endoscopy and ultrasound services.",
  },
  {
    id: "dr-ashutosh",
    name: "Dr. Ashutosh Mishra",
    credentials: "MBBS, DCH",
    specialty: "Child Specialist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    bio: "Compassionate paediatrician delivering preventive, curative and developmental care for newborns, children and adolescents.",
  },
  {
    id: "dr-ranjan",
    name: "Dr. Ranjan Kumar",
    credentials: "MBBS, MS (Orthopaedics)",
    specialty: "Bone & Joint Specialist",
    image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
    bio: "Orthopaedic surgeon focused on trauma, fractures, sports injuries and conservative joint management (no joint replacement).",
  },
];

export const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
];

export const SERVICES = {
  clinical: {
    title: "Clinical Services (OPD + IPD)",
    items: [
      "Obstetrics",
      "Gynaecology",
      "Laparoscopic Surgery",
      "Surgical Gastroenterology",
      "General Orthopaedics (excluding joint replacement)",
      "Paediatrics",
      "Anaesthesiology",
    ],
  },
  diagnostic: {
    title: "Diagnostic Services",
    items: [
      "X-Ray",
      "ECG",
      "Ultrasound (including TVS)",
      "Color Doppler",
      "Gastroscopy",
      "Colonoscopy",
      "Cardiotocography (NST)",
      "Pathology",
    ],
  },
  allied: {
    title: "Allied / Support Services",
    items: [
      "24/7 Pharmacy",
      "Canteen",
      "Ambulance",
      "Blood Bank",
      "Outsourced NICU / PICU",
      "Outsourced CT / MRI",
      "Outsourced Histopathology",
    ],
  },
};

export const HOSPITAL = {
  name: "Devishiv Hospital",
  cert: "NABH Certified Entry Level",
  address: "B-328, Sector B Marg, near Mount, Mahanagar, Lucknow, Uttar Pradesh 226006",
  tollFree: "1800 274 8000",
  phones: ["0522-2622080", "0522-2614700"],
  hours: "Open 24 Hours",
  mapsQuery: "Devishiv Hospital, Mahanagar, Lucknow",
};
