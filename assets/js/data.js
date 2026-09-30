/* ------------------------------------------------------------------
   All site content lives here. Edit this file to update the website.
   ------------------------------------------------------------------ */
window.SITE = {
  now: "2026-09", // "Present" is drawn up to this month on the timeline

  /* Career timeline — lane 0: research & industry, 1: academia, 2: ventures */
  lanes: ["Research & Industry", "Academia", "Ventures"],
  roles: [
    {
      id: "phd", lane: 0, start: "2017-07", end: "2020-12",
      title: "Research Assistant & PhD Candidate", short: "PhD · ML & AI",
      org: "University of Adelaide", place: "Adelaide",
      logo: "assets/img/logos/adelaide-uni.png",
      summary: "Machine learning and mathematical modelling for medicine: CRP time-series forecasting, tumour vascular networks and game-theoretic strategies for survival.",
      points: []
    },
    {
      id: "sahmri", lane: 0, start: "2021-01", end: "2024-05",
      title: "Lead Machine Learning Scientist", short: "Lead ML Scientist",
      org: "SAHMRI", place: "Adelaide, South Australia",
      logo: "assets/img/logos/sahmri-icon.svg", logoDark: true,
      summary: "Established Platform AI at SAHMRI, the South Australian Health and Medical Research Institute.",
      points: []
    },
    {
      id: "aiml", lane: 0, start: "2024-05", end: null,
      title: "AI/ML Lead & Research Scientist", short: "AI/ML Lead",
      org: "Australian Institute for Machine Learning (AIML)", place: "Adelaide, South Australia",
      badge: "AIML",
      summary: "Built a new team for the design, delivery and governance of enterprise AI-driven systems for healthcare and industry clients including Medtronic (US), Pfizer and SA Pathology.",
      points: [
        { b: "SEAL-ML", t: "Clinical AI system for cardiovascular risk scoring.", link: "https://circulatory-mortality-risk-profile.streamlit.app/", linkText: "Live demo" },
        { b: "AI Cancer Mutation Analysis Agent", t: "Agentic RAG system built with GPT-5 that identifies clinically relevant mutations and associated genes and drafts structured clinical reports, cutting report preparation from ~3 hours to 10 minutes in pilot testing." }
      ]
    },
    {
      id: "lecturer", lane: 1, start: "2024-05", end: null,
      title: "Lecturer", short: "Lecturer",
      org: "Adelaide University", place: "Adelaide",
      logo: "assets/img/logos/adelaide-uni.png",
      summary: "Coordinates and teaches postgraduate courses including Machine Learning Algorithms, Foundations of Computer Science, Quantitative Methods and Applied Programming, supporting 200+ students per course and leading teaching teams of up to 20 tutors.",
      points: [
        { t: "Consistently exceeds student evaluation benchmarks, with 99% agreement that teaching is effective." },
        { t: "Designed and developed the Quantitative Methods course (4048) for the School of Computer Science." }
      ],
      link: "https://researchers.adelaide.edu.au/profile/mohsen.dorraki", linkText: "Researcher profile"
    },
    {
      id: "pimedtech", lane: 2, start: "2025-01", end: null,
      title: "Co-Founder & CTO", short: "Co-Founder & CTO",
      org: "Pi MedTech", place: "Australia · Hybrid",
      logo: "assets/img/logos/pimedtech-icon.png",
      summary: "Co-founded and architects the AI, backend and cloud infrastructure for a health-intelligence startup with three clinical AI products: one commercialised and two clinically validated.",
      points: [
        { b: "CardioPlus", t: "AI-powered post-discharge cardiac monitoring app." },
        { b: "LifeSync", t: "AI-powered diabetes management platform." },
        { b: "PiNet", t: "Turns microscopy, CT and X-ray images into graphs for tissue and bone microstructure analysis, validated in Nature's Communications Biology.", link: "https://pimedtech-pinet.streamlit.app/", linkText: "Live demo" }
      ],
      link: "https://pimedtech.com/", linkText: "pimedtech.com"
    }
  ],

  /* Featured projects: 4-column grid of square cards */
  projects: [
    { title: "MindHeart Risk", tag: "Cardiology", img: "mindheart.jpg", venue: "JACC: Advances", year: 2024,
      desc: "Ensemble ML on UK Biobank that adds mental-health data to classic risk factors, lifting CVD prediction accuracy from 71% to 85%.",
      url: "https://doi.org/10.1016/j.jacadv.2024.101180" },
    { title: "VesselNet", tag: "Imaging → Graphs", img: "vessel.jpg", venue: "Communications Biology", year: 2021,
      desc: "Converts microscopy of cells into graph networks to track how tumour blood-vessel networks form over time. This is the science behind PiNet.",
      url: "https://doi.org/10.1038/s42003-021-02632-x" },
    { title: "BoneGraph", tag: "Musculoskeletal", img: "bone.jpg", venue: "PNAS Nexus", year: 2022,
      desc: "Converts micro-CT scans into networks that quantify trabecular bone structure, detecting hip osteoarthritis with up to 96% accuracy.",
      url: "https://doi.org/10.1093/pnasnexus/pgac258" },
    { title: "LeadScan ECG", tag: "Cardiology", img: "ecg.jpg", venue: "arXiv", year: 2026,
      desc: "A physiology-aware CNN that reads ECG images lead by lead (0.94 AUC), benchmarked against zero-shot GPT and Gemini models.",
      url: "https://arxiv.org/abs/2606.22889" },
    { title: "DensityScope", tag: "Pathology", img: "breast.jpg", venue: "Cancers", year: 2025,
      desc: "Deep learning that grades fibroglandular breast density directly from histology images of breast tissue.",
      url: "https://doi.org/10.3390/cancers17030449" },
    { title: "OncoCardio Atlas", tag: "Genomics", img: "oncocardio.jpg", venue: "IEEE Access", year: 2025,
      desc: "An ML-driven map of the genes, epigenetic marks and biomarkers that cancer and cardiovascular disease share.",
      url: "https://doi.org/10.1109/ACCESS.2025.3607285" },
    { title: "CRP Forecaster", tag: "Time series", img: "crp-forecast.jpg", venue: "IEEE Access", year: 2019,
      desc: "LSTM deep learning that forecasts a patient's C-reactive protein trajectory from their own history.",
      url: "https://doi.org/10.1109/ACCESS.2019.2914473" },
    { title: "AngioSim", tag: "Simulation", img: "angio.jpg", venue: "IEEE Access", year: 2020,
      desc: "A mathematical simulation engine for how tumours recruit and grow new blood-vessel networks.",
      url: "https://doi.org/10.1109/ACCESS.2020.2977062" },
    { title: "Gut–Heart Axis", tag: "Cardio-oncology", img: "gutheart.jpg", venue: "Cardiovascular Research", year: 2026,
      desc: "How the gut microbiome shapes cardiac risk in cancer survivors, and where the modifiable levers are.",
      url: "https://doi.org/10.1093/cvr/cvag146" },
    { title: "HealMark", tag: "Diabetes", img: "wound.jpg", venue: "Advances in Wound Care", year: 2026,
      desc: "HDL function as a marker of delayed wound healing after minor amputation in people with diabetes.",
      url: "https://doi.org/10.1177/21621918261441530" },
    { title: "NutriBiome", tag: "Clinical trial", img: "nutrition.jpg", venue: "Supportive Care in Cancer", year: 2025,
      desc: "Randomised-trial analytics linking the feeding route to gut microbiome dynamics and outcomes after stem-cell transplant.",
      url: "https://doi.org/10.1007/s00520-025-09882-z" },
    { title: "BarrierWatch", tag: "Neuro-immunology", img: "barrier.jpg", venue: "bioRxiv", year: 2026,
      desc: "Gut–immune signals that damage the blood–brain barrier after paediatric stem-cell transplant.",
      url: "https://doi.org/10.64898/2026.08.17.745172" }
  ],

  /* PhD supervision */
  students: [
    { year: 2026, role: "Principal Supervisor", name: "Sami Salem", topic: "Artificial Intelligence Approaches for Advancing Medical Research and Healthcare Innovation" },
    { year: 2024, role: "Principal Supervisor", name: "Khalil Ahammad", topic: "AI-based Time Use Optimisation for Improving Health and Well-being Outcomes" },
    { year: 2024, role: "Co-Supervisor", name: "Nanyu Dong", topic: "Pre-trained Multimodal Model for Integrated Healthcare Decision Support" },
    { year: 2024, role: "Co-Supervisor", name: "Nadhir Hassen", topic: "Causal Discovery and Out-of-Distribution Generalisation: Sampling from Posterior over Causal Graphs" }
  ],

  /* Teaching */
  courses: [
    { code: "4048", name: "Quantitative Methods", years: "2026", role: "Course designer & developer", note: "Designed and built from scratch", highlight: true },
    { code: "ARTI 6003", name: "Machine Learning Algorithms", years: "2025", role: "Coordinator & Lecturer", note: "200+ students · 20 TAs" },
    { code: "COMP SCI 7210", name: "Foundations of Computer Science A", years: "2024 – 2026", role: "Coordinator & Lecturer", note: "200+ students · 20 TAs" },
    { code: "COMP SCI 7210OL", name: "Foundations of Computer Science A (Online)", years: "2025 – 2026", role: "Coordinator", note: "Online delivery" },
    { code: "COMP SCI 7211", name: "Foundations of Computer Science B", years: "2024 – 2026", role: "Coordinator & Lecturer", note: "200+ students · 20 TAs" },
    { code: "COMP SCI 7100A/B", name: "Master of Computer Science Research Project A & B", years: "2024 – Present", role: "Coordinator & Lecturer", note: "Semesters 1 & 2" },
    { code: "COMP SCI 1015", name: "Introduction to Applied Programming", years: "2024", role: "Coordinator & Lecturer", note: "200+ students" },
    { code: "ENGR 1206", name: "Engineering Programming · Flinders University", years: "2023", role: "Coordinator & Lecturer", note: "Semester 1" },
    { code: "COMP SCI 3020", name: "Advanced Topics in Computer Science", years: "2021 – 2024", role: "Supervisor", note: "" }
  ],

  /* Side projects */
  pets: [
    { title: "Truels and strategies for survival", desc: "Game theory of three-way duels: when is it best to hold your fire?", img: "truels.jpg", url: "https://www.nature.com/articles/s41598-019-45253-5", where: "Scientific Reports" },
    { title: "COVID or flu? That's the question!", desc: "Can a model tell COVID-19 from influenza on a chest X-ray?", img: "covid.jpg", url: "https://www.eleceng.adelaide.edu.au/personal/dabbott/wiki/images/c/cb/Project_Plan.pdf", where: "Project plan (PDF)" },
    { title: "On moment of velocity for signal analysis", desc: "A well-behaved alternative to instantaneous frequency for analysing non-stationary signals.", img: "velocity.jpg", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6458400/", where: "Royal Society Open Science" }
  ],

  /* Publications — role: "first" | "senior" | "co" */
  pubs: [
    { year: 2026, title: "Physiology-Aware CNN and Zero-Shot Multimodal LLMs for ECG Image Classification: A Comparative Study", authors: "Ahammad K, Abbott D, Dorraki M", venue: "arXiv preprint", logo: "j-arxiv.png", url: "https://arxiv.org/abs/2606.22889", role: "senior" },
    { year: 2026, title: "The gut–heart axis in cardio-oncology", authors: "Chan NSL, Cross C, Bowen J, Prestidge C, Ryan FJ, Dorraki M, et al.", venue: "Cardiovascular Research", logo: "j-academic.png", url: "https://doi.org/10.1093/cvr/cvag146", role: "co" },
    { year: 2026, title: "The Functionality of High-Density Lipoproteins Is Impaired in People with Diabetes Who Require Minor Amputations", authors: "Lotfollahi Z, Solly EL, Tan JTM, …, Dorraki M, et al.", venue: "Advances in Wound Care", logo: "j-liebertpub.png", url: "https://doi.org/10.1177/21621918261441530", role: "co" },
    { year: 2026, title: "Gut-immune signaling drives blood-brain barrier damage in pediatric allogeneic stem cell transplant", authors: "Davies MR, Cross CB, Ryan FJ, Yu L, Dorraki M, et al.", venue: "bioRxiv preprint", logo: "j-biorxiv.png", url: "https://doi.org/10.64898/2026.08.17.745172", role: "co" },
    { year: 2025, title: "Genetic and Epigenetic Predispositions, Shared Mechanisms, and Common Biomarkers Between Cancer and CVD — Machine Learning-Based Insights", authors: "Ahammad K, Fouladzadeh A, Wardill HR, Abbott D, Dorraki M", venue: "IEEE Access", logo: "j-ieee.png", url: "https://doi.org/10.1109/ACCESS.2025.3607285", role: "senior" },
    { year: 2025, title: "A Deep Learning Approach for the Classification of Fibroglandular Breast Density in Histology Images of Human Breast Tissue", authors: "Heydarlou H, Hodson LJ, Dorraki M, et al.", venue: "Cancers", logo: "j-mdpi.png", url: "https://doi.org/10.3390/cancers17030449", role: "co" },
    { year: 2025, title: "Enteral versus parenteral nutrition in auto-HCT: a randomized controlled trial on clinical outcomes and gut microbiome dynamics", authors: "Wardill HR, van Groningen LFJ, Dorraki M, et al.", venue: "Supportive Care in Cancer", logo: "j-springer.png", url: "https://doi.org/10.1007/s00520-025-09882-z", role: "co" },
    { year: 2024, title: "Improving Cardiovascular Disease Prediction With Machine Learning Using Mental Health Data: A Prospective UK Biobank Study", authors: "Dorraki M, Liao Z, Abbott D, Psaltis PJ, et al.", venue: "JACC: Advances", logo: "j-jacc.png", url: "https://doi.org/10.1016/j.jacadv.2024.101180", role: "first" },
    { year: 2022, title: "Hip osteoarthritis: A novel network analysis of subchondral trabecular bone structures", authors: "Dorraki M, Muratovic D, Fouladzadeh A, Verjans JW, Allison A, Findlay DM, Abbott D", venue: "PNAS Nexus", logo: "j-academic.png", url: "https://doi.org/10.1093/pnasnexus/pgac258", role: "first" },
    { year: 2021, title: "The development of tumour vascular networks", authors: "Fouladzadeh A†, Dorraki M†, Min KKM, Cockshell MP, Thompson EJ, Verjans JW, Allison A, Bonder CS, Abbott D", venue: "Communications Biology", logo: "j-nature.png", url: "https://doi.org/10.1038/s42003-021-02632-x", role: "first" },
    { year: 2020, title: "Angiogenic Networks in Tumors — Insights via Mathematical Modeling", authors: "Dorraki M, Fouladzadeh A, Allison A, Bonder CS, Abbott D", venue: "IEEE Access", logo: "j-ieee.png", url: "https://doi.org/10.1109/ACCESS.2020.2977062", role: "first" },
    { year: 2019, title: "Truels and strategies for survival", authors: "Dorraki M, Allison A, Abbott D", venue: "Scientific Reports", logo: "j-nature.png", url: "https://doi.org/10.1038/s41598-019-45253-5", role: "first" },
    { year: 2019, title: "On moment of velocity for signal analysis", authors: "Dorraki M, Fouladzadeh A, Allison A, Davis BR, Abbott D", venue: "Royal Society Open Science", logo: "j-royalsociety.png", url: "https://doi.org/10.1098/rsos.182001", role: "first" },
    { year: 2019, title: "Can C-Reactive Protein (CRP) Time Series Forecasting be Achieved via Deep Learning?", authors: "Dorraki M, Fouladzadeh A, Salamon SJ, Allison A, Coventry BJ, Abbott D", venue: "IEEE Access", logo: "j-ieee.png", url: "https://doi.org/10.1109/ACCESS.2019.2914473", role: "first" },
    { year: 2018, title: "On detection of periodicity in C-reactive protein (CRP) levels", authors: "Dorraki M, Fouladzadeh A, Salamon SJ, Allison A, Coventry BJ, Abbott D", venue: "Scientific Reports", logo: "j-nature.png", url: "https://doi.org/10.1038/s41598-018-30469-8", role: "first" }
  ],

  awards: [
    { year: "2020", title: "AMSI BioInfoSummer Grant", org: "Australian Mathematical Sciences Institute", desc: "To attend AMSI BioInfoSummer 2020, The Australian National University, Canberra." },
    { year: "2020", title: "Global Talent in the MedTech Sector", org: "Department of Home Affairs, Australian Government", desc: "Global Talent Independent visa, a priority pathway for individuals at the top of their field in target sectors." },
    { year: "2019", title: "D R Stranks Travelling Fellowship", org: "The University of Adelaide", desc: "Research visit to Stony Brook University, New York, on evolutionary dynamics of genomes and collective cell behaviour." },
    { year: "2018", title: "AMSI Travel Grant", org: "Australian Mathematical Sciences Institute", desc: "To attend AMSI BioInfoSummer 2018, The University of Western Australia, Perth." },
    { year: "2018", title: "Postgraduate Research Student Support", org: "School of EEE, University of Adelaide", desc: "To present at EECS 2018 in Bern, Switzerland." },
    { year: "2017", title: "ECMS Divisional Scholarship", org: "Faculty of ECMS, University of Adelaide", desc: "PhD scholarship." }
  ],

  service: [
    "Associate Editor, IEEE Access",
    "Member, IEEE & IEEE EMBS",
    "Member, SET Human Research Ethics Committee, Adelaide University",
    "Academic Integrity Officer, Adelaide University",
    "Member, Alliance/Coalition for AI in Medicine (ACAIM/PCAIM)"
  ]
};
