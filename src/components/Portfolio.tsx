import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Turbo Trail",
    type: "Mobile Game",
    role: "Sub Developer",
    tech: ["Unity3D", "C#"],
    description:
      "A high-speed, adrenaline-pumping mobile game where players guide a ball through obstacles by drawing dynamic rubber trails. Each trail acts as both a pathway and a shield, testing players' reflexes and precision.",
    category: "game",
  },
  {
    title: "Alien Runner",
    type: "PC Game",
    role: "Sub Developer",
    tech: ["Unity3D", "C#", "MediaPipe"],
    description:
      "A motion-sensing PC game that lets players control character movements through body gestures using MediaPipe. Offers an engaging single-player experience with seamless control and responsive UI.",
    category: "game",
  },
  {
    title: "Cupping Muffins",
    type: "Mobile Game",
    role: "Sub Developer",
    tech: ["Unity3D", "C#"],
    description:
      "A playful game where players control a moving cup collecting ingredients while avoiding obstacles to craft the perfect muffin. Reworked gameplay for new food themes.",
    category: "game",
  },
  {
    title: "Football Cup",
    type: "PC Game",
    role: "Sub Developer",
    tech: ["Unity3D", "C#", "MediaPipe"],
    description:
      "A PC soccer game integrating body detection technology, translating real leg movements into in-game actions for an immersive experience. Implemented MediaPipe movement integration.",
    category: "game",
  },
  {
    title: "Catch The Object",
    type: "Casual Game",
    role: "Sole Developer",
    tech: ["Unity3D", "C#"],
    description:
      "A fun and casual game where players catch falling objects with a basket, earning or losing points based on item type. Complete solo development from concept to release.",
    category: "game",
  },
  {
    title: "AR Project Model on QR",
    type: "AR Application",
    role: "Sole Developer",
    tech: ["Unity3D", "C#", "ARCore", "Vuforia"],
    description:
      "An AR application that visualizes 3D models through QR codes using Hololens devices and mobile AR technology. Seamless integration of marker-based AR experiences.",
    category: "ar-vr",
  },
  {
    title: "Fiction Mech",
    type: "VR Project",
    role: "Sole Developer",
    tech: ["Unity3D", "C#", "OpenXR", "Agora SDK"],
    description:
      "A VR project for Meta Quest 3 that visualizes 3D objects in virtual environments. Includes multiplayer communication between Meta Quest 3 and Android devices via Photon and Agora SDK.",
    category: "ar-vr",
  },
  {
    title: "Radicon Powerbuild AR/MR",
    type: "Client Project",
    role: "Sole Developer",
    tech: ["Unity3D", "C#", "Meta SDK", "Vuforia"],
    description:
      "A mixed reality solution for Radicon Powerbuild that allows users to view gearbox models from brochures or directly on factory floors using Meta Quest 3. Offers real-time scaling, detail exploration, and an interactive presentation mode for demonstrations and training.",
    category: "client",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "game", label: "Games" },
  { id: "ar-vr", label: "AR/VR/MR" },
  { id: "client", label: "Client Work" },
];

export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Showcasing innovative projects across games and immersive tech
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="hover-lift"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover-lift hover-glow group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Icon/Visual */}
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-6xl font-bold text-primary/30">
                    {project.title.charAt(0)}
                  </div>
                </div>

                <Badge variant="secondary" className="mb-3">
                  {project.type}
                </Badge>

                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">
                    {project.role}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            ))}
          </div>

          {/* Project Detail Modal */}
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              {selectedProject && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge>{selectedProject.type}</Badge>
                        <Badge variant="outline">{selectedProject.role}</Badge>
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Visual */}
                    <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <div className="text-9xl font-bold text-primary/30">
                        {selectedProject.title.charAt(0)}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-lg mb-2">About</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
