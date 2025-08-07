import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobile(): boolean {
  return window.innerWidth < 768;
}

export function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (section) {
    if (window.innerWidth < 768) {
      // On mobile, use native scroll
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On desktop, we'll use GSAP scrollTo
      // This will be handled by HorizontalScroll.tsx
      const event = new CustomEvent('scrollToSection', { detail: { sectionId } });
      window.dispatchEvent(event);
    }
  }
}

export const minerals = [
  {
    name: "Calcium",
    description: "Essential for strong bones and teeth, calcium also helps with muscle function and cellular signaling.",
    level: "18mg/L",
    icon: "fa-tint"
  },
  {
    name: "Magnesium",
    description: "Supports energy production, muscle and nerve function, and helps regulate blood pressure.",
    level: "6mg/L",
    icon: "fa-mountain"
  },
  {
    name: "Potassium",
    description: "Critical for heart function, muscle contractions, and maintaining proper fluid balance.",
    level: "3mg/L",
    icon: "fa-bolt"
  }
];

export const testimonials = [
  {
    text: "I've tried many premium water brands, but Elemence truly stands out. The taste is incredibly clean and refreshing, and I love knowing it's sourced responsibly with zero plastic packaging.",
    author: "Jane Harper",
    role: "Health & Wellness Coach",
    initials: "JH",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop"
  },
  {
    text: "Our office switched to Elemence for our water delivery service and the team loves it. The difference in taste is remarkable, and the glass bottle option aligns perfectly with our sustainability goals.",
    author: "Michael Rivera",
    role: "Office Sustainability Manager",
    initials: "MR",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop"
  },
  {
    text: "As a nutritionist, I'm very particular about water quality. Elemence has the perfect mineral balance, and I've noticed improved hydration benefits for my clients who switch to it.",
    author: "Amanda Chen",
    role: "Clinical Nutritionist",
    initials: "AC",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop"
  },
  {
    text: "The clarity of taste in Elemence water is unmatched. My restaurant now exclusively serves it because it perfectly complements fine dining without interfering with the flavor profile of our dishes.",
    author: "Thomas Reeves",
    role: "Executive Chef",
    initials: "TR",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop"
  },
  {
    text: "I appreciate how Elemence supports our athletic performance. Their mineral profile is perfectly balanced for optimal hydration during intense training sessions.",
    author: "Sarah Williams",
    role: "Professional Athlete",
    initials: "SW",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop"
  }
];

export const processSteps = [
  {
    number: 1,
    title: "Sourcing",
    description: "Water is collected from protected mountain springs, naturally filtered through mineral-rich rock layers."
  },
  {
    number: 2,
    title: "Testing",
    description: "Rigorous quality testing ensures the water meets our high standards for purity and mineral content."
  },
  {
    number: 3,
    title: "Bottling",
    description: "Water is bottled at the source in sustainable glass or recycled PET bottles under sterile conditions."
  },
  {
    number: 4,
    title: "Delivery",
    description: "Our products are transported with care to ensure they reach you in perfect condition."
  }
];
