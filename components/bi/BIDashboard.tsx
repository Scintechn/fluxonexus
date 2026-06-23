"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  CircleCheckBig,
  FileCheck2,
  Gauge,
  PackageCheck,
  ShieldCheck,
  Timer,
  TrendingDown,
  TrendingUp,
  Truck,
  Warehouse,
} from "lucide-react";

/* ----------------------------------------------------------------------------
 * Tipos
 * ------------------------------------------------------------------------- */

type PeriodoId = "turno" | "dia" | "semana" | "mes";
type SegmentoId = "armazem" | "transporte" | "distribuicao" | "servico";
type TabId = "distribuicao" | "eficiencia" | "qualidade";

interface FilterOption<T extends string> {
  id: T;
  label: string;
}

interface BarItem {
  label: string;
  /** valor numérico para a barra (largura relativa) */
  value: number;
  /** texto formatado mostrado ao lado */
  display: string;
  /** tom da barra */
  tone: "kpi" | "accent" | "amber" | "muted";
}

interface ComponentRow {
  label: string;
  pct: number;
  icon: React.ComponentType<{ className?: string }>;
}

/* ----------------------------------------------------------------------------
 * Dados de demonstração (fixos — sem aleatoriedade)
 * ------------------------------------------------------------------------- */

const PERIODOS: ReadonlyArray<FilterOption<PeriodoId>> = [
  { id: "turno", label: "Turno" },
  { id: "dia", label: "Dia" },
  { id: "semana", label: "Semana" },
  { id: "mes", label: "Mês" },
];

const SEGMENTOS: ReadonlyArray<FilterOption<SegmentoId>> = [
  { id: "armazem", label: "Armazém" },
  { id: "transporte", label: "Transporte" },
  { id: "distribuicao", label: "Distribuição" },
  { id: "servico", label: "Serviço ao Cliente" },
];

const TABS: ReadonlyArray<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "distribuicao", label: "Distribuição", icon: Truck },
  { id: "eficiencia", label: "Eficiência Interna", icon: Gauge },
  { id: "qualidade", label: "Qualidade", icon: ShieldCheck },
];

/* Formatação determinística (sem Intl → sem mismatch de hidratação) */
const fmt1 = (n: number) => n.toFixed(1).replace(".", ",");
const fmt2 = (n: number) => n.toFixed(2).replace(".", ",");
const fmtInt = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const clampPct = (n: number, min = 40, max = 99.5) =>
  Math.min(max, Math.max(min, n));
const signed = (n: number, unit: string) =>
  `${n >= 0 ? "+" : "−"}${fmt1(Math.abs(n))} ${unit}`;

interface DashData {
  onTime: number;
  onTimeDelta: number;
  onTimeTrend: ReadonlyArray<number>;
  trendCaption: string;
  costByRoute: BarItem[];
  bestCentre: string;
  linesPerHour: BarItem[];
  linesAvg: number;
  occupancy: number;
  occPallets: number;
  occCapacity: number;
  poi: number;
  poiDelta: number;
  poiComponents: ComponentRow[];
  quickStats: ReadonlyArray<{ k: string; v: string; d: string }>;
}

/** Perfil base de cada segmento */
const SEG_PROFILE: Record<
  SegmentoId,
  { onTime: number; cost: number; lines: number; occ: number; poi: number }
> = {
  distribuicao: { onTime: 96.4, cost: 1.46, lines: 190, occ: 82, poi: 94.1 },
  armazem: { onTime: 95.0, cost: 1.22, lines: 212, occ: 88, poi: 93.2 },
  transporte: { onTime: 93.6, cost: 1.78, lines: 168, occ: 74, poi: 91.8 },
  servico: { onTime: 97.6, cost: 1.1, lines: 154, occ: 69, poi: 95.7 },
};

/** Modulação por janela temporal — janelas mais longas são mais suaves e estáveis */
const PER_MOD: Record<
  PeriodoId,
  {
    onTime: number;
    cost: number;
    lines: number;
    occ: number;
    poi: number;
    otDelta: number;
    poiDelta: number;
    caption: string;
    exp: string;
  }
