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
    isDraft: true,
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
    isDraft: true,
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
    isDraft: true,
    image: "/images/blog-dry-needling.jpg",
    imageAlt: "Chiropractor performing spinal adjustment and manual therapy",
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
