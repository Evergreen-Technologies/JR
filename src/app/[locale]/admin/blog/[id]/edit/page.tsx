import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import EditPost from "@/components/EditPost";

const Page = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, ["default"]);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <EditPost />
    </TranslationsProvider>
  );
};

export default Page;
