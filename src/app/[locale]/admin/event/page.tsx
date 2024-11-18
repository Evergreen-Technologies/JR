import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import Event from "@/components/Event";

const page = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, ["default"]);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <Event />
    </TranslationsProvider>
  );
};

export default page;
