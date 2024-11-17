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
        "انتباه دقيق وميزات مبتكرة قامت بتغيير سير عملنا تماما. هذا هو بالضبط ما كنا نبحث عنه.",
      name: "سارة تشين",
      designation: "مدير المنتج في تيك فلو",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "كان التنفيذ سلساً و超عت توقعاتنا. مرونة المنصة مدهشة.",
      name: "مايكل رودريغيز",
      designation: "مدير تكنولوجيا المعلومات في إينوفيت سبير",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "لقد حسنت هذه الحلول من إنتاجية فريقنا بشكل كبير. واجهة المستخدم البسيطة تجعل المهام المعقدة سهلة.",
      name: "إميلي واتسون",
      designation: "مدير العمليات في كلاود سكيل",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "دعم ممتاز وميزات قوية. نادراً ما تجد منتجاً يفي بكل ما يpromis.",
      name: "جيمس كيم",
      designation: "قائد فريق الهندسة في داتا برو",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "لقد غيرت قابلية التوسع والأداء لعملنا. نوصي به بشدة لأي عمل ناشئ.",
      name: "ليزا تومسون",
      designation: "نائب الرئيس لتقنية المعلومات في فوتشر نت",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
