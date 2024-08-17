import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";

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
                You can reach me on
              </p>
              <div className="flex justify-center space-x-4">
                {Object.values(social).map((socialItem) => (
                  <Link key={socialItem.name} href={socialItem.url}>
                    {socialItem.name}
                  </Link>
                ))}
                <a href={`mailto:${email}`}>
                  Email
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}