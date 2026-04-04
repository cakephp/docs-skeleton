import DefaultTheme from 'vitepress/theme-without-fonts'
import NavBarTitle from "./components/NavBarTitle.vue";
import PageLoader from "./components/PageLoader.vue";
import SimpleAnalyticsBadge from "./components/SimpleAnalyticsBadge.vue";
import VersionBanner from "./components/VersionBanner.vue";
import './custom.css'
import { h } from "vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => [
        h(PageLoader),
        h(VersionBanner),
      ],
      'nav-bar-title-after': () => h(NavBarTitle),
      'aside-outline-after': () => h(SimpleAnalyticsBadge),
    })
  }
}
