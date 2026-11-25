import type { HeroUnderstandProps } from "./HeroUnderstand.types";

export const HeroUnderstand = ({ title, description }: HeroUnderstandProps) => {
  if (title.trim() === "") {
    if (import.meta.env.DEV) {
      console.warn("HeroUnderstand: title is empty");
    }
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-3 rounded-[32px] bg-gi-primary px-8 py-6">
      <h1 className="font-(family-name:--font-heading) text-[40px] leading-15 font-bold wrap-break-word text-white">
        {title}
      </h1>
      {description && (
        <p className="text-lg leading-normal wrap-break-word text-gi-dark-ash">
          {description}
        </p>
      )}
    </section>
  );
};
