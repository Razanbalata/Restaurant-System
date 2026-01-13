"use client"

import { useTheme } from "@mui/material";
import {
  Utensils,
  Pizza,
  Coffee,
  IceCream,
  ChefHat,
  Grape,
  Soup,
  Candy,
} from "lucide-react"

export function FloatingFoodIcons() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <div
      className={`
        absolute inset-0 overflow-hidden transition-colors duration-500
        ${isDark 
          ? "bg-[#020617]" // لون أسود كحلي عميق للدارك مود
          : "bg-slate-50"   // لون فاتح جداً للايت مود
        }
      `}
    >
      {/* طبقة التدرج اللوني (Gradient Overly) */}
      <div className={`
        absolute inset-0 
        ${isDark 
          ? "bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" 
          : "bg-gradient-to-br from-orange-500/5 to-red-500/5"
        }
      `} />

      {/* Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-10deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(8deg); }
        }
        .float-slow { animation: float-slow 8s ease-in-out infinite; }
        .float-medium { animation: float-medium 6s ease-in-out infinite; }
        .float-fast { animation: float-fast 5s ease-in-out infinite; }
      `}</style>

      {/* الأيقونات - قمت بتفتيح ألوانها في الدارك مود لتبرز فوق الأسود */}
      <Icon
        className="top-[15%] left-[10%] float-slow"
        icon={<Pizza />}
        color={isDark ? "text-yellow-400/20" : "text-yellow-500/40"}
      />

      <Icon
        className="top-[20%] right-[12%] float-medium"
        icon={<Coffee />}
        color={isDark ? "text-orange-300/20" : "text-orange-900/40"}
      />

      <Icon
        className="top-[45%] left-[8%] float-fast"
        icon={<IceCream />}
        color={isDark ? "text-pink-300/20" : "text-pink-400/40"}
        size="w-12 h-12"
      />

      <Icon
        className="top-[50%] right-[10%] float-slow"
        icon={<ChefHat />}
        color={isDark ? "text-slate-200/20" : "text-gray-400/40"}
      />

      <Icon
        className="bottom-[25%] left-[15%] float-medium"
        icon={<Grape />}
        color={isDark ? "text-purple-300/20" : "text-purple-400/40"}
        size="w-7 h-7"
      />

      <Icon
        className="bottom-[20%] right-[15%] float-fast"
        icon={<Soup />}
        color={isDark ? "text-orange-300/20" : "text-orange-400/40"}
      />

      <Icon
        className="top-[35%] left-[20%] float-slow"
        icon={<Utensils />}
        color={isDark ? "text-blue-300/20" : "text-blue-400/40"}
        size="w-6 h-6"
      />

      <Icon
        className="bottom-[40%] right-[25%] float-medium"
        icon={<Candy />}
        color={isDark ? "text-red-300/20" : "text-red-400/40"}
      />
    </div>
  )
}

/* --- مكون الأيقونة الفرعي --- */
function Icon({ className, icon, color, size = "w-8 h-8" }: { className: string; icon: React.ReactNode; color: string; size?: string }) {
  return (
    <div className={`absolute ${className} pointer-events-none`}>
      <div className={`${size} ${color} transition-all duration-300 transform-gpu`}>
        {icon}
      </div>
    </div>
  )
}