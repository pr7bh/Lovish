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
  Zap,
  Dumbbell,
  Hand,
  RotateCcw,
  TrendingUp,
  ClipboardList,
  Layers,
  Bandage,
  Move,
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
  image: string;
  imageAlt: string;
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
    image: "/images/service-sports.jpg",
    imageAlt: "Sports physiotherapy session with athlete rehabilitation",
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
    image: "/images/service-ortho.jpg",
    imageAlt: "Orthopedic physiotherapy assessment of a patient's joint",
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
    image: "/images/service-neuro.jpg",
    imageAlt: "Physiotherapist assisting patient with neurological rehabilitation",
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
    image: "/images/service-womens-health.jpg",
    imageAlt: "Women's health physiotherapy and rehabilitation session",
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
    image: "/images/service-pediatric.jpg",
    imageAlt: "Pediatric physiotherapy session with a child patient",
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
    image: "/images/blog-dry-needling.jpg",
    imageAlt: "Physiotherapist performing dry needling on a patient",
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
    image: "/images/blog-cupping.jpg",
    imageAlt: "Cupping therapy treatment applied to a patient's back",
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
    image: "/images/service-iastm.jpg",
    imageAlt: "IASTM instrument-assisted soft tissue mobilization treatment",
    relatedSlugs: ["dry-needling", "cupping-therapy", "orthopedic-physiotherapy"],
  },
  {
    slug: "electrotherapy",
    title: "Electrotherapy",
    shortDescription:
      "Evidence-based electrical modalities for pain relief, inflammation control, and accelerated tissue healing.",
    icon: Zap,
    introduction:
      "Electrotherapy encompasses a range of modalities that use electrical energy to promote tissue healing, reduce pain, and support rehabilitation. At Nagpal's Physio Care, electrotherapy is used as a clinical adjunct alongside therapeutic exercise and manual therapy — not as a standalone intervention.",
    overview: [
      "Transcutaneous Electrical Nerve Stimulation (TENS) for acute and chronic pain management.",
      "Interferential Therapy (IFT) for deep tissue pain relief and muscle re-education.",
      "Ultrasound therapy for soft tissue healing and scar tissue management.",
      "Shortwave diathermy for deep heating and tissue extensibility.",
      "Therapeutic laser (LLLT) for wound healing and pain modulation.",
    ],
    conditionsTreated: [
      "Acute and chronic musculoskeletal pain",
      "Soft tissue injuries and sprains",
      "Joint inflammation and swelling",
      "Nerve pain and radiculopathy",
      "Post-surgical wound healing",
      "Tendinopathies",
      "Muscle spasm and guarding",
    ],
    benefits: [
      "Non-invasive and generally well-tolerated pain relief.",
      "Supports the healing environment for injured soft tissues.",
      "Can reduce dependence on pain medication during rehabilitation.",
      "Enhances the effectiveness of subsequent exercise therapy.",
    ],
    whenToConsult: [
      "You have acute or subacute pain limiting your ability to exercise.",
      "Soft tissue inflammation is impeding your rehabilitation progress.",
      "Your physiotherapist recommends electrotherapy as part of your treatment plan.",
    ],
    image: "/images/service-electrotherapy.jpg",
    imageAlt: "Electrotherapy session with physiotherapy equipment",
    relatedSlugs: ["exercise-therapy", "manual-therapy", "orthopedic-physiotherapy"],
  },
  {
    slug: "exercise-therapy",
    title: "Exercise Therapy",
    shortDescription:
      "Structured, progressive therapeutic exercise programs designed to restore function, strength, and movement.",
    icon: Dumbbell,
    introduction:
      "Exercise therapy is the cornerstone of physiotherapy rehabilitation. At Nagpal's Physio Care, individualized exercise programs are developed following a thorough clinical assessment, ensuring that every movement prescription is safe, appropriate, and progressive.",
    overview: [
      "Individualized exercise prescription based on clinical assessment findings and patient goals.",
      "Progressive resistance training to restore muscle strength and endurance.",
      "Flexibility and mobility exercises tailored to the presenting condition.",
      "Functional movement training to support return to daily activities and sport.",
      "Home exercise program design with clear instruction and follow-up.",
    ],
    conditionsTreated: [
      "Musculoskeletal conditions — back, neck, shoulder, knee, and hip pain",
      "Post-surgical rehabilitation",
      "Sports injuries",
      "Neurological conditions",
      "Chronic pain and deconditioning",
      "Balance and gait disorders",
      "Post-fracture rehabilitation",
    ],
    benefits: [
      "Evidence-based, patient-specific exercise programs tailored to your condition.",
      "Progressive overload principles to drive adaptation safely.",
      "Education on exercise technique and self-management.",
      "Ongoing reassessment and program modification as you improve.",
    ],
    whenToConsult: [
      "You are recovering from injury or surgery and need structured rehabilitation.",
      "You feel deconditioned and want guidance on safe, progressive exercise.",
      "Your current exercise approach is not achieving the outcomes you expect.",
    ],
    image: "/images/service-exercise.jpg",
    imageAlt: "Therapeutic exercise rehabilitation session with a physiotherapist",
    relatedSlugs: ["manual-therapy", "strength-training", "sports-physiotherapy"],
  },
  {
    slug: "manual-therapy",
    title: "Manual Therapy",
    shortDescription:
      "Hands-on physiotherapy treatment including joint mobilization, manipulation, and soft tissue techniques.",
    icon: Hand,
    introduction:
      "Manual therapy is a set of hands-on techniques applied directly to joints, muscles, and soft tissues. At Nagpal's Physio Care, manual therapy is integrated into a broader rehabilitation program — never used in isolation — and is always guided by the findings of a thorough clinical assessment.",
    overview: [
      "Joint mobilization and manipulation to restore range of motion and reduce pain.",
      "Soft tissue massage and myofascial techniques to address muscle tightness.",
      "Neural mobilization for nerve-related symptoms and radiculopathy.",
      "Spinal and peripheral joint techniques based on clinical reasoning.",
      "Integrated with therapeutic exercise for lasting functional outcomes.",
    ],
    conditionsTreated: [
      "Cervical and lumbar spine dysfunction",
      "Joint stiffness and restricted range of motion",
      "Peripheral joint conditions — shoulder, hip, knee, ankle",
      "Nerve root irritation and radiculopathy",
      "Post-surgical joint stiffness",
      "Headaches of cervicogenic origin",
      "Muscle tightness and myofascial pain",
    ],
    benefits: [
      "Immediate improvement in joint mobility and pain in many presentations.",
      "Hands-on assessment provides detailed information to guide treatment.",
      "Complements exercise therapy by restoring movement needed for exercise.",
      "Applied by a qualified physiotherapist following evidence-based guidelines.",
    ],
    whenToConsult: [
      "You have joint stiffness or restricted movement limiting daily activities.",
      "Pain is not responding to exercise or activity modification alone.",
      "A physiotherapist has identified joint or soft tissue restriction as a contributing factor.",
    ],
    image: "/images/service-manual.jpg",
    imageAlt: "Manual therapy hands-on physiotherapy treatment",
    relatedSlugs: ["exercise-therapy", "orthopedic-physiotherapy", "chiropractic"],
  },
  {
    slug: "vestibular-rehabilitation",
    title: "Vestibular Rehabilitation",
    shortDescription:
      "Specialized therapy for dizziness, vertigo, and balance disorders related to the vestibular system.",
    icon: RotateCcw,
    introduction:
      "Vestibular rehabilitation is a specialized form of physiotherapy targeting conditions that affect the inner ear and its connections to the brain. Dizziness, vertigo, and balance problems can be significantly debilitating — vestibular rehabilitation provides an evidence-based pathway to recovery.",
    overview: [
      "Comprehensive vestibular assessment including positional testing and balance evaluation.",
      "Canalith repositioning manoeuvres for BPPV (Benign Paroxysmal Positional Vertigo).",
      "Habituation exercises to desensitize the vestibular system to provocative movements.",
      "Gaze stabilization exercises to improve visual-vestibular integration.",
      "Progressive balance and gait training to reduce fall risk.",
    ],
    conditionsTreated: [
      "Benign Paroxysmal Positional Vertigo (BPPV)",
      "Vestibular neuritis and labyrinthitis",
      "Unilateral vestibular hypofunction",
      "Chronic dizziness and disequilibrium",
      "Post-concussion vestibular dysfunction",
      "Balance disorders and increased fall risk",
      "Motion sensitivity and visually-induced dizziness",
    ],
    benefits: [
      "Targeted treatment of the underlying vestibular cause rather than symptom suppression.",
      "BPPV can often be resolved in one to three sessions with repositioning manoeuvres.",
      "Reduced dizziness, improved balance, and restored confidence in movement.",
      "Lower fall risk through progressive balance and gait rehabilitation.",
    ],
    whenToConsult: [
      "You experience spinning sensations (vertigo), particularly with position changes.",
      "You have persistent dizziness or unsteadiness affecting daily activities.",
      "You have been diagnosed with a vestibular condition and referred for physiotherapy.",
      "You have had a concussion and are experiencing ongoing dizziness or balance problems.",
    ],
    image: "/images/service-vestibular.jpg",
    imageAlt: "Vestibular rehabilitation balance therapy session",
    relatedSlugs: ["neurological-rehabilitation", "exercise-therapy", "manual-therapy"],
  },
  {
    slug: "strength-training",
    title: "Generalised Strength Training",
    shortDescription:
      "Progressive resistance training programs for rehabilitation, injury prevention, and overall functional fitness.",
    icon: TrendingUp,
    introduction:
      "Strength training is one of the most well-evidenced interventions in physiotherapy and rehabilitation. At Nagpal's Physio Care, generalized strength training programs are developed for patients recovering from injury, managing chronic conditions, or looking to build a foundation of physical health under clinical supervision.",
    overview: [
      "Baseline strength and functional movement assessment to identify priorities.",
      "Progressive resistance programs using body weight, bands, and weights as appropriate.",
      "Compound and isolation exercises tailored to the patient's goals and capacity.",
      "Techniques for safe lifting and load management.",
      "Periodized programs with regular reassessment and progression.",
    ],
    conditionsTreated: [
      "Deconditioning and generalized weakness",
      "Post-surgical or post-injury rehabilitation requiring strength rebuilding",
      "Osteoporosis and bone density maintenance",
      "Chronic pain with associated muscle wasting",
      "Age-related strength and balance decline",
      "Sports performance gaps between rehabilitation and return to training",
    ],
    benefits: [
      "Clinically supervised strength training with appropriate load management.",
      "Builds the physical foundation needed to sustain long-term joint health.",
      "Reduces risk of future injury through improved musculoskeletal resilience.",
      "Bridges the gap between rehabilitation and independent fitness training.",
    ],
    whenToConsult: [
      "You are recovering from injury or surgery and need to rebuild strength.",
      "You have been advised to improve strength as part of managing a chronic condition.",
      "You feel weak or deconditioned and want to start training safely.",
    ],
    image: "/images/service-strength.jpg",
    imageAlt: "Generalised strength training rehabilitation exercises",
    relatedSlugs: ["exercise-therapy", "sports-physiotherapy", "orthopedic-physiotherapy"],
  },
  {
    slug: "diet-nutrition",
    title: "Diet & Nutrition Charts",
    shortDescription:
      "Personalized dietary guidance and nutrition charts to support recovery, reduce inflammation, and optimize rehabilitation outcomes.",
    icon: ClipboardList,
    introduction:
      "Nutrition plays an important but often overlooked role in recovery from injury, surgery, and chronic musculoskeletal conditions. At Nagpal's Physio Care, diet and nutrition guidance is offered as a complementary component of rehabilitation — providing patients with practical, evidence-informed advice to support their recovery.",
    overview: [
      "Assessment of current dietary habits and nutritional needs in the context of rehabilitation.",
      "Personalized nutrition charts aligned with recovery phase and activity level.",
      "Guidance on anti-inflammatory food choices to support tissue healing.",
      "Protein intake recommendations to support muscle rebuilding and strength gains.",
      "Hydration and micronutrient guidance relevant to musculoskeletal health.",
    ],
    conditionsTreated: [
      "Post-surgical recovery requiring adequate protein and micronutrients",
      "Chronic inflammation contributing to pain and restricted recovery",
      "Osteoporosis and bone health",
      "Sports performance and body composition",
      "Weight management as part of joint load reduction (hip, knee, spine)",
      "Fatigue management during intensive rehabilitation",
    ],
    benefits: [
      "Practical, individualized nutrition guidance that complements physiotherapy.",
      "Supports tissue healing and muscle rebuilding during rehabilitation.",
      "Addresses nutritional gaps that may be slowing recovery.",
      "Empowers patients with knowledge to make informed dietary choices.",
    ],
    whenToConsult: [
      "You are recovering from surgery or a significant injury and want nutritional support.",
      "Your physiotherapist has identified nutrition as a factor in your recovery.",
      "You want a structured approach to nutrition alongside your rehabilitation program.",
    ],
    image: "/images/service-diet.jpg",
    imageAlt: "Healthy food and nutrition planning for rehabilitation",
    relatedSlugs: ["exercise-therapy", "strength-training", "sports-physiotherapy"],
  },
  {
    slug: "chiropractic",
    title: "Chiropractic Treatment",
    shortDescription:
      "Spinal and joint manipulation techniques to restore alignment, relieve pain, and improve musculoskeletal function.",
    icon: Layers,
    introduction:
      "Chiropractic treatment at Nagpal's Physio Care involves the application of high-velocity, low-amplitude spinal manipulation and joint adjustment techniques to address pain, stiffness, and dysfunction. These techniques are delivered by Dr. Lovish Nagpal as part of a comprehensive physiotherapy treatment program.",
    overview: [
      "Detailed spinal and postural assessment prior to any manipulative technique.",
      "High-velocity, low-amplitude (HVLA) joint manipulation where clinically indicated.",
      "Mobilization techniques for spinal and peripheral joints.",
      "Soft tissue preparation before and after manipulative treatment.",
      "Integrated with exercise therapy and patient education for lasting outcomes.",
    ],
    conditionsTreated: [
      "Acute and chronic low back pain",
      "Cervical spine dysfunction and neck pain",
      "Thoracic spine stiffness",
      "Facet joint syndrome",
      "Headaches of cervicogenic origin",
      "Joint restriction following injury",
      "Sacroiliac joint dysfunction",
    ],
    benefits: [
      "Immediate pain relief and improved range of motion in many presentations.",
      "Restores segmental joint mobility restricted by injury, posture, or overuse.",
      "Delivered by a qualified physiotherapist trained in manipulative therapy.",
      "Combined with exercise for sustained, functional improvement.",
    ],
    whenToConsult: [
      "You have spinal pain with restricted movement not responding to other treatments.",
      "You experience recurring episodes of back or neck pain.",
      "You have been assessed and are considered appropriate for manipulative therapy.",
    ],
    image: "/images/service-chiro.jpg",
    imageAlt: "Chiropractic spinal treatment by a physiotherapist",
    relatedSlugs: ["manual-therapy", "orthopedic-physiotherapy", "exercise-therapy"],
  },
  {
    slug: "kinesiotaping",
    title: "Kinesiotaping",
    shortDescription:
      "Application of elastic therapeutic tape to support joints, reduce swelling, and facilitate correct movement patterns.",
    icon: Bandage,
    introduction:
      "Kinesiotaping involves the application of a specialized elastic adhesive tape to the skin to support joints and soft tissues, facilitate muscle activity, reduce swelling, and support correct movement during activity. It is commonly used as an adjunct within a physiotherapy treatment program.",
    overview: [
      "Assessment of the target area and determination of the appropriate taping technique.",
      "Application of kinesio tape with tension and direction specific to the clinical goal.",
      "Techniques may target muscle facilitation, inhibition, joint support, or lymphatic drainage.",
      "Patients are educated on tape maintenance, duration, and removal.",
      "Integrated with active rehabilitation — not a substitute for exercise.",
    ],
    conditionsTreated: [
      "Shoulder impingement and rotator cuff conditions",
      "Patellofemoral pain syndrome (runner's knee)",
      "Achilles tendinopathy",
      "Ankle sprains and instability",
      "Lower back pain",
      "Shin splints",
      "Post-surgical swelling and oedema",
      "Postural correction during rehabilitation",
    ],
    benefits: [
      "Provides joint and soft tissue support without restricting full range of motion.",
      "May reduce swelling through lymphatic drainage taping techniques.",
      "Worn for several days, providing continuous support between sessions.",
      "Hypoallergenic and water-resistant — compatible with most daily activities.",
    ],
    whenToConsult: [
      "You need joint support during training or daily activities while recovering from injury.",
      "Your physiotherapist has identified kinesiotaping as a useful adjunct to your program.",
      "You experience swelling or poor muscle activation in the affected area.",
    ],
    image: "/images/service-kinesio.jpg",
    imageAlt: "Kinesiotaping applied to an athlete's shoulder",
    relatedSlugs: ["sports-physiotherapy", "exercise-therapy", "orthopedic-physiotherapy"],
  },
  {
    slug: "pilates",
    title: "Pilates Rehabilitation",
    shortDescription:
      "Clinical Pilates-based exercise for core stability, postural correction, and movement control rehabilitation.",
    icon: Move,
    introduction:
      "Clinical Pilates uses the principles of the Pilates method — core engagement, movement control, breathing, and postural alignment — within a structured physiotherapy rehabilitation context. It is particularly effective for spinal conditions, postural dysfunction, and patients who require a low-impact, progressive approach to rebuilding functional movement.",
    overview: [
      "Postural and movement assessment to identify areas of weakness, compensation, or restriction.",
      "Pilates-based exercise programs designed around clinical rehabilitation goals.",
      "Progressive core activation from deep stabilizers to dynamic movement patterns.",
      "Breathing coordination and body awareness training.",
      "Mat-based and equipment-assisted programs as appropriate.",
    ],
    conditionsTreated: [
      "Chronic low back pain",
      "Postural dysfunction and spinal instability",
      "Post-surgical spinal rehabilitation",
      "Pelvic floor and abdominal rehabilitation",
      "Hip and pelvic instability",
      "Scoliosis",
      "Pregnancy and post-natal rehabilitation",
      "General deconditioning requiring low-impact rehabilitation",
    ],
    benefits: [
      "Builds deep core stability progressively and safely.",
      "Improves body awareness and movement quality.",
      "Low-impact and suitable for a wide range of age groups and conditions.",
      "Complements manual therapy and traditional exercise approaches.",
    ],
    whenToConsult: [
      "You have chronic back pain or postural problems that exercise alone has not resolved.",
      "You are recovering from spinal surgery and need a graduated rehabilitation approach.",
      "You want a structured, clinically supervised approach to core and postural rehabilitation.",
    ],
    image: "/images/service-pilates.jpg",
    imageAlt: "Clinical Pilates rehabilitation exercise session",
    relatedSlugs: ["exercise-therapy", "strength-training", "orthopedic-physiotherapy"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceData[] {
  return services.filter((s) => slugs.includes(s.slug));
}
