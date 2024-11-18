import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import Events from "@/components/Events";

const page = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, ["default"]);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <Events />
    </TranslationsProvider>
  );
};

export default page;
