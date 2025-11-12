import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.E (Computer Engineering)",
    institution: "Ipcowala Institute of Engineering and Technology",
    year: "2023",
    score: "CGPA 9.11",
  },
  {
    degree: "HSC",
    institution: "Sagar International School",
    year: "2019",
    score: "69.9%",
  },
  {
    degree: "SSC",
    institution: "Sarvajanik High School",
    year: "2017",
    score: "84.6%",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about creating immersive experiences
            </p>
          </div>

          {/* Personal Overview */}
          <Card className="p-8 md:p-12 mb-12 hover-lift card-glass">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              As a dedicated Unity Game Developer, I specialize in crafting engaging
              interactive experiences that span across multiple platforms. My expertise
              lies in developing innovative games and immersive AR/VR/MR applications
              for PC, Android, iOS, and extended reality devices. With a strong
              foundation in computer engineering and hands-on experience at Invisible
              Fiction, I combine technical proficiency with creative vision to bring
              unique digital experiences to life.
            </p>
          </Card>

          {/* Education Timeline */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
              <GraduationCap className="mr-3 h-8 w-8 text-primary" />
              Education Timeline
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-primary/30" />

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-12 md:pl-20 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-2 md:left-6 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                    <Card className="p-6 hover-lift hover-glow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-2 md:mb-0">
                          <h4 className="text-xl font-bold text-foreground mb-1">
                            {edu.degree}
                          </h4>
                          <p className="text-muted-foreground">{edu.institution}</p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-primary font-semibold">{edu.score}</p>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
