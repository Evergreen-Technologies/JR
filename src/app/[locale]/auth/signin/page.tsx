import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SignIn from "@/components/SignIn";

export default async function Component({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, ["default"]);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <SignIn />
    </TranslationsProvider>
  );
}
