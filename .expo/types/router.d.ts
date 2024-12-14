/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/DashboardScreen`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/SettingsScreen`; params?: Router.UnknownInputParams; } | { pathname: `/SignUpScreen`; params?: Router.UnknownInputParams; } | { pathname: `/TransactionScreen`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/DashboardScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/LoginScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/SettingsScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/SignUpScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/TransactionScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/DashboardScreen${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/LoginScreen${`?${string}` | `#${string}` | ''}` | `/SettingsScreen${`?${string}` | `#${string}` | ''}` | `/SignUpScreen${`?${string}` | `#${string}` | ''}` | `/TransactionScreen${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/DashboardScreen`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/SettingsScreen`; params?: Router.UnknownInputParams; } | { pathname: `/SignUpScreen`; params?: Router.UnknownInputParams; } | { pathname: `/TransactionScreen`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
