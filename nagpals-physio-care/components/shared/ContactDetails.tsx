import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const details = [
  { icon: MapPin, label: "Address", value: "717, Mahavir Colony, East Bhatia Nagar\nYamuna Nagar, Haryana 135001" },
  { icon: Phone, label: "Phone", value: "+91 72061 99132" },
  { icon: Mail, label: "Email", value: "Available on request" },
  { icon: Clock, label: "Hours", value: "Mon – Sat: 9:00 AM – 9:00 PM\nSunday: 9:00 AM – 2:00 PM" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 72061 99132" },
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
              <p className="text-sm text-rich-black/80 whitespace-pre-line">{item.value}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
