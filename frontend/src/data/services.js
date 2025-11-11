export const services = [
  {
    id: 1,
    title: "IVF & ICSI",
    slug: "ivf-icsi",
    shortDescription: "Advanced in-vitro fertilization with highest success rates using cutting-edge technology",
    longDescription: "Our IVF program combines state-of-the-art laboratory facilities with personalized treatment protocols. We use the latest techniques including ICSI, blastocyst culture, and time-lapse embryo monitoring to maximize success rates.",
    icon: "FaFlask",
    category: "Fertility",
    featured: true,
    successRate: "65%",
    duration: "2-3 months",
    idealFor: ["Blocked fallopian tubes", "Male factor infertility", "Unexplained infertility", "Advanced maternal age"]
  },
  {
    id: 2,
    title: "Egg Freezing",
    slug: "egg-freezing",
    shortDescription: "Preserve your fertility for the future with advanced vitrification technology",
    longDescription: "Egg freezing allows women to preserve their fertility by storing healthy eggs for future use. Our advanced vitrification technique ensures optimal egg survival rates and gives you the freedom to plan your family on your terms.",
    icon: "FaSnowflake",
    category: "Fertility Preservation",
    featured: true,
    badge: "Featured Service",
    idealAge: "25-35 years",
    storageYears: "Up to 10 years",
    idealFor: ["Career planning", "Medical treatments", "Delayed childbearing", "Fertility preservation"]
  },
  {
    id: 3,
    title: "IUI",
    slug: "iui",
    shortDescription: "Intrauterine insemination - a less invasive fertility treatment option",
    longDescription: "IUI is often the first line of fertility treatment, involving the placement of specially prepared sperm directly into the uterus during ovulation.",
    icon: "FaSyringe",
    category: "Fertility",
    successRate: "20-25%",
    duration: "1 cycle",
    idealFor: ["Mild male factor", "Cervical issues", "Unexplained infertility", "Donor sperm"]
  },
  {
    id: 4,
    title: "Andrology",
    slug: "andrology",
    shortDescription: "Comprehensive male fertility evaluation and treatment",
    longDescription: "Our andrology services include complete male fertility assessment, sperm analysis, and advanced treatments for male factor infertility.",
    icon: "FaMale",
    category: "Male Fertility",
    services: ["Semen analysis", "Sperm DNA fragmentation", "Testicular biopsy", "Varicocele treatment"]
  },
  {
    id: 5,
    title: "Cosmetic Gynecology",
    slug: "cosmetic-gynecology",
    shortDescription: "Advanced cosmetic and reconstructive gynecological procedures",
    longDescription: "Our cosmetic gynecology services focus on enhancing both function and aesthetics, improving quality of life and confidence.",
    icon: "FaVenus",
    category: "Gynecology",
    services: ["Vaginal rejuvenation", "Labiaplasty", "Vaginoplasty", "Hymenoplasty"]
  },
  {
    id: 6,
    title: "Endoscopy & Gynec Laparoscopy",
    slug: "laparoscopy",
    shortDescription: "Minimally invasive surgical procedures for gynecological conditions",
    longDescription: "Advanced laparoscopic techniques for treating various gynecological conditions with minimal scarring and faster recovery.",
    icon: "FaSearch",
    category: "Surgery",
    services: ["Diagnostic laparoscopy", "Ovarian cyst removal", "Endometriosis treatment", "Fibroid removal"]
  },
  {
    id: 7,
    title: "OB & Gynecology",
    slug: "ob-gynecology",
    shortDescription: "Comprehensive obstetric and gynecological care",
    longDescription: "Complete women's health services from routine check-ups to high-risk pregnancy management.",
    icon: "FaHeart",
    category: "Women's Health",
    services: ["Prenatal care", "High-risk pregnancy", "Gynecological disorders", "Preventive care"]
  },
  {
    id: 8,
    title: "Donation & Advanced Embryology",
    slug: "donation-embryology",
    shortDescription: "Egg, sperm, and embryo donation with advanced laboratory techniques",
    longDescription: "Comprehensive donation programs with advanced embryology services including embryoscopy, assisted hatching, and vitrification.",
    icon: "FaGift",
    category: "Advanced Fertility",
    services: ["Egg donation", "Sperm donation", "Embryo donation", "Embryoscopy", "Blastocyst culture", "Assisted hatching", "Vitrification"]
  }
];

export const serviceCategories = [
  "All",
  "Fertility",
  "Fertility Preservation", 
  "Male Fertility",
  "Gynecology",
  "Surgery",
  "Women's Health",
  "Advanced Fertility"
];
