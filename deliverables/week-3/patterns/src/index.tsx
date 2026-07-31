import { createTabs } from './Tabs'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import './index.css'

// Its own T instead of the default (plain string) Tabs export: overview /
// tasks / activity is a fixed, known set for this project page, so a typo'd
// value on Tabs.Tab or Tabs.Panel becomes a compile error instead of a
// silent no-op. Its own storage key too, so this instance never collides
// with the default Tabs export's if that one's ever rendered on the same
// page. The values array is what lets a stale localStorage entry (e.g. from
// before a tab was renamed) get rejected instead of trusted.
const ProjectTabs = createTabs<'overview' | 'tasks' | 'activity'>(
  'waypoint-project-tab',
  ['overview', 'tasks', 'activity'] as const,
)

// A second, unrelated instance: its own T (account/privacy has nothing to do
// with overview/tasks/activity) and its own storage key, so it neither
// shares state nor fights over persistence with ProjectTabs above — each
// createTabs() call is a fully independent component + context.
const PreferencesTabs = createTabs<'account' | 'privacy'>(
  'waypoint-preferences-tab',
  ['account', 'privacy'] as const,
)

export default function Demo() {
  return (
    <ThemeProvider>
      <div className="tabs-demo">
        <div className="tabs-demo__inner">
          <header className="tabs-demo__masthead">
            <h1 className="tabs-demo__title">Waypoint</h1>
            <ThemeToggle />
          </header>
          <ProjectTabs defaultValue="overview">
            <ProjectTabs.List aria-label="Project">
              <ProjectTabs.Tab value="overview">Overview</ProjectTabs.Tab>
              <ProjectTabs.Tab value="tasks">Tasks</ProjectTabs.Tab>
              <ProjectTabs.Tab value="activity">Activity</ProjectTabs.Tab>
            </ProjectTabs.List>
            <ProjectTabs.Panel value="overview">
              <p>Redesigning the onboarding flow for new workspace members, targeting a two-week rollout.</p>
            </ProjectTabs.Panel>
            <ProjectTabs.Panel value="tasks">
              <p>6 open, 2 in review — the empty-state illustrations are the last blocker.</p>
            </ProjectTabs.Panel>
            <ProjectTabs.Panel value="activity">
              <p>Priya merged the new onboarding checklist 2 hours ago.</p>
            </ProjectTabs.Panel>
          </ProjectTabs>
          <section className="tabs-demo__section">
            <h2 className="tabs-demo__section-label">Preferences</h2>
            <PreferencesTabs defaultValue="account">
              <PreferencesTabs.List aria-label="Preferences">
                <PreferencesTabs.Tab value="account">Account</PreferencesTabs.Tab>
                <PreferencesTabs.Tab value="privacy">Privacy</PreferencesTabs.Tab>
              </PreferencesTabs.List>
              <PreferencesTabs.Panel value="account">
                <p>Workspace name, timezone, and the email used for notifications.</p>
              </PreferencesTabs.Panel>
              <PreferencesTabs.Panel value="privacy">
                <p>Control who can see your activity and whether your status is shared with the team.</p>
              </PreferencesTabs.Panel>
            </PreferencesTabs>
          </section>
        </div>
      </div>
    </ThemeProvider>
  )
}
