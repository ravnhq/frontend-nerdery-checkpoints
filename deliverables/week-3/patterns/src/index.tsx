import { Tabs } from './Tabs'
import styles from './tabs.module.css'

export default function Demo() {
  return (
    <main className={styles.demo}>
      <h1 className={styles.title}>W3 · Patterns — Compound Tabs</h1>
      <Tabs defaultValue="overview">
        <Tabs.List className={styles.tablist}>
          <Tabs.Tab value="overview" className={styles.tab}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="specs" className={styles.tab}>
            Specs
          </Tabs.Tab>
          <Tabs.Tab value="reviews" className={styles.tab}>
            Reviews
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview" className={styles.panel}>
          <p>A compound component composed without prop drilling.</p>
        </Tabs.Panel>
        <Tabs.Panel value="specs" className={styles.panel}>
          <p>Active tab state lives in React context, shared by sub-components.</p>
        </Tabs.Panel>
        <Tabs.Panel value="reviews" className={styles.panel}>
          <p>Consumers just compose Tabs.List / Tabs.Tab / Tabs.Panel.</p>
        </Tabs.Panel>
      </Tabs>
    </main>
  )
}
