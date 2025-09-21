import type { Locale } from '@ukhu/i18n';
import { ROUTES, buildRoute, type RouteKey } from '@ukhu/i18n';

export interface NavigationItem {
  key: RouteKey;
  label: string;
  href: string;
}

export function buildNavigation(locale: Locale, labels: Record<RouteKey, string>): NavigationItem[] {
  return (Object.keys(ROUTES) as RouteKey[])
    .filter((key) => key !== 'home')
    .map((key) => ({
      key,
      label: labels[key],
      href: buildRoute(locale, key)
    }));
}
