import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { Icons } from "@/components/icons";

const BLUR_FADE_DELAY = 0.04;

export default function Contact() {
  const { email, tel, social } = DATA.contact;

  return (
    <main className="flex flex-col">
      <section id="contact">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                You can find me via the following channels.
              </p>
              <div className="flex justify-center space-x-4">
                {Object.values(social).map((socialItem, id) => (
                  <BlurFade
                  delay={BLUR_FADE_DELAY * 3 + id * 0.05}
                >
                  <Link key={socialItem.name} href={socialItem.url} className="social-icon">
                    <socialItem.icon className="icon" />
                  </Link>
                </BlurFade>
                ))}
                <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <a href={`mailto:${email}`} className="social-icon">
                  <Icons.email className="icon" />
                </a>
                </BlurFade>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}