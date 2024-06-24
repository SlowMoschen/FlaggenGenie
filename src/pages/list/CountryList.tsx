import { useTranslation } from "react-i18next";
import { Country } from "../../Countries";
import Header from "../../shared/components/Header";
import { arrow } from "../../assets";
import Button from "../../shared/components/Button";
import { useEffect, useRef, useState } from "react";

interface CountryListProps {
  countries: Country[];
}

export default function CountryList({ countries }: CountryListProps) {
  const { t } = useTranslation("list");
  const listRef = useRef<HTMLTableElement>(null);
  const [isImageDisplayed, setIsImageDisplayed] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

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

  const handleFlagClick = (country: Country) => {
    setIsImageDisplayed(true);
    setImageSrc(country.flagSrc);
  };

  const hanldeOutsideClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setIsImageDisplayed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", hanldeOutsideClick);

    return () => document.removeEventListener("mouseup", hanldeOutsideClick);
  }, []);

  return (
    <>
      <Header title={t("headerTitle")} redirectHome />
      <main className="overflow-y-auto  w-full place-content-center" ref={listRef}>
        {
          isImageDisplayed && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-50 bg-opacity-30 p-2">
              <div className="bg-background-950 p-10 rounded-lg" ref={dialogRef}>
                <img src={imageSrc} alt="flag" className="h-64 w-96 object-contain" />
              </div>
            </div>
          )
        }
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
                      className="h-8 w-12 object-contain cursor-pointer"
                      src={country.flagSrc}
                      alt={`${country.abbreviation} flag`}
                      onClick={() => handleFlagClick(country)}
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
