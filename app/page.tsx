import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full font-[family-name:var(--font-meisterr)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/findel-backdrop.png"
          alt="Background Image"
          fill={true}
          className="object-cover object-top"
          priority
          quality={100}
        />
      </div>

      {/* Jägermeister Logo (centered at top) */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <Image src="/JM-logo.webp" alt="Jägermeister Logo" width={216} height={56} />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white gap-8 text-opacity-80">
        <h1 className="text-5xl md:text-4xl font-bold opacity-80 font-[family-name:var(--font-meisterb)]">
          THE MINTING PERIOD HAS EXPIRED
        </h1>
        <p className="mt-2 max-w-lg mx-auto opacity-100">
          Click the button below to learn more about Magomed Dovjenko's one-of-a-kind artwork that was inspired by 9556 Nights of Exploration.
        </p>
        {/* Action Button with Link */}
        <Link href="https://de.jagermeister.com/kampagnen/9556" passHref>
          <button
            className="px-6 py-3 bg-jmorange text-white font-bold rounded-full opacity-60 hover:opacity-100 transition ease-out hover:scale-110"
            style={{ backgroundColor: "#db6b30" }}
          >
            Learn More
          </button>
        </Link>
      </main>

      {/* Imprint Link (bottom left) */}
      <div className="absolute bottom-12 left-12 z-20">
        <Link href="https://www.jagermeister.com/legal/imprint" className="text-base text-gray-300 hover:text-white underline">
          IMPRINT
        </Link>
      </div>
    </div>
  );
}
