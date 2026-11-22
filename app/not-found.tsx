import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center px-6">
      <div className="panel corner-brackets w-full max-w-lg p-8 text-center sm:p-12">
        <p className="font-mono text-[0.7rem] tracking-[0.28em] text-neon uppercase">System / 404</p>
        <p className="mt-8 font-display text-[6rem] leading-none font-semibold tracking-tighter text-gradient">
          404
        </p>
        <p className="mt-6 font-mono text-sm text-muted">$ locate /the/page/you/wanted</p>
        <p className="mt-2 font-mono text-sm text-lime">→ error: route not found in this universe</p>
        <Link href="/" data-cursor="link" className="btn btn-primary mt-9">
          Return home
        </Link>
      </div>
    </section>
  )
}
