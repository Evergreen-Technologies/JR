import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import UploadContent from "@/components/UploadContent";

export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, ["default"]);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <UploadContent />
    </TranslationsProvider>
  );
}
