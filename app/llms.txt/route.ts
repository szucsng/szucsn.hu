import { siteConfig } from "@/lib/site";
import { frames } from "@/lib/frames";

export const dynamic = "force-static";

export function GET() {
  const projects = frames
    .map(
      (frame) =>
        `- [${frame.title}](${siteConfig.url}/munkak/${frame.slug}): ${frame.description}`,
    )
    .join("\n");

  const body = `# ${siteConfig.name} — ${siteConfig.role}

> ${siteConfig.tagline}

${siteConfig.name} (${siteConfig.role}) ${siteConfig.location} városából. A weboldal
portfólió: webes rendszerfejlesztési munkák és fotósorozatok egy helyen.

## Fő oldalak

- [Kezdőlap](${siteConfig.url}/): kiemelt munkák, rövid bemutatkozás, szolgáltatások és kapcsolat.
- [Rólam](${siteConfig.url}/rolam): bemutatkozás.
- [Szolgáltatások](${siteConfig.url}/szolgaltatasok): fejlesztés, fotózás, UI/UX és projektvezetés.
- [Munkáim](${siteConfig.url}/munkak): a teljes projekt- és fotóarchívum.

## Projektek és fotósorozatok

${projects}

## Kapcsolat

- E-mail: ${siteConfig.email}
- Helyszín: ${siteConfig.location}
- GitHub: ${siteConfig.social.find((item) => item.label === "GITHUB")?.href ?? ""}
- Instagram: ${siteConfig.social.find((item) => item.label === "INSTAGRAM")?.href ?? ""}

## Megjegyzés

A weboldalon nincs felhasználói fiók, admin felület vagy privát tartalom.
Az oldal nyilvános tartalma szabadon olvasható és indexelhető.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
