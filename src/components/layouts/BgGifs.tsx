import { cn } from "@/lib/utils";
import Image from "next/image";

export default function BgGifs({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-screen h-screen fixed top-0 left-0 -z-10 overflow-hidden mt-[80px] max-md:mt-[70px]",
        className
      )}
    >
      <div className="min-w-screen min-h-screen flex flex-col justify-between gap-14 ">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "flex flex-row items-center justify-around w-screen overflow-hidden",
              rowIndex % 2 === 0 ? "justify-around" : "justify-between"
            )}
          >
            {Array.from({ length: rowIndex % 2 === 0 ? 5 : 6 }).map(
              (_, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    "w-[140px] h-[140px] relative max-md:w-[60px] max-md:h-[60px]",
                    colIndex < 2 && "max-md:hidden"
                  )}
                >
                  {rowIndex % 2 === 0 ? (
                    <Image
                      src="/images/Vitalik-unscreen.gif"
                      alt="Vitalik"
                      fill
                    />
                  ) : (
                    <Image src="/images/Toly-unscreen.gif" alt="Toly" fill />
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BgGifsMask({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-screen h-screen fixed top-0 left-0 -z-[5] overflow-hidden mt-[80px] max-md:mt-[70px] bg-white/40",
        className
      )}
    ></div>
  );
}
