import { Trans, useLingui } from "@lingui/react/macro";
import { useMemo, useState } from "react";
import { ConstituencySummary } from "@/components/mps/ConstituencySummary/ConstituencySummary";
import { formatMpCount } from "@/components/mps/ConstituencySummary/utils/formatMpCount";
import { MpsList } from "@/components/mps/MpsList/MpsList";
import { MpsPageHeader } from "@/components/mps/MpsPageHeader/MpsPageHeader";
import { FilterChips } from "@/components/shared/FilterChips/FilterChips";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { MetricLegend } from "@/components/shared/MetricLegend/MetricLegend";
import { SearchToolbar } from "@/components/shared/SearchToolbar/SearchToolbar";
import type { SearchToolbarSortOption } from "@/components/shared/SearchToolbar/SearchToolbar.types";
import {
  CLUB_SHORT_NAMES,
  DEFAULT_CONSTITUENCY_NUMBER,
  MPS_FIXTURE,
} from "@/constants/mps-fixtures";
import { filterMpsByClub } from "@/utils/mps/filterMpsByClub";
import { getClubOptions } from "@/utils/mps/getClubOptions";
import {
  type MpsSearchResult,
  resolveMpsSearch,
} from "@/utils/mps/resolveMpsSearch";
import { sortMpsByLastName } from "@/utils/mps/sortMpsByLastName";

type MpsSort = "surnameAsc" | "surnameDesc";

const HEADING_CLASS_NAME =
  "font-(family-name:--font-heading) text-2xl leading-8 font-bold text-gi-primary";

// Lista posłów, którą pokazują przyciski klubów i siatka, zanim zadziała
// filtr klubu: wszyscy posłowie okręgu albo wszyscy znalezieni po nazwisku.
const getScopeMps = (result: MpsSearchResult) => {
  if (result.type === "constituency") {
    return result.constituency.mps;
  }

  return result.type === "mps" ? result.mps : [];
};

const Poslowie = () => {
  const { i18n, t } = useLingui();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<MpsSort>("surnameAsc");
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  const trimmedQuery = query.trim();

  const result = useMemo(
    () =>
      resolveMpsSearch({
        query,
        constituencies: MPS_FIXTURE.constituencies,
        defaultConstituencyNumber: DEFAULT_CONSTITUENCY_NUMBER,
      }),
    [query],
  );
  const scopeMps = useMemo(() => getScopeMps(result), [result]);
  const clubOptions = useMemo(
    () => getClubOptions(scopeMps, CLUB_SHORT_NAMES),
    [scopeMps],
  );

  // Gdyby wybranego klubu nie było na nowej liście, wracamy do "Wszystkie".
  const activeClubId = clubOptions.some((option) => option.id === selectedClubId)
    ? selectedClubId
    : null;

  const visibleMps = useMemo(
    () =>
      sortMpsByLastName(
        filterMpsByClub(scopeMps, activeClubId),
        sort === "surnameAsc" ? "asc" : "desc",
      ),
    [scopeMps, activeClubId, sort],
  );

  const sortOptions: ReadonlyArray<SearchToolbarSortOption<MpsSort>> = [
    { value: "surnameAsc", label: t`Nazwisko A–Ż` },
    { value: "surnameDesc", label: t`Nazwisko Ż–A` },
  ];

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setSelectedClubId(null);
  };

  const { totalMpCount, interpellationStats } = MPS_FIXTURE;
  const medianLabel = i18n.number(interpellationStats.median);
  const legendItems = [
    {
      symbol: "percent",
      label: t`Głosowania: udział we wszystkich głosowaniach w tej kadencji`,
    },
    {
      symbol: "median",
      label: t`Interpelacje: pozycja wśród ${totalMpCount} posłów, kreska = mediana Sejmu (${medianLabel})`,
    },
  ] as const;

  const constituencyNumber =
    result.type === "constituency" ? result.constituency.number : null;
  const resultsLabel =
    constituencyNumber === null
      ? t`Wyniki wyszukiwania`
      : t`Posłowie okręgu nr ${constituencyNumber}`;

  const otherConstituencyNumbers =
    result.type === "constituency"
      ? result.otherConstituencies.map((other) => other.number).join(", ")
      : "";

  const emptyReason = result.type === "none" ? "noMatch" : "noMps";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto box-content flex max-w-300 flex-col gap-6 px-4 py-8 md:px-8">
          <MpsPageHeader
            termNumber={MPS_FIXTURE.termNumber}
            mpCount={totalMpCount}
          />

          <SearchToolbar
            query={query}
            onQueryChange={handleQueryChange}
            searchLabel={t`Szukaj okręgu lub posła`}
            searchPlaceholder={t`Miejscowość lub nazwisko posła`}
            sortOptions={sortOptions}
            sort={sort}
            onSortChange={setSort}
          />

          <section aria-label={resultsLabel} className="flex flex-col gap-6">
            {result.type === "constituency" ? (
              <div className="flex flex-col gap-2">
                <ConstituencySummary
                  number={result.constituency.number}
                  name={result.constituency.name}
                  mpCount={result.constituency.mps.length}
                  includesAbroadVotes={result.constituency.includesAbroadVotes}
                />
                {result.otherConstituencies.length > 0 ? (
                  <p
                    role="status"
                    className="text-sm leading-5 text-gi-light-primary"
                  >
                    <Trans>
                      Ta miejscowość leży w kilku okręgach (nr{" "}
                      {constituencyNumber}, {otherConstituencyNumbers}).
                      Pokazujemy okręg nr {constituencyNumber}.
                    </Trans>
                  </p>
                ) : null}
              </div>
            ) : null}

            {result.type === "mps" ? (
              <div className="flex flex-col gap-1">
                <h2 className={HEADING_CLASS_NAME}>
                  <Trans>Wyniki dla „{trimmedQuery}”</Trans>
                </h2>
                <p className="text-sm leading-5 text-gi-light-primary">
                  {formatMpCount(result.mps.length)}
                </p>
              </div>
            ) : null}

            {result.type === "none" ? (
              <h2 className={HEADING_CLASS_NAME}>
                <Trans>Nie znaleziono okręgu</Trans>
              </h2>
            ) : null}

            {scopeMps.length > 0 ? (
              <>
                <FilterChips
                  label={t`Filtruj według klubu`}
                  options={clubOptions}
                  totalCount={scopeMps.length}
                  selectedId={activeClubId}
                  onSelect={setSelectedClubId}
                />
                <MetricLegend items={legendItems} />
              </>
            ) : null}

            <MpsList
              mps={visibleMps}
              emptyReason={emptyReason}
              query={trimmedQuery}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Poslowie;
