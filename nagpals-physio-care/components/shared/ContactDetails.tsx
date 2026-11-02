import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { clinic } from "@/lib/clinic-config";

interface Detail {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}

const details: Detail[] = [
  {
    icon: MapPin,
    label: "Address",
    value: clinic.address.full,
  },
  {
    icon: Phone,
    label: "Phone",
    value: clinic.phone,
    href: clinic.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: clinic.email,
    href: clinic.emailHref,
  },
  {
    icon: Clock,
    label: "Hours",
    value: clinic.hours.combined,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: clinic.whatsapp,
    href: clinic.whatsappUrl,
  },
];

interface Props {
  showWhatsApp?: boolean;
}

export function ContactDetails({ showWhatsApp = false }: Props) {
  const items = showWhatsApp ? details : details.filter((d) => d.label !== "WhatsApp");
  return (
    <ul className="space-y-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.label} className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={16} className="text-gold" />
            </div>
            <div>
              <p className="text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-0.5">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-rich-black/80 hover:text-gold transition-colors duration-200"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-rich-black/80 whitespace-pre-line">{item.value}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
