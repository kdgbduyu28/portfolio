import type { Project } from './projects';

export type ScreenEntry = Project['data']['screens'][number];
export type Device = Project['data']['device'];

// Status bars for drawn phone screens: [background, text].
const MOCK_BARS: Record<string, [string, string]> = {
  'food-tracking': ['#eef1ec', '#0b0b0c'],
  'food-rider': ['#0c0c0e', '#fafafa'],
  'food-merchant': ['#ffffff', '#0b0b0c'],
  'clinic-patient': ['#fbfaf8', '#0b0b0c'],
  'groundwork-chat': ['#0f0d24', '#eef2ff'],
};

/** Phone status bar [background, text] that blends into the top of a screen. */
export function statusBarFor(screen: ScreenEntry): [string, string] {
  if (screen.mock) return MOCK_BARS[screen.mock] ?? ['#ffffff', '#0b0b0c'];
  return [screen.bar ?? '#ffffff', screen.barText === 'light' ? '#ffffff' : '#0b0b0c'];
}

export const deviceOf = (project: Project, screen: ScreenEntry): Device => screen.device ?? project.data.device;

// Drawn screens that also work at phone size.
const PHONE_MOCKS = new Set(['food-tracking', 'food-rider', 'food-merchant', 'clinic-patient', 'groundwork-chat']);

/** The screen an app opens to on the hero phone. */
export function phoneScreen(project: Project): ScreenEntry | undefined {
  const { screens } = project.data;
  return (
    screens.find((s) => deviceOf(project, s) === 'phone') ?? screens.find((s) => s.mock && PHONE_MOCKS.has(s.mock))
  );
}