> = {
  turno: { onTime: -1.4, cost: 0.18, lines: -14, occ: 3, poi: -1.1, otDelta: -1.1, poiDelta: -0.6, caption: "últimos 7 turnos", exp: "1 040" },
  dia: { onTime: -0.6, cost: 0.09, lines: -5, occ: 1, poi: -0.5, otDelta: 0.8, poiDelta: 0.5, caption: "últimos 7 dias", exp: "3 280" },
  semana: { onTime: 0.3, cost: -0.05, lines: 6, occ: -1, poi: 0.4, otDelta: 1.9, poiDelta: 1.1, caption: "últimas 7 semanas", exp: "9 120" },
  mes: { onTime: 0.9, cost: -0.12, lines: 14, occ: -2, poi: 0.9, otDelta: 3.2, poiDelta: 1.7, caption: "últimos 7 meses", exp: "12 480" },
};

const ROUTES: ReadonlyArray<{ label: string; k: number }> = [
  { label: "CD Lisboa", k: 0.88 },
  { label: "Rota Sul", k: 1.0 },
  { label: "CD Porto", k: 1.09 },
  { label: "Rota Norte", k: 1.32 },
];

const SHIFTS: ReadonlyArray<{ label: string; k: number }> = [
  { label: "Turno A", k: 0.97 },
  { label: "Turno B", k: 1.09 },
  { label: "Turno C", k: 0.85 },
];

const TREND_WIGGLE: ReadonlyArray<number> = [-3.0, -1.2, -2.1, 0.4, -0.6, 1.8, 1.0];

const POI_SPREAD: ReadonlyArray<{
  label: string;
  off: number;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { label: "Entrega no prazo", off: 2.3, icon: Timer },
  { label: "Pedido completo", off: 3.7, icon: PackageCheck },
  { label: "Sem danos", off: 4.4, icon: ShieldCheck },
  { label: "Documentação correta", off: 1.0, icon: FileCheck2 },
];

/** Atribui tons às barras por ranking (verde = melhor, âmbar = pior) */
function tones(values: number[], best: "min" | "max"): BarItem["tone"][] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((v) => {
    if (best === "min") return v === min ? "kpi" : v === max ? "amber" : "accent";
    return v === max ? "kpi" : "accent";
  });
}

/** Constrói o conjunto de indicadores para o filtro selecionado */
function buildData(periodo: PeriodoId, segmento: SegmentoId): DashData {
  const seg = SEG_PROFILE[segmento];
  const per = PER_MOD[periodo];

  const onTime = clampPct(seg.onTime + per.onTime);

  const costVals = ROUTES.map((r) => (seg.cost + per.cost) * r.k);
  const costTones = tones(costVals, "min");
  const costByRoute: BarItem[] = ROUTES.map((r, i) => ({
    label: r.label,
    value: costVals[i],
    display: `€${fmt2(costVals[i])} / un.`,
    tone: costTones[i],
  }));
  const bestCentre = ROUTES[costVals.indexOf(Math.min(...costVals))].label;

  const lineVals = SHIFTS.map((s) => Math.round((seg.lines + per.lines) * s.k));
  const lineTones = tones(lineVals, "max");
  const linesPerHour: BarItem[] = SHIFTS.map((s, i) => ({
    label: s.label,
    value: lineVals[i],
    display: `${lineVals[i]}`,
    tone: lineTones[i],
  }));
  const linesAvg = Math.round(lineVals.reduce((a, b) => a + b, 0) / lineVals.length);

  const occupancy = Math.round(clampPct(seg.occ + per.occ, 40, 98));
  const occCapacity = 22250;
  const occPallets = Math.round((occCapacity * occupancy) / 100);

  const poi = clampPct(seg.poi + per.poi);
  const poiComponents: ComponentRow[] = POI_SPREAD.map((c) => ({
    label: c.label,
    pct: clampPct(poi + c.off),
    icon: c.icon,
  }));

  const onTimeTrend = TREND_WIGGLE.map((w) => Math.round(clampPct(onTime + w)));

  const otif = clampPct(onTime - 0.7);
  const devol = Math.max(0.4, 4.8 - onTime / 25);
  const quickStats = [
    { k: "Expedições", v: per.exp, d: signed(per.lines / 3, "%") },
    { k: "SLA médio", v: `${fmt1(clampPct(onTime + 1.8))}%`, d: signed(per.otDelta, "p.p.") },
    { k: "Devoluções", v: `${fmt1(devol)}%`, d: signed(-Math.abs(per.poiDelta) - 0.2, "p.p.") },
    { k: "OTIF", v: `${fmt1(otif)}%`, d: signed(per.poiDelta + 1.4, "p.p.") },
  ] as const;

  return {
    onTime,
    onTimeDelta: per.otDelta,
    onTimeTrend,
    trendCaption: per.caption,
    costByRoute,
    bestCentre,
    linesPerHour,
    linesAvg,
    occupancy,
    occPallets,
    occCapacity,
    poi,
    poiDelta: per.poiDelta,
    poiComponents,
    quickStats,
  };
}

