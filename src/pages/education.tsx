import { useLingui } from "@lingui/react/macro";
import { DefinitionList } from "@/components/shared/DefinitionList/DefinitionList";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import {
  EDUCATION_GLOSSARY_INFO,
  EDUCATION_GLOSSARY_ITEMS,
  EDUCATION_GLOSSARY_TITLE,
} from "@/constants/education";

const Education = () => {
  const { i18n } = useLingui();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto box-content flex max-w-300 flex-col gap-4 px-4 py-8 md:flex-row md:px-8">
          <div className="min-w-0 flex-1" />
          <aside className="w-full shrink-0 md:w-[400px]">
            <DefinitionList
              title={i18n._(EDUCATION_GLOSSARY_TITLE)}
              info={i18n._(EDUCATION_GLOSSARY_INFO)}
              items={EDUCATION_GLOSSARY_ITEMS.map((item) => ({
                key: item.key,
                term: i18n._(item.term),
                description: i18n._(item.description),
              }))}
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Education;
