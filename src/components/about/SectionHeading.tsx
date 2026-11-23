export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl lg:text-[2.1rem]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
