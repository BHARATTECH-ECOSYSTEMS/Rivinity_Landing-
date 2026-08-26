import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="container px-6 py-20 sm:px-8 lg:px-12 ">
      <div className="mx-auto max-w-4xl rounded-3xl px-8 py-12 text-center text-black  sm:px-12 section-sm bg-gray-50">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to build with Rivinity?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-basesm:text-lg">
          Launch faster with AI workflows designed for real teams and real products.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Get started free
          </Link>
        </div>
      </div>
    </section>
  );
}
