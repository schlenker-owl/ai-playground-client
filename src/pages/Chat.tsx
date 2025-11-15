import { useState } from 'react';
import Card from '../components/Card';
import MarkdownBox from '../components/MarkdownBox';
import { api } from '../lib/api';

export default function Chat() {
  const [user, setUser] = useState("Offer three morning affirmations to start the day aligned.");
  const [system, setSystem] = useState("You are a compassionate, practical spiritual coach. Be concise, kind, and useful.");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    try {
      const res = await api.chat(user, system, { temperature: 0.2, max_new_tokens: 160 });
      setAnswer(res.answer);
    } catch (e:any) {
      setAnswer(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Prompt">
        <label className="block text-sm text-[#9aa3ab]">System</label>
        <textarea className="w-full h-24 rounded-lg bg-muted p-3 outline-none" value={system} onChange={e=>setSystem(e.target.value)} />
        <label className="block text-sm text-[#9aa3ab] mt-3">User</label>
        <textarea className="w-full h-40 rounded-lg bg-muted p-3 outline-none" value={user} onChange={e=>setUser(e.target.value)} />
        <button onClick={send} disabled={loading} className="mt-4 px-4 py-2 rounded-lg bg-accent text-black font-medium">
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </Card>
      <Card title="Answer">
        <MarkdownBox text={answer} />
      </Card>
    </div>
  );
}
