import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Goldfish } from "@/components/art";

export default function NotFound() {
  return (
    <div className="wrap flex flex-col items-center py-24 text-center">
      <div className="water dither flex h-40 w-full max-w-[520px] items-end justify-center overflow-hidden border-2 border-ink shadow-hard">
        <Goldfish className="mb-6 w-24 animate-bob" title="A pixel goldfish" />
      </div>
      <p className="display mt-10 text-[64px] leading-none text-vermilion">404</p>
      <h1 className="mt-3 text-[30px]">This page swam off</h1>
      <p className="mt-3 max-w-[30rem] text-[17px] text-ink-soft">
        The link is wrong or the page moved. Everything we have is reachable from the top bar.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to the start
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
