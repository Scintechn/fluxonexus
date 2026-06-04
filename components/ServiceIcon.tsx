import { TrendingDown, Route, Network, ShieldCheck } from "lucide-react";
import type { ServiceKey } from "@/lib/i18n/types";

const map: Record<ServiceKey, React.ElementType> = {
  costs: TrendingDown,
  operations: Route,
  information: Network,
  incidents: ShieldCheck,
};

export function ServiceIcon({ id, className }: { id: ServiceKey; className?: string }) {
  const Icon = map[id];
  return <Icon className={className} />;
}
