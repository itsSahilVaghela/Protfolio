import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Unreal & Unity Game Developer",
    company: "Invisible Fiction",
    period: "Feb 2026 - Present",
    description:
      "Building multiuser architectural visualization and Unreal Engine tooling, alongside Unity XR work.",
    highlights: [
      "FictionArchviz (Unreal Engine 5, C++): developing a desktop and Meta Quest multiuser architectural-visualization application.",
      "Built a floor-plan processing workflow that extracts walls, windows, and doors from floor-plan images into separate DXF layers.",
      "Implemented C++ geometry generation that reads DXF/JSON building data and creates roof meshes, including polygon-gap handling and tessellation.",
      "Developed a VR see-through/X-ray overlay material with consistent outline thickness and worked on interior-lighting balance using skylight and lighting channels.",
      "Extended the server-manager subsystem with color-coded on-screen debug output and documented the multiuser session flow.",
      "MimadimHomeStudio / Mimadim (Unreal Engine): implemented furniture data assets and a master data asset mapping furniture types to available furniture assets; added selection and replacement logic with transform preservation.",
      "Refactored furniture customization responsibilities toward a GameInstance subsystem to centralize selection, replacement, and future material-customization logic.",
      "Fiction Mech (Unity, OpenXR, Meta Quest 3): developed a 3D visualization experience as sole developer, including multiplayer and two-way control/communication between Quest 3 and Android using Agora Video SDK.",
      "Three.js: developed browser-based 3D game prototypes using AI-assisted coding workflows, reviewing, debugging, testing, and refining generated code.",
    ],
    technologies: ["Unreal Engine 5", "C++", "Unity", "C#", "OpenXR", "Agora SDK", "Three.js", "DXF/JSON"],
    current: true,
  },
  {
    title: "Junior Unity Game Developer",
    company: "Invisible Fiction",
    period: "May 2023 - Feb 2026",
    description:
      "Developed and updated in-house Unity/C# games and XR applications.",
    highlights: [
      "Developed and updated in-house Unity/C# games, including Turbo Trail, Cupping Muffins, and Catch the Object; adapted game content into themed variants and improved UI.",
      "Built body-tracking gameplay for Alien Runner and Football Cup using MediaPipe, streaming movement data into Unity to drive player actions.",
      "Worked on a QR-triggered AR model-visualization application for HoloLens using ARCore/Vuforia-related tooling.",
      "Contributed to Fiction Mech, a 3D model visualization application for Meta Quest 3, including OpenXR and cross-device communication work.",
    ],
    technologies: ["Unity", "C#", "MediaPipe", "OpenXR", "ARCore", "Vuforia", "Figma"],
    current: false,
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Invisible Fiction",
    period: "Feb 2023 - May 2023",
    description:
      "Prototyped AI-driven movement tracking for Unity games using Python.",
    highlights: [
      "Prototyped human-movement recognition in Python using MediaPipe and sent tracking data to a Unity game to control the player.",
      "Supported day-to-day development activities and collaborated with cross-functional teammates.",
    ],
    technologies: ["Python", "MediaPipe", "Unity", "C#"],
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
              My journey in game development, software and immersive technologies
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

                    <ul className="space-y-2 mb-5 text-muted-foreground">
                      {exp.highlights.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3 leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

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