const TONE_BAR: Record<BarItem["tone"], string> = {
  kpi: "bg-[color:var(--color-kpi-500)]",
  accent: "bg-[color:var(--color-accent-500)]",
  amber: "bg-amber-400",
  muted: "bg-white/25",
};

/* ----------------------------------------------------------------------------
 * Componentes auxiliares
 * ------------------------------------------------------------------------- */

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-200",
        active
          ? "bg-[color:var(--color-accent-500)]/15 text-[color:var(--color-accent-300)] ring-1 ring-inset ring-[color:var(--color-accent-400)]/50 shadow-[0_0_18px_-6px_var(--color-accent-500)]"
          : "text-white/60 hover:bg-white/5 hover:text-white/90 ring-1 ring-inset ring-white/5",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Card({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-[color:var(--color-brand-950)]/60 p-5 backdrop-blur-sm",
        className ?? "",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[color:var(--color-accent-300)] ring-1 ring-inset ring-white/10">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h4 className="font-display text-sm font-semibold text-white/90">{title}</h4>
      </div>
      {children}
    </div>
  );
}

/** Barra horizontal com rótulo + valor */
function HBar({ item, max }: { item: BarItem; max: number }) {
  const width = Math.max(6, Math.round((item.value / max) * 100));
  return (
    <li className="space-y-1.5">
      <div className="flex items-baseline justify-between text-[12px]">
        <span className="font-medium text-white/70">{item.label}</span>
        <span
          className={[
            "font-semibold tabular-nums",
            item.tone === "kpi"
              ? "text-[color:var(--color-kpi-400)]"
              : item.tone === "amber"
                ? "text-amber-300"
                : "text-white/85",
          ].join(" ")}
        >
          {item.display}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
        <div
          className={[
            "h-full rounded-full transition-[width] duration-700 ease-out",
            TONE_BAR[item.tone],
          ].join(" ")}
          style={{ width: `${width}%` }}
        />
      </div>
    </li>
  );
}

/** Mini gráfico de 7 colunas verticais */
function MiniBars({ data }: { data: ReadonlyArray<number> }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return (
    <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
      {data.map((v, i) => {
        const h = 30 + Math.round(((v - min) / Math.max(1, max - min)) * 70);
        const best = v === max;
        return (
          <div
            key={i}
            className={[
              "flex-1 rounded-sm transition-all",
              best ? "bg-[color:var(--color-kpi-500)] glow-kpi" : "bg-[color:var(--color-accent-500)]/60",
            ].join(" ")}
            style={{ height: `${h}%` }}
          />
        );
      })}
    </div>
  );
}

