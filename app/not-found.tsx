import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[color:var(--color-brand-950)] px-6 text-white">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-[color:var(--color-accent-400)]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold">Página não encontrada</h1>
        <p className="mt-2 text-white/70">A página que procura não existe ou foi movida.</p>
        <Link
          href="/pt"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent-500)] px-6 py-3 text-sm font-semibold text-[color:var(--color-brand-950)] transition hover:bg-[color:var(--color-accent-400)]"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
