import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calendar, Video, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Index = () => {
  return (
    <div className="min-h-screen lg:container lg:mx-auto shadow-2xl rounded-[30px] mt-10">
      {/* Hero Section */}
      <section className="geometric-pattern py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <h1 className="text-4xl lg:text-6xl font-bold text-islamic-primary mb-6">
              مرحباً بكم في مركز المعرفة الإسلامية
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              انطلق في رحلة التعلم الإسلامي مع موارد شاملة وإرشاد الخبراء ومجتمع
              داعم.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={"/user/video_library"}
                className=" text-islamic-primary hover:bg-islamic-light bg-black text-white px-8 py-2 rounded-[7px] text-[15px]"
              >
                استكشف المحتوى
              </Link>
              <Link
                href={"/user/contact"}
                className=" text-islamic-primary hover:bg-islamic-light bg-white text-black px-12 py-2 rounded-[5px] text-[15px] border border-slate-600"
              >
                الاتصال
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
              About Your Teacher
            </h2>
            <p className="text-gray-600 mb-8">
              With over 15 years of experience in Islamic studies and education,
              I am dedicated to spreading authentic knowledge and understanding
              of Islam through modern educational methods and technology.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-islamic-light/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-islamic-primary text-center mb-12">
            ما يمكن توقعه
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pl-10">
            <Card className="feature-card">
              <BookOpen className="w-12 h-12 text-islamic-accent mb-4" />
              <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                المدونة الإسلامية
              </h3>
              <p className="text-gray-600">
                مقالات منتظمة حول مواضيع إسلامية متنوعة، من المبادئ الأساسية إلى
                المفاهيم المتقدمة.
              </p>
            </Card>

            <Card className="feature-card">
              <Calendar className="w-12 h-12 text-islamic-accent mb-4" />
              <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                التقويم الفعاليات
              </h3>
              <p className="text-gray-600">
                ابقى على اطلاع دائم بالمحاضرات والورشات والبرامج الخاصة القادمة.
              </p>
            </Card>

            <Card className="feature-card">
              <Video className="w-12 h-12 text-islamic-accent mb-4" />
              <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                مكتبة الفيديو
              </h3>
              <p className="text-gray-600">
                الوصول إلى مجموعة متنامية من الفيديوهات التعليمية والمحاضرات
                المسجلة.
              </p>
            </Card>

            <Card className="feature-card">
              <Mail className="w-12 h-12 text-islamic-accent mb-4" />
              <h3 className="text-xl font-semibold text-islamic-primary mb-2">
                الاتصال المباشر
              </h3>
              <p className="text-gray-600">
                اتصل بنا للاستفسارات أو الاستشارات أو التعاون
              </p>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16 bg-islamic-primary ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ابدأ رحلتك اليوم
          </h2>
          <p className="text-lg mb-8 text-islamic-light">
            انضم إلى مجتمعنا النامي من باحثي المعرفة واستفد من مواردنا الشاملة.
          </p>
          <Link
            href={"/user/video_library"}
            className=" text-islamic-primary hover:bg-islamic-light bg-black text-white px-5 py-3 rounded-[7px] text-[15px]"
          >
            ابدأ الآن
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
