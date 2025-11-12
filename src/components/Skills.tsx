import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code2, Gamepad2, Palette } from "lucide-react";

const skillCategories = [
  {
    icon: Gamepad2,
    title: "Game Development",
    skills: [
      { name: "Unity3D", level: 95 },
      { name: "C# Programming", level: 90 },
      { name: "Game Design", level: 85 },
    ],
  },
  {
    icon: Code2,
    title: "AR/VR/MR Development",
    skills: [
      { name: "ARCore", level: 88 },
      { name: "Vuforia", level: 85 },
      { name: "OpenXR", level: 82 },
    ],
  },
  {
    icon: Palette,
    title: "Design & Tools",
    skills: [
      { name: "Figma", level: 80 },
      { name: "UI/UX Design", level: 75 },
      { name: "Python", level: 70 },
    ],
  },
];

const coreSkills = [
  "Game Programming",
  "Game Development",
  "Game Design",
  "UI Design using Figma",
  "AR/VR Development",
  "Cross-Platform Development",
  "Unity3D",
  "C#",
  "MediaPipe",
  "Photon SDK",
  "Agora SDK",
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Expertise across game development and immersive technologies
            </p>
          </div>

          {/* Skill Categories with Progress Bars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 hover-lift hover-glow animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-sm font-medium text-primary">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Core Skills Tags */}
          <Card className="p-8 md:p-12 card-glass">
            <h3 className="text-2xl font-bold mb-6 text-center">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {coreSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium transition-all duration-300 cursor-default hover-lift"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
