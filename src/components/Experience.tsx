import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Junior Unity Game Developer",
    company: "Invisible Fiction",
    period: "May 2023 - Present",
    description:
      "Leading development of innovative game projects and AR/VR/MR applications. Collaborating with cross-functional teams to deliver high-quality interactive experiences.",
    technologies: ["Unity", "C#", "Figma"],
    current: true,
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Invisible Fiction",
    period: "Feb 2023 - May 2023",
    description:
      "Contributed to AI-driven game mechanics and intelligent system implementations. Gained expertise in Python integration with Unity environments.",
    technologies: ["Python", "Unity", "C#"],
    current: false,
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              My journey in game development and immersive technologies
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden sm:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-0 sm:pl-20 animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden sm:block" />

                  <Card className="p-6 md:p-8 hover-lift hover-glow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {exp.title}
                          </h3>
                        </div>
                        <p className="text-lg text-primary font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={exp.current ? "default" : "secondary"}>
                          {exp.period}
                        </Badge>
                        {exp.current && (
                          <Badge variant="outline" className="border-primary text-primary">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