/** Gauge semicircular em SVG */
function SemiGauge({
  value,
  label,
  big,
}: {
  value: number;
  label: string;
  big: string;
}) {
  // Semicírculo: ângulo 180° -> 0°. Raio 80, centro (100,100).
  const r = 80;
  const cx = 100;
  const cy = 100;
  const circumference = Math.PI * r; // metade da circunferência
  const dash = (value / 100) * circumference;

  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      <svg viewBox="0 0 200 116" className="w-full" aria-hidden="true">
        {/* trilho */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* preenchimento */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--color-kpi-500)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ filter: "drop-shadow(0 0 8px color-mix(in oklch, var(--color-kpi-500) 60%, transparent))" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="font-display text-3xl font-bold tabular-nums text-white">{big}</span>
        <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-white/50">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Painéis (abas)
 * ------------------------------------------------------------------------- */

function DistribuicaoPanel({ data }: { data: DashData }) {
  const maxCost = Math.max(...data.costByRoute.map((c) => c.value));
  const up = data.onTimeDelta >= 0;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* KPI grande — entregas no prazo */}
      <Card title="Entregas no prazo" icon={CircleCheckBig} className="md:row-span-1">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-display text-5xl font-bold leading-none tracking-tight text-white">
              {fmt1(data.onTime)}
              <span className="text-3xl text-white/70">%</span>
            </div>
            <div
              className={[
                "mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold",
                up
                  ? "bg-[color:var(--color-kpi-500)]/15 text-[color:var(--color-kpi-400)]"
                  : "bg-amber-400/15 text-amber-300",
              ].join(" ")}
            >
              {up ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {signed(data.onTimeDelta, "p.p.")}
            </div>
          </div>
          <div className="w-2/5">
            <MiniBars data={data.onTimeTrend} />
            <p className="mt-1 text-right text-[10px] text-white/40">{data.trendCaption}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-[11px] text-white/45">
            <span>Meta 92%</span>
            <span>100%</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[color:var(--color-kpi-600)] to-[color:var(--color-kpi-400)] glow-kpi"
              style={{ width: `${data.onTime}%` }}
            />
            {/* marcador da meta */}
            <span className="absolute top-0 h-full w-0.5 bg-white/50" style={{ left: "92%" }} />
          </div>
        </div>
      </Card>

      {/* Custo por unidade expedida */}
      <Card title="Custo por unidade expedida" icon={Boxes}>
        <ul className="space-y-3.5">
          {data.costByRoute.map((c) => (
            <HBar key={c.label} item={c} max={maxCost} />
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-white/45">
          <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--color-kpi-400)]" aria-hidden="true" />
          Melhor centro:{" "}
          <span className="font-semibold text-[color:var(--color-kpi-400)]">{data.bestCentre}</span>
        </p>
      </Card>
    </div>
  );
}

function EficienciaPanel({ data }: { data: DashData }) {
  const maxLines = Math.max(...data.linesPerHour.map((l) => l.value));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Linhas processadas por hora — barras verticais */}
      <Card title="Linhas processadas por hora" icon={Activity}>
        <div className="flex h-44 items-end justify-around gap-4 pt-2">
          {data.linesPerHour.map((l) => {
            const h = Math.round((l.value / maxLines) * 100);
            const best = l.tone === "kpi";
            return (
              <div key={l.label} className="flex h-full w-full flex-col items-center justify-end gap-2">
                <span
                  className={[
                    "text-sm font-bold tabular-nums",
                    best ? "text-[color:var(--color-kpi-400)]" : "text-white/80",
                  ].join(" ")}
                >
                  {l.display}
                </span>
                <div
                  className={[
                    "w-full max-w-[48px] rounded-t-lg transition-all duration-700 ease-out",
                    best
                      ? "bg-gradient-to-t from-[color:var(--color-kpi-600)] to-[color:var(--color-kpi-400)] glow-kpi"
                      : "bg-gradient-to-t from-[color:var(--color-accent-600)] to-[color:var(--color-accent-400)]/80",
                  ].join(" ")}
                  style={{ height: `${h}%` }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-medium text-white/55">{l.label}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-white/45">
          linhas/h · média ponderada {data.linesAvg}
        </p>
      </Card>

      {/* Ocupação do armazém — gauge */}
      <Card title="Ocupação do armazém" icon={Warehouse}>
        <SemiGauge
          value={data.occupancy}
          label="utilização vs capacidade"
          big={`${data.occupancy}%`}
        />
        <div className="mt-3 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="font-display text-lg font-bold text-white">
              {fmtInt(data.occPallets)}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-white/45">paletes ocupadas</div>
          </div>
          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="font-display text-lg font-bold text-[color:var(--color-kpi-400)]">
              {fmtInt(data.occCapacity)}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-white/45">capacidade total</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function QualidadePanel({ data }: { data: DashData }) {
  const up = data.poiDelta >= 0;
  return (
    <div className="grid gap-4 md:grid-cols-[260px,1fr]">
      {/* POI gauge */}
      <Card title="Perfect Order Index" icon={BadgeCheck}>
        <SemiGauge value={data.poi} label="índice POI" big={`${fmt1(data.poi)}%`} />
        <div
          className={[
            "mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full py-1.5 text-[12px] font-semibold",
            up
              ? "bg-[color:var(--color-kpi-500)]/15 text-[color:var(--color-kpi-400)]"
              : "bg-amber-400/15 text-amber-300",
          ].join(" ")}
        >
          {up ? (
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {signed(data.poiDelta, "p.p.")} face ao período anterior
        </div>
      </Card>

      {/* Decomposição POI */}
      <Card title="Componentes do índice" icon={FileCheck2}>
        <ul className="space-y-4">
          {data.poiComponents.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 font-medium text-white/75">
                    <Icon className="h-4 w-4 text-[color:var(--color-accent-300)]" aria-hidden="true" />
                    {c.label}
                  </span>
                  <span className="font-semibold tabular-nums text-[color:var(--color-kpi-400)]">
                    {fmt1(c.pct)}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[color:var(--color-kpi-600)] to-[color:var(--color-kpi-400)]"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Componente principal
 * ------------------------------------------------------------------------- */

export function BIDashboard() {
  const [periodo, setPeriodo] = useState<PeriodoId>("mes");
  const [segmento, setSegmento] = useState<SegmentoId>("distribuicao");
  const [tab, setTab] = useState<TabId>("distribuicao");

  const data = useMemo(() => buildData(periodo, segmento), [periodo, segmento]);

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--color-brand-950)] text-white shadow-[0_40px_120px_-40px_oklch(0.14_0.05_234/0.8)] glow-ring">
      {/* Chrome do navegador / app */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-[color:var(--color-brand-900)]/60 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-[color:var(--color-kpi-400)]/90" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-display text-[13px] font-semibold text-white/80">
            FluxoNexus BI · Painel de Logística
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-kpi-500)]/30 bg-[color:var(--color-kpi-500)]/10 px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-kpi-300)]">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-kpi-400)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-kpi-400)]" />
          </span>
          Em tempo real
        </div>
      </div>

      {/* Corpo: barra de filtros + painel */}
      <div className="bg-[color:var(--color-brand-950)]">
        {/* Barra de filtros — Período e Segmento lado a lado */}
        <div className="relative border-b border-white/10 bg-[color:var(--color-brand-950)] px-4 py-4 lg:px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-10"
          />
          <div className="relative">
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Período
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {PERIODOS.map((p) => (
                    <Pill key={p.id} active={periodo === p.id} onClick={() => setPeriodo(p.id)}>
                      {p.label}
                    </Pill>
                  ))}
                </div>
              </div>
              <div className="sm:border-l sm:border-white/10 sm:pl-8">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Segmento
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {SEGMENTOS.map((s) => (
                    <Pill key={s.id} active={segmento === s.id} onClick={() => setSegmento(s.id)}>
                      {s.label}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/40">
              Dados de demonstração. Os indicadores acompanham o filtro{" "}
              <span className="font-semibold text-[color:var(--color-accent-300)]">
                {SEGMENTOS.find((s) => s.id === segmento)?.label}
              </span>{" "}
              ·{" "}
              <span className="font-semibold text-[color:var(--color-accent-300)]">
                {PERIODOS.find((p) => p.id === periodo)?.label}
              </span>
              .
            </p>
          </div>
        </div>

        {/* Painel principal */}
        <div className="p-4 lg:p-6">
          {/* Abas */}
          <div
            role="tablist"
            aria-label="Vistas do painel"
            className="mb-5 flex flex-wrap gap-1 border-b border-white/10"
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`bi-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`bi-panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={[
                    "relative -mb-px inline-flex items-center gap-2 rounded-t-lg px-3.5 py-2.5 text-[13px] font-semibold transition-colors",
                    active
                      ? "text-[color:var(--color-accent-300)]"
                      : "text-white/50 hover:text-white/80",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {t.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[color:var(--color-accent-400)] shadow-[0_0_12px_var(--color-accent-500)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Conteúdo da aba ativa */}
          <div
            role="tabpanel"
            id={`bi-panel-${tab}`}
            aria-labelledby={`bi-tab-${tab}`}
            className="animate-float"
            key={`${tab}-${periodo}-${segmento}`}
          >
            {tab === "distribuicao" && <DistribuicaoPanel data={data} />}
            {tab === "eficiencia" && <EficienciaPanel data={data} />}
            {tab === "qualidade" && <QualidadePanel data={data} />}
          </div>

          {/* Rodapé de métricas rápidas */}
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-4">
            {data.quickStats.map((m) => (
              <div key={m.k} className="bg-[color:var(--color-brand-950)] px-3 py-3">
                <div className="text-[10px] uppercase tracking-wide text-white/40">{m.k}</div>
                <div className="mt-0.5 font-display text-lg font-bold text-white">{m.v}</div>
                <div
                  className={[
                    "text-[11px] font-semibold",
                    m.d.startsWith("−")
                      ? "text-amber-300"
                      : "text-[color:var(--color-kpi-400)]",
                  ].join(" ")}
                >
                  {m.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
