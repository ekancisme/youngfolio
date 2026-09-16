import { useTypewriter } from "../hooks/useTypewriter";
import { useT } from "../i18n/LanguageProvider";

type Props = { reducedMotion: boolean };

export function TypewriterText({ reducedMotion }: Props) {
  const t = useT();
  const text = t.typewriter;
  const { displayed, done } = useTypewriter({ text, reducedMotion });
  return (
    <p className="typewriter" aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      {!done && <span className="typewriter-cursor" aria-hidden="true" />}
    </p>
  );
}