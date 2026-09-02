export function Marquee() {
  const words = [
    "React",
    "Node.js",
    "Laravel",
    "MongoDB",
    "Angular",
    "Firebase",
    "Ionic",
    "TypeScript",
  ];

  // Repeat enough times to fill a very wide screen and allow a 50% translation
  const items = [...words, ...words, ...words, ...words, ...words, ...words];

  return (
    <div className="flex w-full overflow-hidden border-y border-border bg-background py-8 select-none">
      <div className="flex w-max animate-marquee items-center">
        {items.map((item, i) => (
          <span
            key={i}
            className="display-md flex items-center whitespace-nowrap px-6 text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            {item}
            <span className="text-primary mx-12 text-2xl">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
