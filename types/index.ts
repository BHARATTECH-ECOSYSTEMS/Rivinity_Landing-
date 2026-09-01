export interface NavItemLink {
  label: string;
  href: string;
  type: "link";
}

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface DropdownSection {
  heading?: string;
  items: DropdownItem[];
}

export interface FeaturedItem {
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
}

export interface CategoryGroup {
  label: string;
  items: DropdownItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  avatar?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}
