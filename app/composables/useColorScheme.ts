import { ref, computed, onMounted } from "vue";

export const COLOR_SCHEMES = {
  strawberry: {
    name: "Strawberry",
    value: "strawberry",
    hsl: "--color-strawberry: 345 100% 62%",
    hex: "#FF6B9D",
  },
  blueberry: {
    name: "Blueberry",
    value: "blueberry",
    hsl: "--color-blueberry: 249 100% 58%",
    hex: "#6366F1",
  },
  apricot: {
    name: "Apricot",
    value: "apricot",
    hsl: "--color-apricot: 24 100% 62%",
    hex: "#FF9D5C",
  },
  kiwi: {
    name: "Kiwi",
    value: "kiwi",
    hsl: "--color-kiwi: 82 65% 59%",
    hex: "#C4E538",
  },
  blackcurrant: {
    name: "Blackcurrant",
    value: "blackcurrant",
    hsl: "--color-blackcurrant: 271 100% 21%",
    hex: "#3D1A5C",
  },
};

export function useColorScheme() {
  const selectedScheme = useLocalStorage("color-scheme", "strawberry");

  const setColorScheme = (scheme: string) => {
    selectedScheme.value = scheme;
    // Apply to document root for CSS variable theming
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-color-scheme", scheme);
    }
  };

  const getSchemeColor = (scheme: string) => {
    return COLOR_SCHEMES[scheme as keyof typeof COLOR_SCHEMES]?.hex || "#000";
  };

  onMounted(() => {
    // Apply saved color scheme on mount
    setColorScheme(selectedScheme.value);
  });

  return {
    selectedScheme,
    setColorScheme,
    getSchemeColor,
    COLOR_SCHEMES,
  };
}
