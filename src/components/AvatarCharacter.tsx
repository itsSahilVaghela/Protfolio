import { useState } from "react";
import { validateAvatarDefinition, type AvatarDefinition } from "@bible-strong/avatar-core";
import { Avatar } from "@bible-strong/avatar-react";
import "@bible-strong/avatar-react/styles.css";
import definitionJson from "@/assets/strobi.avatar.json";

const validation = validateAvatarDefinition(definitionJson);
const definition = validation.ok ? (validation.value as AvatarDefinition) : null;

interface AvatarCharacterProps {
  size?: number;
  interactive?: boolean;
  className?: string;
}

export const AvatarCharacter = ({
  size = 140,
  interactive = false,
  className = "",
}: AvatarCharacterProps) => {
  const [animation, setAnimation] = useState<string>("idle");

  if (!definition) {
    return <div className="text-muted-foreground text-sm">Avatar loading...</div>;
  }

  const sampleAnimations = ["idle", "happy", "curious", "excited", "celebrate"];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => !interactive && setAnimation("happy")}
      onMouseLeave={() => !interactive && setAnimation("idle")}
    >
      <div className="transition-transform duration-300 hover:scale-105">
        <Avatar
          definition={definition}
          animation={animation}
          size={size}
          ariaLabel="Strobi procedural animated avatar"
        />
      </div>

      {interactive && (
        <div
          className="flex flex-wrap gap-1.5 justify-center mt-3 pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          {sampleAnimations.map((anim) => (
            <button
              key={anim}
              type="button"
              onClick={() => setAnimation(anim)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                animation === anim
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {anim.charAt(0).toUpperCase() + anim.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
