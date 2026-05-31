"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = string;
type Attribute = "class" | `data-${string}` | `data-${string}-${string}`;

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  forcedTheme?: Theme;
  themes?: Theme[];
  value?: Record<Theme, string>;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  forcedTheme?: Theme;
  resolvedTheme: Theme;
  themes: Theme[];
  systemTheme?: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  resolvedTheme: "dark",
  themes: ["light", "dark"],
});

export function useTheme() {
  return useContext(ThemeContext);
}

const COLOR_SCHEMES = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";

function applyTheme(
  attribute: Attribute | Attribute[],
  themes: Theme[],
  value: Record<Theme, string> | undefined,
  theme: Theme,
  enableColorScheme: boolean
) {
  const resolved = value ? value[theme] : theme;
  const attrs = Array.isArray(attribute) ? attribute : [attribute];

  for (const attr of attrs) {
    if (attr === "class") {
      document.documentElement.classList.remove(...themes.map((t) => (value ? value[t] : t)));
      if (resolved) document.documentElement.classList.add(resolved);
    } else if (attr.startsWith("data-")) {
      if (resolved) {
        document.documentElement.setAttribute(attr, resolved);
      } else {
        document.documentElement.removeAttribute(attr);
      }
    }
  }

  if (enableColorScheme) {
    const scheme = COLOR_SCHEMES.includes(theme) ? theme : undefined;
    document.documentElement.style.colorScheme = scheme || "";
  }
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  forcedTheme,
  themes = ["light", "dark"],
  value,
}: ThemeProviderProps) {
  // Read stored theme synchronously from localStorage to match the
  // blocking script in layout.tsx and avoid a flash on first render.
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("theme");
        if (stored) return stored;
      } catch {}
    }
    // No stored theme — use "system" when enableSystem, otherwise default
    return enableSystem ? "system" : defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const resolvedTheme = useMemo(() => {
    if (forcedTheme) return forcedTheme;
    if (theme === "system" && enableSystem) return systemTheme;
    return theme;
  }, [theme, systemTheme, forcedTheme, enableSystem]);

  const allThemes = useMemo(
    () => (enableSystem ? [...themes, "system"] : themes),
    [themes, enableSystem]
  );

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch {}
    },
    []
  );

  // Mark as mounted after first render to enable context
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const currentTheme = forcedTheme ?? (theme === "system" && enableSystem ? systemTheme : theme);
    if (currentTheme) {
      const css = disableTransitionOnChange
        ? document.createElement("style")
        : null;
      if (css) {
        css.appendChild(
          document.createTextNode(
            "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
          )
        );
        document.head.appendChild(css);
      }

      applyTheme(attribute, themes, value, currentTheme, true);

      if (css) {
        // Force a reflow, then remove the style
        window.getComputedStyle(css).opacity;
        document.head.removeChild(css);
      }
    }
  }, [theme, systemTheme, forcedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;
    const media = window.matchMedia(MEDIA);
    const listener = () => setSystemTheme(media.matches ? "dark" : "light");
    setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [enableSystem]);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme,
      themes: allThemes,
      systemTheme: enableSystem ? systemTheme : undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, allThemes, systemTheme, enableSystem]
  );

  // During SSR, render children without context to avoid any hydration issues.
  // The blocking script in layout.tsx handles the initial theme class on <html>.
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
