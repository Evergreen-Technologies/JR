import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import EditEvent from "@/components/EditEvent";

const page = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, ["default"]);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <EditEvent />
    </TranslationsProvider>
  );
};

export default page;
