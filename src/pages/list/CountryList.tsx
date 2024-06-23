import { useTranslation } from "react-i18next";
import { Country } from "../../Countries";
import Header from "../../shared/components/Header";
import { arrow } from "../../assets";
import Button from "../../shared/components/Button";
import { useRef } from "react";

interface CountryListProps {
  countries: Country[];
}

export default function CountryList({ countries }: CountryListProps) {
  const { t } = useTranslation("list");
  const listRef = useRef<HTMLTableElement>(null);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header title={t("headerTitle")} redirectHome />
      <main className="overflow-y-auto  w-full place-content-center" ref={listRef}>
        <table className="lg:table-fixed w-full">
          <thead className="border-b border-text-50 sticky top-0 bg-background-600 h-10">
            <tr>
              <th className="text-start px-2">{t("flag")}</th>
              <th className="text-start px-2">{t("name")}</th>
              <th className="text-start px-2">{t("capital")}</th>
              <th className="text-start px-2">{t("region")}</th>
              <th className="text-start px-2">{t("area")}</th>
              <th className="text-start px-2">{t("population")}</th>
              <th className="text-start px-2">{t("currency")}</th>
            </tr>
          </thead>
          <tbody>
            {countries
              .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
              .map((country, i) => (
                <tr key={i} className="h-20 border-b border-text-50 odd:bg-background-800">
                  <td className="px-2">
                    <img
                      className="h-8 w-12"
                      src={country.flagSrc}
                      alt={`${country.abbreviation} flag`}
                    />
                  </td>
                  <td className="px-2">{t(`${country.abbreviation}.name`, { ns: "countries" })}</td>
                  <td className="px-2">
                    {t(`${country.abbreviation}.capital`, { ns: "countries" })}
                  </td>
                  <td className="px-2">
                    {t(`${country.abbreviation}.region`, { ns: "countries" })}
                  </td>
                  <td className="px-2">{Number(country.facts.area).toLocaleString()} km²</td>
                  <td className="px-2">{Number(country.facts.population).toLocaleString()}</td>
                  <td className="px-2">
                    {t(`${country.abbreviation}.currency`, { ns: "countries" })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex gap-2 justify-end fixed bottom-4 right-5">
        <Button
          className="bg-background-500"
          buttonSize="xsmall"
          variant="icon"
          onClick={() => scrollToTop()}
        >
          <img src={arrow} alt="top" className="h-6 w-6 rotate-90" />
        </Button>
        <Button
          className="bg-background-500"
          buttonSize="xsmall"
          variant="icon"
          onClick={() => scrollToBottom()}
        >
          <img src={arrow} alt="bottom" className="h-6 w-6 -rotate-90" />
        </Button>
        </div>
      </main>
    </>
  );
}
