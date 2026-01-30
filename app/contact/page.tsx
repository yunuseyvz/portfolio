import BlurFade from "../../components/ui/blur-fade-nojs";
import { DATA } from "../../data/resume";
import Link from "next/link";
import { Icons } from "../../components/icons";
import { Badge } from "../../components/ui/badge";

const BLUR_FADE_DELAY = 0.04;

export default function Contact() {
  const { email, tel, social } = DATA.contact;

  return (
    <main className="flex flex-col min-h-[60vh] justify-center">
      <section id="contact">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
                Contact
              </div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[500px] text-muted-foreground font-body text-lg leading-relaxed">
                You can find me via the following channels.
              </p>
              <div className="flex justify-center gap-6 pt-4">
                {Object.values(social).map((socialItem, id) => (
                  <BlurFade
                    key={socialItem.name}
                    delay={BLUR_FADE_DELAY * 3 + id * 0.05}
                  >
                    <Link 
                      key={socialItem.name} 
                      href={socialItem.url} 
                      className="social-icon group relative p-3 rounded-full bg-secondary/50 hover:bg-accent/10 hover:text-accent transition-all duration-300"
                    >
                      <socialItem.icon className="size-6" />
                    </Link>
                  </BlurFade>
                ))}
                <BlurFade delay={BLUR_FADE_DELAY * 4}>
                  <a 
                    href={`mailto:${email}`} 
                    className="social-icon group relative p-3 rounded-full bg-secondary/50 hover:bg-accent/10 hover:text-accent transition-all duration-300"
                  >
                    <Icons.email className="size-6" />
                  </a>
                </BlurFade>
              </div>
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <div className="flex justify-center gap-3 pt-8">
                  <Link href="/impressum" passHref>
                    <Badge variant="outline" className="text-xs px-4 py-2">
                      Impressum
                    </Badge>
                  </Link>
                  <Link href="/datenschutz" passHref>
                    <Badge variant="outline" className="text-xs px-4 py-2">
                      Datenschutz
                    </Badge>
                  </Link>
                </div>
              </BlurFade>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}