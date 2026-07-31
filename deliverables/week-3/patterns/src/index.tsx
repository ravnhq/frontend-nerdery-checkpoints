import { InteractiveGridPattern } from './components/magicui/interactive-grid-pattern'
import { MagicCard } from './components/magicui/magic-card'
import { Tabs } from './Tabs'
import './patterns.css'

export default function Demo() {
  return (
    <main className="patterns-demo relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-100">
      <InteractiveGridPattern
        aria-hidden="true"
        className="z-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        width={36}
        height={36}
        squares={[42, 30]}
        squaresClassName="stroke-sky-300/30 hover:fill-fuchsia-400/40"
      />

      <section className="patterns-demo__content relative z-10 w-full max-w-3xl">
        <p className="patterns-demo__eyebrow">W3 · Patterns</p>
        <h1>Compound Tabs</h1>

        <MagicCard
          mode="orb"
          className="rounded-3xl shadow-2xl shadow-cyan-950/60"
          glowFrom="#22d3ee"
          glowTo="#d946ef"
          glowSize={480}
          glowBlur={72}
          glowOpacity={0.9}
        >
          <div className="patterns-demo__card-content rounded-[inherit] border border-white/10 bg-slate-950/90 backdrop-blur-xl">
            <Tabs defaultValue="overview" keepPanelsMounted>
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="specs">Specs</Tabs.Tab>
                <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview">
                <p>A compound component composed without prop drilling.</p>
              </Tabs.Panel>
              <Tabs.Panel value="specs">
                <p>Active tab state lives in React context, shared by sub-components.</p>
              </Tabs.Panel>
              <Tabs.Panel value="reviews">
                <p>Consumers just compose Tabs.List / Tabs.Tab / Tabs.Panel.</p>
              </Tabs.Panel>
            </Tabs>
          </div>
        </MagicCard>
      </section>
    </main>
  )
}
