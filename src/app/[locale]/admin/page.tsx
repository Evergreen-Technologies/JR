import initTranslations from "@/app/i18n";
const page = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ["default"]);

  return (
    <div className="lg:container lg:w-full lg:mx-auto mx-[20px]">
      <div className="flex items-center justify-center h-[100vh]">
        {t("Admin_Home_Page!")}
      </div>
    </div>
  );
};

export default page;
