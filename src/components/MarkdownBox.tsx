export default function MarkdownBox({ text }:{ text: string }) {
  // keep simple for MVP (no parser); it still looks great with preformatted text
  return <pre className="whitespace-pre-wrap text-[#dfe7ee]">{text || '—'}</pre>;
}
