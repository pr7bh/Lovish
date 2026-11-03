export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  isDraft: boolean;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  relatedSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-your-first-physiotherapy-assessment",
    title: "Understanding Your First Physiotherapy Assessment",
    excerpt:
      "What to expect during your initial appointment — from subjective history to movement screening and your personalized treatment plan.",
    category: "Patient Education",
    tags: ["first appointment", "assessment", "treatment plan"],
    readTime: "5 min read",
    date: "2024-11-01",
    isDraft: false,
    image: "/images/blog-assessment.jpg",
    imageAlt: "Physiotherapist examining a patient's knee during an assessment",
    sections: [
      {
        paragraphs: [
          "Starting physiotherapy for the first time can feel uncertain, particularly if you are unsure what the appointment will involve. A good initial assessment is the foundation of effective treatment — it is where your physiotherapist gathers the information needed to understand your condition and begin developing a plan that is right for you.",
          "Here is a straightforward overview of what a first physiotherapy appointment typically involves.",
        ],
      },
      {
        heading: "The Subjective History",
        paragraphs: [
          "Your physiotherapist will begin by asking you a series of questions about your condition. This is called the subjective assessment, and it helps build a clinical picture before any physical tests are performed.",
        ],
        list: [
          "When did your symptoms start, and what were you doing at the time?",
          "Where is the pain or discomfort located, and does it travel anywhere?",
          "What makes your symptoms better or worse?",
          "How does the condition affect your daily activities, sleep, and work?",
          "What is your general health, and are you taking any medications?",
        ],
      },
      {
        heading: "The Physical Examination",
        paragraphs: [
          "Following the history, your physiotherapist will assess your body physically. This typically involves observing your posture and movement, testing your range of motion, assessing muscle strength and flexibility, and performing specific clinical tests relevant to your condition.",
          "You will be asked to move in certain ways and may be asked to reproduce your symptoms to help identify the source of the problem. Wear comfortable clothing that allows access to the area being assessed.",
        ],
      },
      {
        heading: "Clinical Reasoning and Diagnosis",
        paragraphs: [
          "After gathering all the relevant information, your physiotherapist will discuss their clinical findings with you. This includes an explanation of what may be contributing to your symptoms, what the likely diagnosis or working hypothesis is, and what the expected recovery trajectory might look like.",
          "At Nagpal's Physio Care, we believe in clear communication so that you understand your condition and are an active participant in your recovery.",
        ],
      },
      {
        heading: "Your Treatment Plan",
        paragraphs: [
          "Your physiotherapist will then outline a recommended treatment plan. This may include a combination of hands-on treatment (manual therapy), an individualized exercise program, education, and advice on activity modification.",
          "The plan is always tailored to your specific presentation and goals — not a generic protocol.",
        ],
      },
      {
        heading: "How to Prepare",
        paragraphs: [
          "There are a few simple things you can do to get the most from your first appointment.",
        ],
        list: [
          "Bring any relevant imaging reports (X-rays, MRI) or specialist letters.",
          "Wear or bring clothing that allows comfortable access to the area being assessed.",
          "Write down a brief summary of your symptoms, including when they started and what aggravates them.",
          "Note any previous treatments and whether they helped.",
          "Come with your goals in mind — what would you like to be able to do again?",
        ],
      },
    ],
    relatedSlugs: [
      "5-exercises-for-lower-back-pain",
      "dry-needling-vs-acupuncture",
    ],
  },
  {
    slug: "5-exercises-for-lower-back-pain",
    title: "5 Evidence-Based Exercises for Lower Back Pain Relief",
    excerpt:
      "Simple, clinician-approved movements you can do at home to support your recovery and build long-term spinal resilience.",
    category: "Exercise & Rehab",
    tags: ["back pain", "exercise", "rehabilitation", "self-management"],
    readTime: "7 min read",
    date: "2024-11-08",
    isDraft: false,
    image: "/images/blog-back-exercises.jpg",
    imageAlt: "Physiotherapist performing hands-on back treatment on a patient",
    sections: [
      {
        paragraphs: [
          "Exercise is one of the most well-supported approaches for managing low back pain. For most people with non-specific lower back pain, appropriate movement is more helpful than rest.",
          "The following five exercises are commonly used in physiotherapy rehabilitation. However, every individual presentation is different. If you are experiencing back pain, please consult a qualified physiotherapist before starting a new exercise program to ensure the exercises are appropriate for your specific condition.",
        ],
      },
      {
        heading: "1. Knee-to-Chest Stretch",
        paragraphs: [
          "Lie on your back with your knees bent and feet flat on the floor. Slowly draw one knee toward your chest with both hands, holding for 20–30 seconds. Keep the lower back relaxed and breathe steadily. Repeat with the other side, then try both knees together.",
          "This gentle movement can help decompress the lumbar spine and reduce morning stiffness.",
        ],
      },
      {
        heading: "2. Cat-Cow Mobilization",
        paragraphs: [
          "Begin on all fours with hands under shoulders and knees under hips. Slowly arch your back upward (cat), then let it sag downward (cow). Move at a comfortable, controlled pace. Perform 10 repetitions.",
          "This exercise promotes gentle movement through the full range of the lumbar and thoracic spine.",
        ],
      },
      {
        heading: "3. Bird-Dog",
        paragraphs: [
          "From the same all-fours position, slowly extend your right arm forward and left leg behind simultaneously. Hold for 5–10 seconds, maintaining a neutral spine. Avoid rotation in the hips or arching the lower back. Return to the start and repeat on the opposite side. Perform 8–10 repetitions per side.",
          "The bird-dog activates deep spinal stabilizers, which play an important role in supporting the lumbar spine during movement.",
        ],
      },
      {
        heading: "4. Glute Bridge",
        paragraphs: [
          "Lie on your back with knees bent and feet hip-width apart. Press through your heels to lift your hips from the floor until your body forms a straight line from knees to shoulders. Hold for 2–3 seconds at the top, then lower slowly. Perform 10–12 repetitions.",
          "The glute bridge strengthens the gluteal muscles, which are often underactive in people with lower back pain.",
        ],
      },
      {
        heading: "5. Dead Bug",
        paragraphs: [
          "Lie on your back with arms extended toward the ceiling and hips and knees bent to 90 degrees. Slowly lower your right arm overhead while straightening your left leg toward the floor, keeping the lower back in contact with the surface. Return to the start and repeat on the other side. Perform 6–8 repetitions per side.",
          "This exercise challenges spinal stability in a controlled way and builds coordination between the arms, legs, and core.",
        ],
      },
      {
        heading: "A Note on Getting Started",
        paragraphs: [
          "These exercises should be performed without significant pain — mild discomfort or muscle fatigue is normal, but sharp or radiating pain is not. If your symptoms worsen with any exercise, stop and consult a physiotherapist.",
          "A personalized exercise program prescribed by a physiotherapist who has assessed your specific presentation will always be more targeted and appropriate than a general guide.",
        ],
      },
    ],
    relatedSlugs: [
      "understanding-your-first-physiotherapy-assessment",
      "dry-needling-vs-acupuncture",
    ],
  },
  {
    slug: "dry-needling-vs-acupuncture",
    title: "Dry Needling vs Acupuncture: What Is the Difference?",
    excerpt:
      "Two techniques that both use fine needles — but with very different theoretical frameworks, training pathways, and clinical applications.",
    category: "Treatment Insights",
    tags: ["dry needling", "acupuncture", "pain management", "myofascial"],
    readTime: "4 min read",
    date: "2024-11-15",
    isDraft: false,
    image: "/images/blog-dry-needling.jpg",
    imageAlt: "Multiple dry needling needles inserted into a patient's back muscles during physiotherapy treatment",
    sections: [
      {
        paragraphs: [
          "Patients often ask about the difference between dry needling and acupuncture, particularly because both involve inserting thin needles into the body. Despite this surface similarity, the two techniques differ significantly in their theoretical basis, intended mechanism, and clinical application.",
        ],
      },
      {
        heading: "What Is Dry Needling?",
        paragraphs: [
          "Dry needling is a physiotherapy technique directed at myofascial trigger points — tight, hyperirritable spots within a muscle belly that can produce local and referred pain. The term 'dry' refers to the fact that the needle contains no medication.",
          "The goal is to elicit a local twitch response in the muscle, which is thought to help reduce trigger point activity, relieve muscle tension, and support normal muscle function. Dry needling is applied by physiotherapists with post-graduate training in this specific technique and is always used as one component of a broader treatment program.",
        ],
      },
      {
        heading: "What Is Acupuncture?",
        paragraphs: [
          "Acupuncture is a practice rooted in traditional Chinese medicine (TCM) with a history spanning thousands of years. It involves inserting needles into specific anatomical points (acupoints) along pathways called meridians, with the aim of influencing the flow of qi (vital energy).",
          "Western medical acupuncture is a modified form used by some healthcare practitioners that draws on neurophysiological research rather than the traditional meridian model.",
        ],
      },
      {
        heading: "Key Differences",
        paragraphs: [
          "The fundamental distinction lies in the underlying rationale. Dry needling is grounded in musculoskeletal anatomy, pain science, and myofascial trigger point research. Acupuncture — in its traditional form — is based on a different philosophical system.",
        ],
        list: [
          "Dry needling targets myofascial trigger points; acupuncture targets acupoints along meridians.",
          "Dry needling is performed by physiotherapists with specific post-graduate training.",
          "Acupuncture may be performed by acupuncturists, doctors, or other trained practitioners.",
          "Both involve thin, sterile needles but differ in point selection and treatment goals.",
          "Dry needling is always used as part of an integrated physiotherapy treatment plan.",
        ],
      },
      {
        heading: "Which One Is Right for You?",
        paragraphs: [
          "If you have musculoskeletal pain, muscle tightness, or myofascial conditions, dry needling as part of a physiotherapy program may be appropriate. The best approach is always determined through a clinical assessment.",
          "Your physiotherapist will discuss all treatment options with you and explain whether dry needling is a suitable component of your care plan.",
        ],
      },
    ],
    relatedSlugs: [
      "understanding-your-first-physiotherapy-assessment",
      "5-exercises-for-lower-back-pain",
    ],
  },
  {
    slug: "cupping-therapy-what-to-expect",
    title: "Cupping Therapy: What It Is and What to Expect",
    excerpt:
      "From traditional fire cupping to modern silicone cups — a clear guide to how cupping therapy works, its clinical uses, and what the marks actually mean.",
    category: "Treatment Insights",
    tags: ["cupping therapy", "myofascial", "pain relief", "soft tissue"],
    readTime: "5 min read",
    date: "2024-12-01",
    isDraft: false,
    image: "/images/blog-cupping.jpg",
    imageAlt: "Cupping therapy treatment on a patient's back",
    sections: [
      {
        paragraphs: [
          "Cupping therapy has gained considerable visibility in recent years — partly due to high-profile athletes displaying the characteristic circular marks at major sporting events. At Nagpal's Physio Care, cupping is one of several advanced techniques used as part of an integrated physiotherapy treatment program.",
          "Here is a straightforward explanation of what cupping therapy involves, the different types available, and what patients can expect.",
        ],
      },
      {
        heading: "How Cupping Works",
        paragraphs: [
          "Cupping involves placing cups on the skin to create a suction effect. This negative pressure draws the superficial layers of soft tissue upward into the cup, increasing local blood flow, mobilizing connective tissue, and reducing muscle tension.",
          "The technique is thought to help release myofascial restrictions, decrease pain sensitivity, and support tissue recovery — particularly in areas of chronic tightness or overuse.",
        ],
      },
      {
        heading: "Types of Cupping",
        paragraphs: [
          "At Nagpal's Physio Care, several cupping modalities are available depending on the patient's condition and clinical goals.",
        ],
        list: [
          "Dry Cupping — suction only, using silicone or pump-action cups placed statically or moved along the tissue.",
          "Wet Cupping (Hijamah) — involves small superficial incisions followed by cupping to draw out a small amount of blood; rooted in Islamic medicine and used for specific conditions.",
          "Fire Cupping — a traditional method in which a flame briefly heats the air inside a glass cup before application, creating suction as the air cools.",
          "Steam Cupping — uses heat-assisted cups to combine warmth with suction for deeper soft tissue release.",
          "Moxibustion — a related technique that uses burning dried mugwort near the skin to warm and stimulate specific points.",
        ],
      },
      {
        heading: "What Are the Marks?",
        paragraphs: [
          "The circular discolouration left after cupping is not bruising caused by physical trauma. It results from the suction drawing stagnant blood and metabolic byproducts to the surface of the skin. Darker marks typically indicate areas of greater tissue restriction or poor local circulation.",
          "The marks generally fade within 3–10 days and are not painful to touch.",
        ],
      },
      {
        heading: "Is Cupping Right for You?",
        paragraphs: [
          "Cupping is commonly used for back and neck pain, shoulder tightness, sports recovery, and myofascial conditions. It is not appropriate for everyone — including patients with certain skin conditions, bleeding disorders, or during pregnancy.",
          "A thorough assessment is always conducted before any technique is applied. Your physiotherapist will discuss whether cupping is clinically appropriate for your presentation.",
        ],
      },
    ],
    relatedSlugs: [
      "dry-needling-vs-acupuncture",
      "recovering-from-knee-replacement",
    ],
  },
  {
    slug: "recovering-from-knee-replacement",
    title: "Recovering from Total Knee Replacement: A Physiotherapy Guide",
    excerpt:
      "What the rehabilitation journey looks like after TKR surgery — from the first days post-op through to returning to full function.",
    category: "Patient Education",
    tags: ["knee replacement", "TKR", "post-surgical rehab", "recovery"],
    readTime: "8 min read",
    date: "2024-12-10",
    isDraft: false,
    image: "/images/blog-knee-rehab.jpg",
    imageAlt: "Physiotherapist assisting a patient with knee rehabilitation exercises",
    sections: [
      {
        paragraphs: [
          "Total knee replacement (TKR) is one of the most commonly performed orthopaedic procedures in India. While the surgery itself addresses the structural damage in the joint, the quality of the outcome depends significantly on what happens in the weeks and months that follow — and physiotherapy is central to that process.",
          "This guide outlines what a typical TKR rehabilitation journey looks like and what patients can expect at each stage.",
        ],
      },
      {
        heading: "Days 1–3: Early Post-Operative Phase",
        paragraphs: [
          "Physiotherapy begins on the day of or the day after surgery. At this stage, the goals are to safely begin moving the joint, prevent complications such as deep vein thrombosis (DVT), manage swelling, and start weight-bearing.",
          "Early exercises include ankle pumps, static quadriceps contractions, and gentle knee flexion and extension. Your physiotherapist will also guide you on safe movement, getting in and out of bed, and using walking aids correctly.",
        ],
      },
      {
        heading: "Weeks 1–6: Building Range of Motion and Strength",
        paragraphs: [
          "The primary focus during this phase is regaining knee flexion and extension, reducing swelling, and progressively strengthening the quadriceps, hamstrings, and gluteal muscles.",
          "You should aim to reach at least 90 degrees of knee flexion within the first two weeks, with ongoing progression toward full range of motion. Swelling management — through elevation, ice, and compression — remains important throughout.",
        ],
        list: [
          "Straight leg raises to rebuild quadriceps strength.",
          "Seated knee flexion and extension exercises.",
          "Gentle cycling on a stationary bike once range allows.",
          "Standing balance and weight-shifting exercises.",
          "Hydrotherapy if available — reduces load while allowing movement.",
        ],
      },
      {
        heading: "Weeks 6–12: Progressive Loading and Functional Training",
        paragraphs: [
          "As strength and range improve, the rehabilitation program shifts toward more functional activities. Step training, incline walking, and progressive resistance exercises become the focus.",
          "Most patients are walking independently without aids by 6–8 weeks, and driving is often possible by 8–10 weeks (left knee replacement in a manual vehicle). Your physiotherapist will guide timing based on your individual progress.",
        ],
      },
      {
        heading: "3–6 Months: Return to Full Function",
        paragraphs: [
          "By three months, most patients have returned to the activities of daily living. Full recovery — including returning to low-impact sport, gardening, or stair climbing without limitation — typically takes 3–6 months, with some patients continuing to improve for up to 12 months post-surgery.",
          "Consistency with your home exercise program between clinic appointments is one of the strongest predictors of a good outcome.",
        ],
      },
      {
        heading: "Common Challenges",
        paragraphs: [
          "Some patients experience a plateau in their range of motion, persistent swelling, or difficulty with specific activities. These are best addressed with your physiotherapist, who can modify the program, apply manual therapy to the joint, or refer back to the surgical team if needed.",
          "At Nagpal's Physio Care, we have experience guiding patients through TKR rehabilitation and are familiar with the demands of the post-operative process.",
        ],
      },
    ],
    relatedSlugs: [
      "understanding-your-first-physiotherapy-assessment",
      "neck-pain-and-posture",
    ],
  },
  {
    slug: "neck-pain-and-posture",
    title: "Neck Pain and Posture: What You Actually Need to Know",
    excerpt:
      "Why 'sit up straight' is only part of the answer — and what the evidence says about posture, screen use, and lasting relief from neck pain.",
    category: "Exercise & Rehab",
    tags: ["neck pain", "posture", "ergonomics", "desk worker"],
    readTime: "6 min read",
    date: "2024-12-18",
    isDraft: false,
    image: "/images/blog-neck-posture.jpg",
    imageAlt: "Person experiencing neck pain while working at a desk",
    sections: [
      {
        paragraphs: [
          "Neck pain is one of the most common musculoskeletal complaints in adults — and in a world of prolonged screen use, it is becoming increasingly prevalent among younger people too.",
          "Understanding the relationship between posture and neck pain is more nuanced than most people expect.",
        ],
      },
      {
        heading: "Does Poor Posture Cause Neck Pain?",
        paragraphs: [
          "The relationship between posture and pain is not as straightforward as it is often presented. Research has not consistently shown that any single 'correct' posture prevents neck pain, and many people with visibly poor posture have no pain at all.",
          "What matters more is how long you sustain any one position, the strength and endurance of the muscles supporting your neck and upper back, and your overall activity levels. Sustained static posture — regardless of whether it looks 'correct' — places ongoing load on the same tissues without variation.",
        ],
      },
      {
        heading: "The Role of Muscle Endurance",
        paragraphs: [
          "The deep cervical flexors and scapular stabilizers play a critical role in supporting the head and neck during sustained activity. In people with persistent neck pain, these muscles are often deconditioned — not because of posture per se, but because of reduced movement variety and insufficient loading.",
          "Strengthening and retraining these muscles through a targeted physiotherapy program is typically more effective than postural correction alone.",
        ],
      },
      {
        heading: "Practical Changes That Help",
        paragraphs: [
          "While there is no single perfect posture, some practical adjustments can reduce the load on the cervical spine during prolonged desk work.",
        ],
        list: [
          "Position your screen at approximately eye level to reduce forward head translation.",
          "Take a movement break every 30–45 minutes — even a brief change of position matters.",
          "Ensure your chair supports your lumbar spine so you are not rounding through the lower back and compensating through the neck.",
          "Use a headset or earphones rather than holding a phone between your ear and shoulder.",
          "Vary your working position — standing desks and laptop stands are useful if used with movement variety, not as a static replacement.",
        ],
      },
      {
        heading: "When to See a Physiotherapist",
        paragraphs: [
          "Most episodes of neck pain resolve within a few weeks with activity modification and targeted exercise. However, you should seek assessment if your pain is severe, persistent beyond 6 weeks, accompanied by headache, arm pain or tingling, or if it follows a trauma such as a fall or motor vehicle accident.",
          "A physiotherapist can identify the specific contributing factors in your case and provide a program that addresses the underlying problem — not just the symptom.",
        ],
      },
    ],
    relatedSlugs: [
      "5-exercises-for-lower-back-pain",
      "sports-injury-prevention",
    ],
  },
  {
    slug: "sports-injury-prevention",
    title: "Sports Injury Prevention: Warm-Up, Cool-Down, and Load Management",
    excerpt:
      "The most effective strategies to reduce injury risk — and why the warm-up you're currently doing may not be doing what you think.",
    category: "Exercise & Rehab",
    tags: ["sports injury", "warm-up", "prevention", "load management"],
    readTime: "6 min read",
    date: "2025-01-05",
    isDraft: false,
    image: "/images/blog-sports-injury.jpg",
    imageAlt: "Physiotherapist helping a patient with leg rehabilitation exercises in a modern clinic",
    sections: [
      {
        paragraphs: [
          "Sports injuries are a significant source of lost training time, reduced performance, and long-term joint problems. While not all injuries are preventable, evidence shows that a structured approach to preparation and load management can meaningfully reduce injury rates.",
        ],
      },
      {
        heading: "The Purpose of a Warm-Up",
        paragraphs: [
          "A warm-up serves several physiological functions: elevating muscle temperature, increasing blood flow to working tissues, improving neuromuscular activation, and preparing the joints for the demands of training.",
          "A static stretching routine — the most common warm-up approach — is not the most effective preparation for dynamic activity. Research consistently shows that static stretching immediately before exercise can temporarily reduce force production. A dynamic warm-up is a more appropriate choice.",
        ],
      },
      {
        heading: "What an Effective Dynamic Warm-Up Looks Like",
        paragraphs: [
          "An effective warm-up for most sports lasts 10–15 minutes and progressively increases in intensity.",
        ],
        list: [
          "5 minutes of light aerobic activity — jogging, cycling, or skipping.",
          "Dynamic mobility work: leg swings, hip circles, arm rotations, thoracic rotations.",
          "Movement-specific activation: lunges, high knees, lateral shuffles.",
          "Progressive neuromuscular activation: A-skips, bounding, change-of-direction drills.",
          "Sport-specific skill work at moderate intensity before full effort.",
        ],
      },
      {
        heading: "Load Management: The Most Overlooked Factor",
        paragraphs: [
          "Most sports injuries are overuse injuries — the result of tissue being asked to do more than it has been prepared for. This is a load management problem, not a structural one.",
          "The acute:chronic workload ratio (ACWR) is a well-researched concept in sports science: the ratio of your training load in the past week (acute) to your average training load over the past 4 weeks (chronic). A ratio above 1.5 — meaning you have done significantly more this week than your body is prepared for — is consistently associated with increased injury risk.",
        ],
      },
      {
        heading: "Cool-Down and Recovery",
        paragraphs: [
          "A cool-down after training supports the transition from high to resting physiological state: reducing heart rate and blood pressure gradually, beginning the clearance of metabolic byproducts, and reducing muscle soreness.",
          "Light aerobic activity for 5–10 minutes followed by static stretching and soft tissue work is appropriate post-exercise. This is the appropriate time for static stretching — not before.",
        ],
      },
      {
        heading: "When to Seek Assessment",
        paragraphs: [
          "If you have an existing injury or are returning to sport after a period of inactivity, a physiotherapy assessment can help identify your specific risk factors and guide a graduated return-to-sport program tailored to your demands.",
        ],
      },
    ],
    relatedSlugs: [
      "neck-pain-and-posture",
      "5-exercises-for-lower-back-pain",
    ],
  },
  {
    slug: "what-is-iastm",
    title: "What Is IASTM? Instrument-Assisted Soft Tissue Mobilization Explained",
    excerpt:
      "A clear explanation of IASTM — how it works, what conditions it is used for, and what to expect during treatment.",
    category: "Treatment Insights",
    tags: ["IASTM", "soft tissue", "manual therapy", "fascia"],
    readTime: "4 min read",
    date: "2025-01-15",
    isDraft: false,
    image: "/images/blog-iastm.jpg",
    imageAlt: "Physiotherapist using an IASTM instrument to perform soft tissue mobilization on a patient",
    sections: [
      {
        paragraphs: [
          "IASTM — Instrument-Assisted Soft Tissue Mobilization — is a manual therapy technique that uses specifically designed tools to assess and treat soft tissue dysfunction. It is used by physiotherapists as part of an integrated treatment approach for a range of musculoskeletal conditions.",
        ],
      },
      {
        heading: "How It Works",
        paragraphs: [
          "IASTM tools are typically made from stainless steel or hard plastic and have contoured edges designed to glide along soft tissue structures. The instrument is used to detect areas of altered tissue texture, tension, or mobility — and to apply controlled mechanical stimulation to those areas.",
          "The proposed mechanism involves promoting a local inflammatory response that stimulates tissue remodeling, breaking down scar tissue and fascial restrictions, and improving extensibility and function in the treated area.",
        ],
      },
      {
        heading: "What Conditions Is IASTM Used For?",
        paragraphs: [
          "IASTM is commonly used in the management of:",
        ],
        list: [
          "Plantar fasciitis and heel pain.",
          "Tendinopathies — including Achilles, patellar, and rotator cuff tendons.",
          "IT band syndrome.",
          "Post-surgical scarring and adhesions.",
          "Chronic neck and back pain with myofascial involvement.",
          "Lateral elbow pain (tennis elbow).",
        ],
      },
      {
        heading: "What to Expect During Treatment",
        paragraphs: [
          "During an IASTM treatment, the skin is first prepared with a lubricant or lotion. The instrument is then applied to the skin with varying levels of pressure and direction to assess and treat the target tissue.",
          "It is normal to experience mild discomfort during treatment, particularly over areas of restriction. Mild redness or petechiae (small red dots) on the skin following treatment is expected and resolves within a day or two.",
          "IASTM is almost never used in isolation — it is applied alongside therapeutic exercise, manual joint therapy, and a home program as part of a comprehensive treatment plan.",
        ],
      },
    ],
    relatedSlugs: [
      "dry-needling-vs-acupuncture",
      "cupping-therapy-what-to-expect",
    ],
  },
  {
    slug: "physiotherapy-for-neurological-conditions",
    title: "Physiotherapy for Neurological Conditions: What It Can Achieve",
    excerpt:
      "How physiotherapy supports people living with Parkinson's disease, stroke, multiple sclerosis, and other neurological conditions — and what realistic outcomes look like.",
    category: "Patient Education",
    tags: ["neurological", "Parkinson's", "stroke rehab", "MS", "neuro physio"],
    readTime: "7 min read",
    date: "2025-01-25",
    isDraft: false,
    image: "/images/blog-neuro-rehab.jpg",
    imageAlt: "Physiotherapist assisting a patient with rehabilitation exercise for neurological recovery",
    sections: [
      {
        paragraphs: [
          "Neurological physiotherapy is a specialized area of practice focused on people whose movement, balance, coordination, or function has been affected by a condition of the brain, spinal cord, or peripheral nervous system.",
          "At Nagpal's Physio Care, neurological conditions form a significant part of the clinical caseload. This article outlines what physiotherapy can realistically achieve for some of the most common neurological presentations.",
        ],
      },
      {
        heading: "Parkinson's Disease",
        paragraphs: [
          "Parkinson's disease is a progressive neurological condition that affects movement, causing tremor, rigidity, slowness of movement (bradykinesia), and postural instability. While it cannot be cured, physiotherapy has strong evidence for improving functional ability and quality of life.",
          "Physiotherapy for Parkinson's focuses on maintaining and improving gait, balance, and transfers; reducing fall risk; preserving flexibility and range of movement; and using cueing strategies (rhythmic auditory cues, visual cues) to improve movement initiation.",
        ],
      },
      {
        heading: "Stroke Rehabilitation",
        paragraphs: [
          "Following a stroke, the brain's remarkable capacity for plasticity — the ability to reorganize itself — is one of the most important principles underpinning rehabilitation. The more that affected movement patterns are practiced and repeated, the greater the potential for recovery.",
          "Physiotherapy targets the restoration of motor control, balance, and functional independence. This may include gait retraining, upper limb rehabilitation, and activity-specific practice such as transfers, stair climbing, or reaching tasks relevant to the patient's daily life.",
        ],
      },
      {
        heading: "Multiple Sclerosis",
        paragraphs: [
          "Multiple sclerosis (MS) is a complex, variable condition. Physiotherapy does not alter the underlying disease process but plays an important role in managing its functional consequences — fatigue, weakness, spasticity, balance impairment, and reduced mobility.",
          "Programs are carefully calibrated to avoid overheating (the Uhthoff phenomenon), with exercise intensity and timing adapted to the individual's tolerance and disease stage.",
        ],
      },
      {
        heading: "Paraplegia and Spinal Cord Injury",
        paragraphs: [
          "For patients with paraplegia, physiotherapy is focused on maximizing independence within the limits of the injury level, maintaining the health of functioning muscle groups, preventing complications such as contractures and pressure injury, and supporting wheelchair skills and transfers.",
          "Outcomes depend on the completeness and level of the spinal injury, but consistent physiotherapy input makes a measurable difference in both function and quality of life.",
        ],
      },
      {
        heading: "Setting Realistic Expectations",
        paragraphs: [
          "Neurological rehabilitation requires patience. Progress is often slower than in musculoskeletal conditions, and the trajectory is not always linear. Goals should be meaningful and functional — centered on what the patient wants to do in their daily life — rather than purely clinical measures.",
          "At Nagpal's Physio Care, we take time to understand each patient's individual situation, priorities, and support network, and to build a program that is both evidence-informed and realistic.",
        ],
      },
    ],
    relatedSlugs: [
      "understanding-your-first-physiotherapy-assessment",
      "recovering-from-knee-replacement",
    ],
  },
];

export const categories = [
  "All",
  "Patient Education",
  "Exercise & Rehab",
  "Treatment Insights",
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return blogPosts.filter((p) => slugs.includes(p.slug));
}
