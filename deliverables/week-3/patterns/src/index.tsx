import { Tabs } from './Tabs'
// Demo-only styles so the runnable page matches the Week 2 visual treatment.
import './patterns.css'

export default function Demo() {
  return (
    <main className="patterns-demo">
      <section className="patterns-demo__panel" aria-labelledby="patterns-demo-title">
        <h1 id="patterns-demo-title">Compound tabs</h1>
        <Tabs defaultValue="overview">
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
      </section>
    </main>
  )
}
