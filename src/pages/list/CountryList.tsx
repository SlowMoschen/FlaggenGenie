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

  return (
    <>
      <Header title={t("headerTitle")} redirectHome />
      <main className="overflow-y-auto  w-full place-content-center">
        <table className="table-auto lg:table-fixed w-full" ref={listRef}>
          <thead className="border-b border-text-50 sticky top-0 bg-background-600 h-10">
            <tr>
              <th className="text-start px-3">{t("flag")}</th>
              <th className="text-start">{t("name")}</th>
              <th className="text-start">{t("capital")}</th>
              <th className="text-start">{t("region")}</th>
              <th className="text-start">{t("area")}</th>
              <th className="text-start">{t("population")}</th>
              <th className="text-start">{t("currency")}</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, i) => (
              <tr key={i} className="h-20 border-b border-text-50 odd:bg-background-800">
                <td className="px-3">
                  <img
                    className="h-8 w-12"
                    src={country.flagSrc}
                    alt={`${country.abbreviation} flag`}
                  />
                </td>
                <td>{t(`${country.abbreviation}.name`, { ns: "countries" })}</td>
                <td>{t(`${country.abbreviation}.capital`, { ns: "countries" })}</td>
                <td>{t(`${country.abbreviation}.region`, { ns: "countries" })}</td>
                <td>{Number(country.facts.area).toLocaleString()} km²</td>
                <td>{Number(country.facts.population).toLocaleString()}</td>
                <td>{t(`${country.abbreviation}.currency`, { ns: "countries" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button className="fixed z-20 bottom-4 right-4" buttonSize="medium" variant="icon" onClick={scrollToTop}>
          <img src={arrow} alt="top" className="h-6 w-6 rotate-90" />
        </Button>
      </main>
    </>
  );
}
