import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SignOut from "@/components/SignOut";

export default async function Component({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, ["default"]);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <SignOut />
    </TranslationsProvider>
  );
}
