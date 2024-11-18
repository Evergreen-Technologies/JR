import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calendar, Video, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "../i18n";
const Index = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, ["default"]);

  const testimonials = [
    {
      quote:
        "ذا الموقع مخصص لنشر الدروس التي ألقاها سماحة المفتي دكتور جيلان خضر غمدا في مسجد الأنصار على مدار ال ٢٥ عاما الماضية ، ونشر الكتب والمقالات التي كتبها الشيخ مما يجعلها متاحة لطالب العلم. نسأل الله أن يفيدنا من هذا ويوفقنا.",
      name: "هدفنا",

      src: "https://utfs.io/f/f4ZDSnWtuS7kWrr7ZKJiSEpv9gZDsHUhMC7k2mV1XbPYTq0G",
    },
    {
      quote:
        "ذا الموقع مخصص لنشر الدروس التي ألقاها سماحة المفتي دكتور جيلان خضر غمدا في مسجد الأنصار على مدار ال ٢٥ عاما الماضية ، ونشر الكتب والمقالات التي كتبها الشيخ مما يجعلها متاحة لطالب العلم. نسأل الله أن يفيدنا من هذا ويوفقنا.",
      name: "هدفنا",
      src: "https://utfs.io/f/f4ZDSnWtuS7koAHwnVq9kT0UajK1Eqxs85WpO6td2uli4nFe",
    },
    {
      quote:
        "ذا الموقع مخصص لنشر الدروس التي ألقاها سماحة المفتي دكتور جيلان خضر غمدا في مسجد الأنصار على مدار ال ٢٥ عاما الماضية ، ونشر الكتب والمقالات التي كتبها الشيخ مما يجعلها متاحة لطالب العلم. نسأل الله أن يفيدنا من هذا ويوفقنا.",
      name: "هدفنا",
      src: "https://utfs.io/f/f4ZDSnWtuS7k713M0id53Lmb69hAVwT1OgoQ4iCIrGKUvyRH",
    },
    {
      quote:
        "ذا الموقع مخصص لنشر الدروس التي ألقاها سماحة المفتي دكتور جيلان خضر غمدا في مسجد الأنصار على مدار ال ٢٥ عاما الماضية ، ونشر الكتب والمقالات التي كتبها الشيخ مما يجعلها متاحة لطالب العلم. نسأل الله أن يفيدنا من هذا ويوفقنا.",
      name: "هدفنا",
      src: "https://utfs.io/f/f4ZDSnWtuS7kupz411DXNrVsBvIafo2ZhQRAKtxw4UFl5J0k",
    },
    {
      quote:
        "ذا الموقع مخصص لنشر الدروس التي ألقاها سماحة المفتي دكتور جيلان خضر غمدا في مسجد الأنصار على مدار ال ٢٥ عاما الماضية ، ونشر الكتب والمقالات التي كتبها الشيخ مما يجعلها متاحة لطالب العلم. نسأل الله أن يفيدنا من هذا ويوفقنا.",
      name: "هدفنا",
      src: "https://utfs.io/f/f4ZDSnWtuS7kUw5FqVo0SLwI17NcumT65bR9lFtZvik8gEKD",
    },
  ];
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["default"]}
    >
      <div className="min-h-screen lg:container lg:mx-auto shadow-2xl rounded-[30px] mt-10">
        <section className="geometric-pattern py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fadeIn">
              <h1 className="text-4xl lg:text-6xl font-bold text-islamic-primary mb-6">
                {t("Welcome_to")}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8">
                {t("embark")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={"/user/video_library"}
                  className=" text-islamic-primary hover:bg-islamic-light bg-black text-white px-8 py-2 rounded-[7px] text-[15px]"
                >
                  {t("Explore_Content")}
                </Link>
                <Link
                  href={"/user/contact"}
                  className=" text-islamic-primary hover:bg-islamic-light bg-white text-black px-12 py-2 rounded-[5px] text-[15px] border border-slate-600"
                >
                  {t("Contact")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-islamic-primary mb-6">
                {t("your_teacher")}
              </h2>
              <AnimatedTestimonials testimonials={testimonials} />
            </div>
          </div>
        </section>

        <section className="py-16 bg-islamic-light/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-islamic-primary text-center mb-12">
              {t("what_to_Expect")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pl-10">
              <Card className="feature-card">
                <BookOpen className="w-12 h-12 text-islamic-accent mb-4" />
                <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                  {t("Islamic_Blog")}
                </h3>
                <p className="text-gray-600">{t("Regular")}</p>
              </Card>

              <Card className="feature-card">
                <Calendar className="w-12 h-12 text-islamic-accent mb-4" />
                <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                  {t("Events_Calendar")}
                </h3>
                <p className="text-gray-600">{t("Stay_updated")}</p>
              </Card>

              <Card className="feature-card">
                <Video className="w-12 h-12 text-islamic-accent mb-4" />
                <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                  {t("Video_Library")}
                </h3>
                <p className="text-gray-600">{t("Access")}</p>
              </Card>

              <Card className="feature-card">
                <Mail className="w-12 h-12 text-islamic-accent mb-4" />
                <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                  {t("Direct_Contact")}
                </h3>
                <p className="text-gray-600">{t("Get_in_touch")}</p>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-16 bg-islamic-primary ">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t("Start_Your")}
            </h2>
            <p className="text-lg mb-8 text-islamic-light">{t("Join_our")}</p>
            <Link
              href={"/user/video_library"}
              className=" text-islamic-primary hover:bg-islamic-light bg-black text-white px-5 py-3 rounded-[7px] text-[15px]"
            >
              {t("Get_Started")}
            </Link>
          </div>
        </section>
      </div>
    </TranslationsProvider>
  );
};

export default Index;
