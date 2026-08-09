import React from 'react';
import {
  CodeXml,
  LayoutGrid,
  Brain,
  BadgeHelp,
  Zap,
  Slack,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  NotebookPen,
  PhoneCall,
  Mails,
  Globe,
  ExternalLink,
  FileText,
  Layers,
  Cpu,
  Database,
  Terminal,
  Briefcase,
  GraduationCap,
  User,
  Folder,
  Calendar,
  Settings,
  Sparkles,
  LucideIcon,
  LucideProps,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'code-xml': CodeXml,
  code: CodeXml,
  'layout-grid': LayoutGrid,
  grid: LayoutGrid,
  brain: Brain,
  'badge-help': BadgeHelp,
  zap: Zap,
  slack: Slack,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  location: MapPin,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  'notebook-pen': NotebookPen,
  'phone-call': PhoneCall,
  mails: Mails,
  globe: Globe,
  'external-link': ExternalLink,
  'file-text': FileText,
  layers: Layers,
  cpu: Cpu,
  database: Database,
  terminal: Terminal,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  user: User,
  folder: Folder,
  calendar: Calendar,
  settings: Settings,
  sparkles: Sparkles,
};

export function resolveIcon(
  iconName: string | null | undefined,
  props: LucideProps = {}
): React.ReactNode {
  if (!iconName) return <Sparkles {...props} />;
  const normalized = iconName.toLowerCase().trim().replace(/_/g, '-');
  const IconComponent = iconMap[normalized] || Sparkles;
  return <IconComponent {...props} />;
}

export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap);
}
