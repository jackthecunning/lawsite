import { getBannerImageUrl } from '../utils/imageUtils';
import { getImageUrl } from '../utils/imageUtils';

export const services = [
  {
    id: 1,
    icon: "fas fa-balance-scale",
    title: "Appellate Advocacy",
    description: "Expert representation in appellate courts, handling complex appeals and legal arguments.",
    features: [
      "Civil appeals",
      "Criminal appeals",
      "Appellate brief writing",
      "Oral arguments"
    ]
  },
  {
    id: 2,
    icon: "fas fa-hand-holding-usd",
    title: "Bad Faith",
    description: "Holding insurance companies accountable for bad faith practices and unfair claim denials.",
    features: [
      "Insurance bad faith claims",
      "Claim denial disputes",
      "Policy coverage litigation",
      "Damages recovery"
    ]
  },
  {
    id: 3,
    icon: "fas fa-users",
    title: "Class Action",
    description: "Representing groups of individuals in large-scale litigation against corporations.",
    features: [
      "Consumer protection",
      "Securities fraud",
      "Product liability",
      "Employment disputes"
    ]
  },
  {
    id: 4,
    icon: "fas fa-hard-hat",
    title: "Construction",
    description: "Comprehensive legal services for construction disputes and contract matters.",
    features: [
      "Contract disputes",
      "Defect claims",
      "Delay claims",
      "Mechanics liens"
    ]
  },
  {
    id: 5,
    icon: "fas fa-leaf",
    title: "Environmental & Toxic Torts",
    description: "Representing clients in environmental litigation and toxic exposure cases.",
    features: [
      "Environmental compliance",
      "Toxic exposure claims",
      "Contamination cases",
      "Regulatory matters"
    ]
  },
  {
    id: 6,
    icon: "fas fa-user-tie",
    title: "Employment Law",
    description: "Protecting employee rights and helping employers navigate workplace regulations.",
    features: [
      "Wrongful termination",
      "Discrimination claims",
      "Employment contracts",
      "Wage disputes"
    ]
  },
  {
    id: 7,
    icon: "fas fa-gavel",
    title: "General Liability",
    description: "Defense representation in a wide range of liability claims and litigation.",
    features: [
      "Premises liability",
      "Personal injury defense",
      "Negligence claims",
      "Trial representation"
    ]
  },
  {
    id: 8,
    icon: "fas fa-file-contract",
    title: "Insurance Coverage",
    description: "Analyzing and litigating complex insurance coverage disputes and policy interpretations.",
    features: [
      "Coverage analysis",
      "Policy interpretation",
      "Bad faith claims",
      "Declaratory actions"
    ]
  },
  {
    id: 9,
    icon: "fas fa-lightbulb",
    title: "Intellectual Property",
    description: "Protecting your innovations, brands, and creative works.",
    features: [
      "Trademark registration",
      "Patent applications",
      "Copyright protection",
      "IP litigation"
    ]
  },
  {
    id: 10,
    icon: "fas fa-box",
    title: "Products Liability",
    description: "Defense of manufacturers and distributors in product defect and injury claims.",
    features: [
      "Design defect claims",
      "Manufacturing defects",
      "Warning claims",
      "Recall matters"
    ]
  },
  {
    id: 11,
    icon: "fas fa-user-shield",
    title: "Professional Liability",
    description: "Defense representation for professionals facing malpractice and negligence claims.",
    features: [
      "Medical malpractice",
      "Legal malpractice",
      "Accounting malpractice",
      "Professional errors"
    ]
  },
  {
    id: 12,
    icon: "fas fa-hard-hat",
    title: "Workers Compensation",
    description: "Representing employers and insurers in workers compensation matters.",
    features: [
      "Claim defense",
      "Benefit disputes",
      "Subrogation",
      "Coverage issues"
    ]
  }
];

export const offices = [
  {
    id: 'philadelphia',
    name: 'Philadelphia',
    fullName: 'Philadelphia Office',
    address: '2001 Market Street',
    addressLine2: 'Suite 2815',
    city: 'Philadelphia, PA 19103',
    phone: '(215) 564-5190',
    fax: '(215) 564-5191',
    email: 'jmccarron@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    bannerImage: getBannerImageUrl('Philly.png')
  },
  {
    id: 'pittsburgh',
    name: 'Pittsburgh',
    fullName: 'Pittsburgh Office',
    address: 'Koppers Building, 436 7th Avenue',
    addressLine2: 'Floors 7 & 8',
    city: 'Pittsburgh, PA 15219',
    phone: '(412) 232-9800',
    fax: '(412) 232-9801',
    email: 'largento@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    bannerImage: getBannerImageUrl('Pittsburg.jpg')
  },
  {
    id: 'newyork',
    name: 'New York',
    fullName: 'New York Office',
    address: '350 Fifth Avenue',
    addressLine2: 'Suite 4820',
    city: 'New York, NY 10118',
    phone: '(212) 555-7300',
    fax: '(212) 555-7301',
    email: 'nyoffice@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    bannerImage: getBannerImageUrl('NewYork.jpg')
  },
  {
    id: 'mountlaurel',
    name: 'Mount Laurel',
    fullName: 'Mount Laurel Office',
    address: '1060 N Kings Highway',
    addressLine2: 'Suite 200',
    city: 'Mount Laurel, NJ 08054',
    phone: '(856) 234-5600',
    fax: '(856) 234-5601',
    email: 'mloffice@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    bannerImage: getImageUrl('images/defaults/fighter-jet.jpg')
  },
  {
    id: 'baltimore',
    name: 'Baltimore',
    fullName: 'Baltimore Office',
    address: '100 East Pratt Street',
    addressLine2: 'Suite 2600',
    city: 'Baltimore, MD 21202',
    phone: '(410) 555-8900',
    fax: '(410) 555-8901',
    email: 'baltimore@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    bannerImage: getBannerImageUrl('Baltimore.jpeg')
  },
  {
    id: 'cleveland',
    name: 'Cleveland',
    fullName: 'Cleveland Office',
    address: '1301 East Ninth Street',
    addressLine2: 'Suite 3500',
    city: 'Cleveland, OH 44114',
    phone: '(216) 555-7200',
    fax: '(216) 555-7201',
    email: 'cleveland@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    bannerImage: getBannerImageUrl('Cleveland.jpeg')
  }
];

export const firmInfo = {
  name: "Swartz Campbell",
  tagline: "Attorneys at Law",
  description: "Providing exceptional legal services with integrity, dedication, and results for over 100 years.",
  contact: {
    address: {
      street: "123 Main Street, Suite 400",
      city: "Downtown Legal District",
      state: "City, State 12345"
    },
    phone: "(555) 123-4567",
    email: "info@swartzcampbell.com",
    hours: {
      weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
      saturday: "Saturday: 9:00 AM - 2:00 PM",
      sunday: "Sunday: By appointment"
    }
  },
  stats: [
    { number: "25+", label: "Years Experience" },
    { number: "500+", label: "Cases Won" },
    { number: "95%", label: "Success Rate" }
  ],
  socialMedia: {
    facebook: "#",
    linkedin: "#",
    twitter: "#"
  }
};