export default function Cta() {
  return (
    <>
    <div className="min-w-screen flex flex-col items-center justify-center text-center mb-25">
      <h2 className="text-3xl font-semibold tracking-tight text-[#16181A] sm:text-4xl lg:text-5xl">
        What are you waiting for?
      </h2>
      <a
        href="https://replit.com/signup"
        style={{ color: "#ffffff" }}
        className="inline-flex items-center justify-center rounded-full bg-[#f75a21] px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-80 sm:text-base"
      >
        Get started free
      </a>
    </div>
    <div className="w-full max-w-7xl h-px bg-gray-300 mx-auto"></div>
    </>
  );
}