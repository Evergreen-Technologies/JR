import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import NewPost from "@/components/NewPost";

const page: React.FC = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, ["default"]);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <NewPost />
    </TranslationsProvider>
  );
};

export default page;
