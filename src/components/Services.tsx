import { Card } from "@/components/ui/card";
import { Gamepad2, Glasses, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "End-to-end game creation for PC and mobile platforms. From concept to deployment, I craft engaging gameplay experiences with polished mechanics and intuitive controls.",
    features: [
      "PC & Mobile Game Development",
      "Game Mechanics Design",
      "Performance Optimization",
      "Cross-Platform Publishing",
    ],
  },
  {
    icon: Glasses,
    title: "AR/VR/MR Software Development",
    description:
      "Building immersive interactive software for mobile and VR devices. Specialized in creating cutting-edge extended reality experiences that push the boundaries of digital interaction.",
    features: [
      "AR Applications (Mobile & HoloLens)",
      "VR Experiences (Meta Quest)",
      "Mixed Reality Solutions",
      "Real-time 3D Visualization",
    ],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Specialized solutions for game development and immersive experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-8 md:p-10 hover-lift hover-glow group animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="mb-6">
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-gradient transition-all">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-border">
                    <a
                      href="#contact"
                      className="text-primary font-semibold inline-flex items-center gap-2 group/link hover:gap-3 transition-all"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
