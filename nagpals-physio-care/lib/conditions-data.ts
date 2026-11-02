export interface ConditionData {
  slug: string;
  title: string;
  shortDescription: string;
  introduction: string;
  symptoms: string[];
  causes: string[];
  treatmentApproaches: string[];
  whenToSeek: string[];
  relatedServiceSlugs: string[];
}

export const conditions: ConditionData[] = [
  {
    slug: "back-pain",
    title: "Back Pain",
    shortDescription:
      "One of the most common musculoskeletal complaints, affecting people of all ages and activity levels.",
    introduction:
      "Back pain affects a significant proportion of the population at some point in their lives. It can range from a mild ache that resolves within a few days to persistent discomfort that significantly impacts work, sleep, and everyday activities. Understanding the nature of your back pain is the first step toward effective management.",
    symptoms: [
      "Localized aching or sharp pain in the lower, mid, or upper back",
      "Stiffness following periods of rest or first thing in the morning",
      "Pain that radiates into the buttocks, hips, or down the leg (sciatica)",
      "Muscle spasm or tightness around the spine",
      "Reduced ability to bend, twist, or maintain certain postures",
      "Pain that worsens with prolonged sitting or standing",
    ],
    causes: [
      "Muscle and ligament strains from sudden or unaccustomed loading",
      "Intervertebral disc changes, including disc bulges or herniation",
      "Facet joint dysfunction or arthritis",
      "Poor posture and prolonged sedentary positions",
      "Deconditioning and core muscle weakness",
      "Work-related repetitive tasks or heavy lifting",
      "Degenerative disc disease associated with aging",
    ],
    treatmentApproaches: [
      "Individualized assessment to identify contributing factors and pain drivers",
      "Manual therapy techniques including mobilization and soft tissue treatment",
      "A progressive therapeutic exercise program targeting strength and flexibility",
      "Education on posture, movement hygiene, and activity modification",
      "Ergonomic guidance for workplace and daily activities",
      "Load management to support gradual return to full activity",
    ],
    whenToSeek: [
      "Pain persists beyond 6 weeks without clear improvement",
      "You experience radiating pain, numbness, or tingling into the legs",
      "Bladder or bowel function is affected (seek urgent medical care)",
      "Pain follows a significant fall, accident, or trauma",
      "Back pain is accompanied by unexplained weight loss, fever, or night sweats",
    ],
    relatedServiceSlugs: [
      "orthopedic-physiotherapy",
      "dry-needling",
      "iastm",
    ],
  },
  {
    slug: "neck-pain",
    title: "Neck Pain",
    shortDescription:
      "A common condition involving pain, stiffness, and restricted movement of the cervical spine.",
    introduction:
      "Neck pain is one of the most frequently reported musculoskeletal complaints, often arising from postural habits, occupational demands, or acute injury. It can range from mild stiffness that resolves quickly to chronic discomfort associated with headaches, restricted movement, and referred pain into the arms.",
    symptoms: [
      "Pain and stiffness in the neck, particularly with movement",
      "Difficulty turning the head or looking upward",
      "Headaches originating from the base of the skull (cervicogenic headaches)",
      "Referred pain, tingling, or numbness into the shoulders, arms, or hands",
      "Muscle tension in the upper trapezius and surrounding muscles",
      "Pain that worsens with prolonged desk work or screen time",
    ],
    causes: [
      "Poor posture and prolonged forward head position (common with desk work and device use)",
      "Cervical disc changes, including disc bulge or osteophyte formation",
      "Facet joint irritation or dysfunction",
      "Muscle strain from acute injury (e.g., whiplash) or repetitive strain",
      "Stress-related muscle tension and guarding",
      "Sleeping position or pillow height contributing to overnight discomfort",
    ],
    treatmentApproaches: [
      "Postural and movement assessment to identify contributing factors",
      "Cervical and thoracic joint mobilization and manipulation where clinically indicated",
      "Soft tissue therapy for muscle tension and trigger points",
      "Therapeutic exercise targeting deep neck flexor strength and cervical stability",
      "Ergonomic advice for workstation setup and daily habits",
      "Education on posture, sleep positioning, and self-management strategies",
    ],
    whenToSeek: [
      "Neck pain follows a whiplash-type injury or significant trauma",
      "You experience radiating pain, weakness, or numbness in the arms",
      "Dizziness, visual changes, or difficulty swallowing are associated with your neck pain",
      "Pain has persisted for several weeks without improvement",
      "Headaches are frequent and associated with neck stiffness",
    ],
    relatedServiceSlugs: [
      "orthopedic-physiotherapy",
      "dry-needling",
      "cupping-therapy",
    ],
  },
  {
    slug: "knee-pain",
    title: "Knee Pain",
    shortDescription:
      "Pain and dysfunction of the knee joint arising from injury, overuse, or degenerative changes.",
    introduction:
      "The knee is one of the most complex joints in the body and is commonly affected by both acute injury and gradual wear. Knee pain can arise from a wide range of causes — from ligament sprains and meniscal issues to patellofemoral dysfunction and osteoarthritis. An accurate assessment is essential to guide effective management.",
    symptoms: [
      "Pain localized to the front, inner, outer, or back of the knee",
      "Swelling, warmth, or tenderness around the joint",
      "Stiffness, particularly after rest or in the morning",
      "A clicking, catching, or locking sensation with movement",
      "Pain that worsens with stairs, squatting, running, or prolonged sitting",
      "A sense of giving way or instability in the knee",
    ],
    causes: [
      "Ligament sprains and tears (ACL, MCL, PCL, LCL)",
      "Meniscal injuries from twisting or loading movements",
      "Patellofemoral pain syndrome (runner's knee)",
      "Patellar tendinopathy (jumper's knee)",
      "Osteoarthritis and cartilage wear",
      "IT band syndrome in runners and cyclists",
      "Bursitis around the knee joint",
      "Quadriceps or hamstring muscle weakness contributing to poor joint loading",
    ],
    treatmentApproaches: [
      "Detailed assessment of knee joint, surrounding muscles, and lower limb biomechanics",
      "Progressive strengthening of quadriceps, hamstrings, and hip muscles",
      "Manual therapy to improve joint mobility and reduce pain",
      "Taping or bracing techniques to support loading during activity",
      "Education on activity modification and load management",
      "Return-to-sport or return-to-activity programs for acute injuries",
    ],
    whenToSeek: [
      "The knee is significantly swollen following an acute injury",
      "You are unable to bear weight on the knee",
      "The knee locked in a fixed position or gave way unexpectedly",
      "Pain is preventing you from everyday activities",
      "A knee injury has not improved after a week or two of rest",
    ],
    relatedServiceSlugs: [
      "sports-physiotherapy",
      "orthopedic-physiotherapy",
      "iastm",
    ],
  },
  {
    slug: "frozen-shoulder",
    title: "Frozen Shoulder",
    shortDescription:
      "A condition characterized by progressive pain and stiffness in the shoulder joint, significantly limiting range of movement.",
    introduction:
      "Frozen shoulder, clinically known as adhesive capsulitis, is a condition in which the shoulder joint capsule becomes inflamed, thickened, and contracted. This leads to a progressive, often painful restriction of shoulder movement that can significantly affect sleep, dressing, and daily activities. While the condition tends to resolve over time, physiotherapy can support symptom management and functional recovery at each stage.",
    symptoms: [
      "Progressive loss of shoulder movement, particularly rotation and elevation",
      "Aching pain at the outer shoulder, sometimes radiating into the upper arm",
      "Significant pain at night, particularly when lying on the affected side",
      "Difficulty with overhead activities, reaching behind the back, or dressing",
      "A marked discrepancy between active and passive shoulder range of motion",
    ],
    causes: [
      "Idiopathic onset — often without a clear identifiable cause",
      "Secondary to shoulder injury, surgery, or prolonged immobilization",
      "Associated with systemic conditions including diabetes and thyroid disorders",
      "More common in individuals between 40 and 60 years of age",
      "May follow a period of reduced arm use or post-fracture immobilization",
    ],
    treatmentApproaches: [
      "Stage-appropriate assessment and treatment aligned with the phase of the condition",
      "Gentle joint mobilization and stretching to maintain and progressively improve range",
      "Pain management strategies including heat, positioning advice, and activity modification",
      "Progressive shoulder rehabilitation exercises to restore strength and function",
      "Education on the natural history of the condition and realistic recovery expectations",
      "Collaboration with the referring doctor regarding steroid injection if clinically indicated",
    ],
    whenToSeek: [
      "Shoulder stiffness and pain have been progressively worsening over several weeks",
      "You are struggling to carry out everyday tasks or are having disturbed sleep",
      "You have diabetes or other systemic conditions alongside shoulder stiffness",
      "You are unsure whether your shoulder restriction is frozen shoulder or another condition",
    ],
    relatedServiceSlugs: [
      "orthopedic-physiotherapy",
      "dry-needling",
      "cupping-therapy",
    ],
  },
];

export function getConditionBySlug(slug: string): ConditionData | undefined {
  return conditions.find((c) => c.slug === slug);
}
