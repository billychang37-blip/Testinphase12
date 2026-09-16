import { ShieldCheck, Zap, Globe, UserCheck } from "lucide-react";

export default function ValueProps() {
  const props = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-ocbc-red" />,
      title: "Safe & Secure",
      desc: "Your security is our priority with industry-leading protection."
    },
    {
      icon: <Zap className="w-8 h-8 text-ocbc-red" />,
      title: "Fast & Convenient",
      desc: "Bank in seconds with seamless digital experiences."
    },
    {
      icon: <Globe className="w-8 h-8 text-ocbc-red" />,
      title: "Global Network",
      desc: "Access our services across 19 markets worldwide."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-ocbc-red" />,
      title: "You First",
      desc: "Solutions tailored to your needs, whenever you need us."
    }
  ];

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((prop, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{prop.title}</h3>
              <p className="text-gray-600 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
