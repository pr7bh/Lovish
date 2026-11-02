import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bone,
  Brain,
  Heart,
  Baby,
  Target,
  Wind,
  Wrench,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  introduction: string;
  overview: string[];
  conditionsTreated: string[];
  benefits: string[];
  whenToConsult: string[];
  relatedSlugs: string[];
}

export const services: ServiceData[] = [
  {
    slug: "sports-physiotherapy",
    title: "Sports Physiotherapy",
    shortDescription:
      "Specialized assessment and rehabilitation for sports injuries across all performance levels.",
    icon: Activity,
    introduction:
      "Sports physiotherapy focuses on the prevention, assessment, and treatment of injuries that occur during physical activity and sport. Whether you are a weekend recreational athlete or a competitive player, a structured, individualized rehabilitation program can support your return to full activity.",
    overview: [
      "Comprehensive biomechanical and movement screening to identify injury risk factors.",
      "Evidence-based exercise rehabilitation tailored to your sport and performance demands.",
      "Manual therapy, soft tissue treatment, and joint mobilization as clinically indicated.",
      "Sport-specific conditioning progressions and structured return-to-play protocols.",
      "Load management strategies and education to reduce risk of re-injury.",
    ],
    conditionsTreated: [
      "Ligament sprains and muscle strains",
      "Tendinopathies (Achilles, patellar, rotator cuff)",
      "ACL and other knee ligament injuries",
      "Meniscal injuries",
      "Shoulder impingement and labral conditions",
      "Shin splints and stress reactions",
      "Ankle instability",
      "Hamstring and quadriceps strains",
      "Groin and hip flexor injuries",
      "Runner's knee (patellofemoral pain syndrome)",
    ],
    benefits: [
      "Structured rehabilitation timeline aligned with your recovery goals.",
      "Exercise progressions specific to the physical demands of your sport.",
      "Education on injury prevention and load management.",
      "Support through all stages — from acute management to return to play.",
    ],
    whenToConsult: [
      "You have sustained an acute injury during or after physical activity.",
      "Pain is limiting your ability to train or compete.",
      "You experience a recurring injury to the same area.",
      "You are preparing to return to sport following injury or surgery.",
    ],
    relatedSlugs: ["orthopedic-physiotherapy", "dry-needling", "iastm"],
  },
  {
    slug: "orthopedic-physiotherapy",
    title: "Orthopedic Physiotherapy",
    shortDescription:
      "Assessment and rehabilitation of musculoskeletal conditions affecting bones, joints, and soft tissues.",
    icon: Bone,
    introduction:
      "Orthopedic physiotherapy addresses conditions of the musculoskeletal system — including bones, joints, muscles, tendons, and ligaments. It encompasses both conservative management of musculoskeletal disorders and post-operative rehabilitation following orthopedic procedures.",
    overview: [
      "Detailed orthopedic assessment to establish diagnosis and guide treatment planning.",
      "Manual therapy techniques including joint mobilization and manipulation where indicated.",
      "Progressive therapeutic exercise to restore strength, range of motion, and function.",
      "Post-surgical rehabilitation following joint replacement, ligament reconstruction, or spinal surgery.",
      "Patient education on self-management strategies and long-term joint health.",
    ],
    conditionsTreated: [
      "Osteoarthritis of the hip, knee, and shoulder",
      "Post-surgical rehabilitation (hip replacement, knee replacement, spinal surgery)",
      "Rotator cuff tears and shoulder conditions",
      "Lumbar disc herniation and nerve root irritation",
      "Cervical spondylosis and facet joint dysfunction",
      "Carpal tunnel syndrome",
      "Plantar fasciitis",
      "Achilles tendinopathy",
      "Wrist and hand conditions",
      "Postural dysfunction and chronic musculoskeletal pain",
    ],
    benefits: [
      "Targeted rehabilitation plans informed by clinical assessment and evidence.",
      "Restoration of strength and function following injury or surgery.",
      "Pain reduction strategies through a combination of manual and exercise-based approaches.",
      "Guidance on activity modification and long-term joint protection.",
    ],
    whenToConsult: [
      "You are experiencing joint pain, stiffness, or reduced range of motion.",
      "You have been referred for post-surgical physiotherapy.",
      "Pain has persisted beyond what you would expect from a minor injury.",
      "Your day-to-day activities or sleep are significantly affected by musculoskeletal pain.",
    ],
    relatedSlugs: ["sports-physiotherapy", "iastm", "dry-needling"],
  },
  {
    slug: "neurological-rehabilitation",
    title: "Neurological Rehabilitation",
    shortDescription:
      "Specialist rehabilitation for conditions affecting the nervous system, movement, and functional independence.",
    icon: Brain,
    introduction:
      "Neurological physiotherapy focuses on improving movement, function, and quality of life in people living with neurological conditions. This specialized field addresses the complex motor, balance, and coordination challenges that arise when the brain, spinal cord, or peripheral nerves are affected.",
    overview: [
      "Comprehensive neurological assessment of movement, balance, and functional ability.",
      "Task-specific and progressive exercise programs to promote neuroplasticity.",
      "Gait retraining and mobility aids assessment as required.",
      "Balance and fall prevention programs.",
      "Fatigue management strategies and education for patients and caregivers.",
    ],
    conditionsTreated: [
      "Stroke and acquired brain injury",
      "Parkinson's disease",
      "Multiple sclerosis (MS)",
      "Spinal cord injury",
      "Guillain-Barré syndrome",
      "Peripheral neuropathy",
      "Bell's palsy",
      "Vestibular disorders and dizziness",
      "Balance and gait disorders",
    ],
    benefits: [
      "Improved functional independence and mobility.",
      "Targeted programs to support neuroplasticity and motor re-learning.",
      "Reduced fall risk through balance and coordination training.",
      "Enhanced quality of life and participation in daily activities.",
    ],
    whenToConsult: [
      "You have been diagnosed with a neurological condition affecting movement or balance.",
      "You are recovering from a stroke or traumatic brain injury.",
      "You experience unexplained falls, dizziness, or coordination difficulties.",
      "A neurologist or specialist has recommended physiotherapy.",
    ],
    relatedSlugs: ["orthopedic-physiotherapy", "pediatric-rehabilitation"],
  },
  {
    slug: "womens-health",
    title: "Women's Health Physiotherapy",
    shortDescription:
      "Physiotherapy addressing pelvic floor, ante- and post-natal, and women's musculoskeletal health across all life stages.",
    icon: Heart,
    introduction:
      "Women's health physiotherapy provides specialist assessment and management of conditions specific to women across all stages of life — from pregnancy and post-natal recovery to pelvic floor rehabilitation and menopause-related musculoskeletal changes.",
    overview: [
      "Pelvic floor assessment and individualized retraining programs.",
      "Ante-natal and post-natal exercise guidance and rehabilitation.",
      "Education on bladder and bowel health.",
      "Treatment of musculoskeletal conditions associated with pregnancy (e.g., pelvic girdle pain, low back pain).",
      "Return-to-exercise guidance following childbirth.",
    ],
    conditionsTreated: [
      "Pelvic floor dysfunction (incontinence, prolapse)",
      "Pelvic girdle pain during pregnancy",
      "Post-natal musculoskeletal rehabilitation",
      "Diastasis recti (abdominal separation)",
      "Pelvic pain conditions",
      "Bladder urgency and frequency",
      "Post-surgical pelvic rehabilitation",
      "Menopausal musculoskeletal changes",
    ],
    benefits: [
      "Confidential, one-on-one assessment in a respectful clinical environment.",
      "Individualized pelvic floor rehabilitation programs.",
      "Safe exercise guidance tailored to the stage of pregnancy or recovery.",
      "Education to support long-term pelvic and musculoskeletal health.",
    ],
    whenToConsult: [
      "You experience leakage of urine with coughing, sneezing, or exercise.",
      "You have pelvic pain, heaviness, or pressure.",
      "You are pregnant and experiencing low back, pelvic, or hip pain.",
      "You are post-natal and looking for guidance on safe return to exercise.",
    ],
    relatedSlugs: ["orthopedic-physiotherapy", "pediatric-rehabilitation"],
  },
  {
    slug: "pediatric-rehabilitation",
    title: "Pediatric Rehabilitation",
    shortDescription:
      "Physiotherapy for infants, children, and adolescents addressing developmental, musculoskeletal, and neurological needs.",
    icon: Baby,
    introduction:
      "Pediatric physiotherapy supports the physical development, movement, and rehabilitation of infants, children, and adolescents. Assessments and treatment plans are adapted to each child's developmental stage, ensuring care is appropriate, engaging, and effective.",
    overview: [
      "Age-appropriate assessment of movement, strength, and developmental milestones.",
      "Play-based therapy and exercise programs designed for children and adolescents.",
      "Collaboration with parents, caregivers, and schools to support consistent rehabilitation.",
      "Management of acute musculoskeletal injuries in young athletes.",
      "Postural and gait analysis with appropriate interventions.",
    ],
    conditionsTreated: [
      "Developmental coordination disorder (DCD)",
      "Torticollis and plagiocephaly in infants",
      "Cerebral palsy",
      "Scoliosis and spinal conditions",
      "Growing pains and Osgood-Schlatter disease",
      "Sports injuries in children and adolescents",
      "Hypermobility and joint instability",
      "Post-surgical rehabilitation in children",
      "Flat feet and lower limb alignment concerns",
    ],
    benefits: [
      "Assessment and treatment tailored to each child's developmental stage.",
      "Play-based and engaging therapy that children respond to positively.",
      "Family-centred approach with guidance for carers and parents.",
      "Early intervention to support healthy movement development.",
    ],
    whenToConsult: [
      "Your child is not meeting expected gross motor developmental milestones.",
      "Your child complains of recurring joint or limb pain.",
      "Your child has been diagnosed with a developmental or neurological condition.",
      "A paediatrician or GP has recommended physiotherapy.",
    ],
    relatedSlugs: ["neurological-rehabilitation", "sports-physiotherapy"],
  },
  {
    slug: "dry-needling",
    title: "Dry Needling",
    shortDescription:
      "A targeted technique using fine needles to address myofascial trigger points and improve muscle function.",
    icon: Target,
    introduction:
      "Dry needling is a physiotherapy technique that uses fine, sterile needles to target myofascial trigger points — hyperirritable spots within muscle tissue that can contribute to local and referred pain, restricted movement, and altered muscle function. It is one component of a broader physiotherapy treatment plan.",
    overview: [
      "Assessment of trigger points and myofascial pain patterns prior to treatment.",
      "Application of fine sterile needles to targeted muscle tissue.",
      "Needles are retained briefly or with gentle stimulation as clinically appropriate.",
      "Always integrated with a broader rehabilitation program — not a standalone treatment.",
      "Post-treatment exercise and self-management guidance.",
    ],
    conditionsTreated: [
      "Myofascial pain syndrome",
      "Chronic muscle tension and trigger points",
      "Neck and upper back pain",
      "Low back pain",
      "Headaches arising from cervical muscle tension",
      "Shoulder and rotator cuff conditions",
      "Hip and gluteal muscle pain",
      "Sports-related muscle injuries",
    ],
    benefits: [
      "Targeted relief from muscle tightness and trigger point sensitivity.",
      "May support improved range of motion and muscle activation.",
      "A useful adjunct to manual therapy and therapeutic exercise.",
      "Performed by a physiotherapist with appropriate training and qualifications.",
    ],
    whenToConsult: [
      "You have persistent muscle pain that has not responded to other conservative treatments.",
      "Your physiotherapist has identified active trigger points contributing to your symptoms.",
      "You have been recommended dry needling as part of a comprehensive treatment plan.",
    ],
    relatedSlugs: ["iastm", "cupping-therapy", "sports-physiotherapy"],
  },
  {
    slug: "cupping-therapy",
    title: "Cupping Therapy",
    shortDescription:
      "A soft tissue technique using negative pressure cups to support myofascial release and tissue mobility.",
    icon: Wind,
    introduction:
      "Cupping therapy, also referred to as myofascial decompression, uses specialized cups to create gentle negative pressure on the skin and soft tissues. This approach may support improved tissue mobility, blood flow, and pain relief when used as part of a physiotherapy treatment program.",
    overview: [
      "Assessment of tissue quality, mobility, and presenting symptoms before application.",
      "Placement of silicone or plastic cups on targeted areas of the body.",
      "Static or dynamic cupping techniques applied based on clinical reasoning.",
      "Always used in conjunction with active exercise and physiotherapy — not as a standalone treatment.",
      "Education on expected responses and post-treatment care.",
    ],
    conditionsTreated: [
      "Myofascial restrictions and fascial tightness",
      "Chronic back and neck pain",
      "Sports recovery and soft tissue stiffness",
      "Post-injury scar tissue and adhesions",
      "Shoulder and upper back tension",
      "IT band tightness and lower limb restrictions",
    ],
    benefits: [
      "Supports myofascial release and improved soft tissue extensibility.",
      "May complement manual therapy for areas of restricted movement.",
      "Non-invasive and generally well-tolerated by patients.",
      "Can be combined effectively with active exercise rehabilitation.",
    ],
    whenToConsult: [
      "Your physiotherapist has identified soft tissue mobility restrictions contributing to your symptoms.",
      "You are seeking complementary techniques alongside your main physiotherapy program.",
      "You are recovering from a soft tissue injury or experiencing chronic muscle tension.",
    ],
    relatedSlugs: ["dry-needling", "iastm", "orthopedic-physiotherapy"],
  },
  {
    slug: "iastm",
    title: "IASTM",
    shortDescription:
      "Instrument-assisted soft tissue mobilization using specialized tools to address fascial restrictions and scar tissue.",
    icon: Wrench,
    introduction:
      "Instrument-Assisted Soft Tissue Mobilization (IASTM) is a physiotherapy technique that uses specially designed stainless steel or other instruments to assess and treat soft tissue restrictions. It can be particularly useful for areas of scar tissue, fascial adhesions, or chronic soft tissue dysfunction.",
    overview: [
      "Assessment of soft tissue quality, mobility, and functional limitations.",
      "Application of IASTM instruments to target areas of restriction or scar tissue.",
      "Used in conjunction with active exercise to promote tissue remodeling.",
      "Integrated into a comprehensive physiotherapy program based on clinical assessment.",
      "Post-treatment guidance on activity and self-management.",
    ],
    conditionsTreated: [
      "Post-surgical scar tissue and adhesions",
      "Fascial restrictions and chronic soft tissue dysfunction",
      "Tendinopathy and chronic tendon pain",
      "IT band syndrome",
      "Plantar fasciitis",
      "Rotator cuff conditions",
      "Shin splints",
      "Post-fracture soft tissue rehabilitation",
    ],
    benefits: [
      "Targeted treatment of scar tissue and fascial adhesions.",
      "May improve soft tissue extensibility and range of motion.",
      "Particularly useful for chronic conditions where tissue quality is a contributing factor.",
      "Used alongside exercise rehabilitation for best outcomes.",
    ],
    whenToConsult: [
      "You have chronic soft tissue pain that has not responded to exercise alone.",
      "You have significant scar tissue from previous injury or surgery.",
      "Your physiotherapist has identified fascial restrictions as a contributing factor.",
    ],
    relatedSlugs: ["dry-needling", "cupping-therapy", "orthopedic-physiotherapy"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceData[] {
  return services.filter((s) => slugs.includes(s.slug));
}
