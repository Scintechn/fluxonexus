"use client";

import { useState } from "react";
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

/** Mini histograma de 7 colunas (entregas no prazo por dia da semana, %) */
const ON_TIME_TREND: ReadonlyArray<number> = [91, 93, 92, 95, 94, 97, 96];

/** Custo por unidade expedida (€/un.) — menor é melhor */
const COST_BY_ROUTE: ReadonlyArray<BarItem> = [
  { label: "CD Lisboa", value: 1.28, display: "€1,28 / un.", tone: "kpi" },
  { label: "Rota Sul", value: 1.46, display: "€1,46 / un.", tone: "accent" },
  { label: "CD Porto", value: 1.59, display: "€1,59 / un.", tone: "accent" },
  { label: "Rota Norte", value: 1.92, display: "€1,92 / un.", tone: "amber" },
];

/** Linhas processadas por hora, por turno */
const LINES_PER_HOUR: ReadonlyArray<BarItem> = [
  { label: "Turno A", value: 184, display: "184", tone: "accent" },
  { label: "Turno B", value: 207, display: "207", tone: "kpi" },
  { label: "Turno C", value: 162, display: "162", tone: "accent" },
];

const POI_COMPONENTS: ReadonlyArray<ComponentRow> = [
  { label: "Entrega no prazo", pct: 96.4, icon: Timer },
  { label: "Pedido completo", pct: 97.8, icon: PackageCheck },
  { label: "Sem danos", pct: 98.5, icon: ShieldCheck },
  { label: "Documentação correta", pct: 95.1, icon: FileCheck2 },
];

const OCCUPANCY = 82; // % de utilização vs capacidade
const POI = 94.1; // Perfect Order Index %

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
        "w-full rounded-xl px-3 py-2 text-left text-[13px] font-medium transition-all duration-200",
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

function DistribuicaoPanel() {
  const maxCost = Math.max(...COST_BY_ROUTE.map((c) => c.value));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* KPI grande — entregas no prazo */}
      <Card title="Entregas no prazo" icon={CircleCheckBig} className="md:row-span-1">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-display text-5xl font-bold leading-none tracking-tight text-white">
              96,4<span className="text-3xl text-white/70">%</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[color:var(--color-kpi-500)]/15 px-2.5 py-1 text-[12px] font-semibold text-[color:var(--color-kpi-400)]">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              +3,2 p.p.
            </div>
          </div>
          <div className="w-2/5">
            <MiniBars data={ON_TIME_TREND} />
            <p className="mt-1 text-right text-[10px] text-white/40">últimos 7 dias</p>
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
              style={{ width: "96.4%" }}
            />
            {/* marcador da meta */}
            <span className="absolute top-0 h-full w-0.5 bg-white/50" style={{ left: "92%" }} />
          </div>
        </div>
      </Card>

      {/* Custo por unidade expedida */}
      <Card title="Custo por unidade expedida" icon={Boxes}>
        <ul className="space-y-3.5">
          {COST_BY_ROUTE.map((c) => (
            <HBar key={c.label} item={c} max={maxCost} />
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-white/45">
          <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--color-kpi-400)]" aria-hidden="true" />
          Melhor centro: <span className="font-semibold text-[color:var(--color-kpi-400)]">CD Lisboa</span>
        </p>
      </Card>
    </div>
  );
}

function EficienciaPanel() {
  const maxLines = Math.max(...LINES_PER_HOUR.map((l) => l.value));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Linhas processadas por hora — barras verticais */}
      <Card title="Linhas processadas por hora" icon={Activity}>
        <div className="flex h-44 items-end justify-around gap-4 pt-2">
          {LINES_PER_HOUR.map((l) => {
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
        <p className="mt-3 text-[11px] text-white/45">linhas/h · média ponderada 184</p>
      </Card>

      {/* Ocupação do armazém — gauge */}
      <Card title="Ocupação do armazém" icon={Warehouse}>
        <SemiGauge value={OCCUPANCY} label="utilização vs capacidade" big={`${OCCUPANCY}%`} />
        <div className="mt-3 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="font-display text-lg font-bold text-white">18 240</div>
            <div className="text-[10px] uppercase tracking-wide text-white/45">paletes ocupadas</div>
          </div>
          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="font-display text-lg font-bold text-[color:var(--color-kpi-400)]">22 250</div>
            <div className="text-[10px] uppercase tracking-wide text-white/45">capacidade total</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function QualidadePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-[260px,1fr]">
      {/* POI gauge */}
      <Card title="Perfect Order Index" icon={BadgeCheck}>
        <SemiGauge value={POI} label="índice POI" big={`${POI.toLocaleString("pt-PT")}%`} />
        <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[color:var(--color-kpi-500)]/15 py-1.5 text-[12px] font-semibold text-[color:var(--color-kpi-400)]">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          +1,7 p.p. face ao mês anterior
        </div>
      </Card>

      {/* Decomposição POI */}
      <Card title="Componentes do índice" icon={FileCheck2}>
        <ul className="space-y-4">
          {POI_COMPONENTS.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 font-medium text-white/75">
                    <Icon className="h-4 w-4 text-[color:var(--color-accent-300)]" aria-hidden="true" />
                    {c.label}
                  </span>
                  <span className="font-semibold tabular-nums text-[color:var(--color-kpi-400)]">
                    {c.pct.toLocaleString("pt-PT")}%
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

      {/* Corpo: rail de filtros + painel */}
      <div className="bg-grid grid gap-px bg-white/5 lg:grid-cols-[220px,1fr]">
        {/* Rail de filtros */}
        <aside className="space-y-5 bg-[color:var(--color-brand-950)] p-4 lg:p-5">
          <div>
            <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Período
            </h3>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              {PERIODOS.map((p) => (
                <Pill key={p.id} active={periodo === p.id} onClick={() => setPeriodo(p.id)}>
                  {p.label}
                </Pill>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Segmento
            </h3>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              {SEGMENTOS.map((s) => (
                <Pill key={s.id} active={segmento === s.id} onClick={() => setSegmento(s.id)}>
                  {s.label}
                </Pill>
              ))}
            </div>
          </div>

          <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-3 lg:block">
            <p className="text-[11px] leading-relaxed text-white/45">
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
        </aside>

        {/* Painel principal */}
        <div className="bg-[color:var(--color-brand-950)] p-4 lg:p-6">
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
            key={tab}
          >
            {tab === "distribuicao" && <DistribuicaoPanel />}
            {tab === "eficiencia" && <EficienciaPanel />}
            {tab === "qualidade" && <QualidadePanel />}
          </div>

          {/* Rodapé de métricas rápidas */}
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-4">
            {[
              { k: "Expedições", v: "12 480", d: "+5,1%" },
              { k: "SLA médio", v: "98,2%", d: "+0,9 p.p." },
              { k: "Devoluções", v: "1,6%", d: "−0,4 p.p." },
              { k: "OTIF", v: "95,7%", d: "+2,3 p.p." },
            ].map((m) => (
              <div key={m.k} className="bg-[color:var(--color-brand-950)] px-3 py-3">
                <div className="text-[10px] uppercase tracking-wide text-white/40">{m.k}</div>
                <div className="mt-0.5 font-display text-lg font-bold text-white">{m.v}</div>
                <div className="text-[11px] font-semibold text-[color:var(--color-kpi-400)]">{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
