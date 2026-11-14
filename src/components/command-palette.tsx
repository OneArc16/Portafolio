"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import {
  Briefcase,
  Code2,
  ExternalLink,
  FolderGit2,
  Layers,
  Mail,
  Search,
  SunMoon,
  User,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { projects } from "@/config/projects";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { cn } from "cn";

type Command =
  | { kind: "section"; value: string; label: string; icon: LucideIcon; id: string }
  | { kind: "link"; value: string; label: string; icon: LucideIcon | typeof GitHubIcon; href: string }
  | { kind: "action"; value: string; label: string; icon: LucideIcon; run: () => void };

interface CommandGroup {
  value: string;
  items: Command[];
}

const sections: Command[] = [
  { kind: "section", value: "proyectos", label: "Proyectos", icon: Briefcase, id: "proyectos" },
  { kind: "section", value: "sobre-mi", label: "Sobre mí", icon: User, id: "sobre-mi" },
  { kind: "section", value: "open-source", label: "Código abierto", icon: FolderGit2, id: "open-source" },
  { kind: "section", value: "stack", label: "Stack y herramientas", icon: Layers, id: "stack" },
  { kind: "section", value: "experiencia", label: "Experiencia y educación", icon: Code2, id: "experiencia" },
  { kind: "section", value: "contacto", label: "Contacto", icon: Mail, id: "contacto" },
];

const links: Command[] = [
  { kind: "link", value: "github", label: "GitHub", icon: GitHubIcon, href: siteConfig.links.github },
  { kind: "link", value: "linkedin", label: "LinkedIn", icon: LinkedInIcon, href: siteConfig.links.linkedin },
  { kind: "link", value: "email", label: "Enviar correo", icon: Mail, href: `mailto:${siteConfig.email}` },
  ...projects
    .filter((project) => project.liveUrl)
    .map<Command>((project) => ({
      kind: "link",
      value: `project-${project.title}`,
      label: `Abrir ${project.title}`,
      icon: ExternalLink,
      href: project.liveUrl!,
    })),
];

const noopSubscribe = () => () => {};

function useIsMac() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => false,
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  // Section jumps wait until the dialog has closed, otherwise releasing the
  // scroll lock would restore the old scroll position over the jump.
  const pendingSection = useRef<string | null>(null);
  const shortcutsId = useId();
  const isMac = useIsMac();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = useMemo<CommandGroup[]>(
    () => [
      { value: "Navegar", items: sections },
      {
        value: "Acciones",
        items: [
          {
            kind: "action",
            value: "theme",
            label: resolvedTheme === "dark" ? "Cambiar tema a claro" : "Cambiar tema a oscuro",
            icon: SunMoon,
            run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
          },
        ],
      },
      { value: "Enlaces", items: links },
    ],
    [resolvedTheme, setTheme],
  );

  function runCommand(command: Command) {
    if (command.kind === "section") {
      pendingSection.current = command.id;
    } else if (command.kind === "link") {
      // Runs inside the click/Enter handler so popup blockers allow it.
      if (command.href.startsWith("mailto:")) {
        window.location.href = command.href;
      } else {
        window.open(command.href, "_blank", "noopener,noreferrer");
      }
    } else {
      command.run();
    }
    setOpen(false);
  }

  function onOpenChangeComplete(isOpen: boolean) {
    if (isOpen || !pendingSection.current) return;
    window.location.hash = pendingSection.current;
    pendingSection.current = null;
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <Dialog.Trigger
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "max-sm:size-8 max-sm:p-0 sm:gap-2 sm:pr-1.5 sm:text-muted-foreground",
        )}
      >
        <Search />
        <span className="sr-only sm:not-sr-only">Buscar…</span>
        <kbd className="hidden h-5 items-center rounded border bg-muted px-1.5 font-mono text-[0.625rem] text-foreground sm:inline-flex">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden px-4 pt-[12vh] pb-4">
          <Dialog.Popup
            aria-label="Paleta de comandos"
            className="relative flex max-h-[min(32rem,calc(100dvh-6rem))] w-full max-w-lg flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl shadow-primary/10 transition-[translate,scale,opacity] duration-150 data-ending-style:-translate-y-2 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <Autocomplete.Root
              open
              inline
              items={groups}
              itemToStringValue={(item: Command) => item.label}
              autoHighlight="always"
              keepHighlight
            >
              <Autocomplete.InputGroup className="flex items-center gap-2 border-b px-3 transition-colors has-focus-visible:border-primary/60">
                <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <Autocomplete.Input
                  aria-label="Buscar comandos"
                  aria-describedby={shortcutsId}
                  placeholder="¿A dónde querés ir?"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground any-pointer-coarse:text-base"
                />
              </Autocomplete.InputGroup>
              <Dialog.Close className="sr-only">Cerrar paleta de comandos</Dialog.Close>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5 [scroll-padding-block:0.375rem]">
                <Autocomplete.Empty>
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    Sin resultados
                  </p>
                </Autocomplete.Empty>
                <Autocomplete.List>
                  {(group: CommandGroup) => (
                    <Autocomplete.Group key={group.value} items={group.items} className="not-last:mb-1.5">
                      <Autocomplete.GroupLabel className="px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
                        {group.value}
                      </Autocomplete.GroupLabel>
                      <Autocomplete.Collection>
                        {(command: Command) => {
                          const Icon = command.icon;
                          return (
                            <Autocomplete.Item
                              key={command.value}
                              value={command}
                              onClick={() => runCommand(command)}
                              className="group flex min-h-10 cursor-default items-center gap-3 rounded-lg px-2.5 text-sm outline-none select-none [scroll-margin-block:0.375rem] data-highlighted:bg-primary/10 data-highlighted:text-foreground data-highlighted:ring-1 data-highlighted:ring-primary/25"
                            >
                              <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground group-data-highlighted:text-primary" />
                              <span className="min-w-0 flex-1 truncate">{command.label}</span>
                              {command.kind === "link" && !command.href.startsWith("mailto:") && (
                                <ExternalLink aria-hidden className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-data-highlighted:opacity-100" />
                              )}
                            </Autocomplete.Item>
                          );
                        }}
                      </Autocomplete.Collection>
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
              </div>

              <div className="flex items-center gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
                <span id={shortcutsId} className="sr-only">
                  Usá las flechas para moverte y Enter para elegir.
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  Moverse
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>Enter</Kbd>
                  Elegir
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <Kbd>Esc</Kbd>
                  Cerrar
                </span>
              </div>
            </Autocomplete.Root>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      aria-hidden
      className="inline-flex h-5 min-w-5 items-center justify-center rounded border bg-muted px-1 font-mono text-[0.625rem]"
    >
      {children}
    </kbd>
  );
}
