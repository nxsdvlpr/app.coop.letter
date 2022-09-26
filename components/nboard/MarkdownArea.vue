<template>
  <v-md-editor
    v-bind="{ ...$props, ...$attrs }"
    left-toolbar="h bold italic strikethrough quote | ul ol hr | link"
    right-toolbar="preview fullscreen"
    v-on="$listeners"
  />
</template>

<script>
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import Prism from "prismjs";
import "prismjs/components/prism-json";

import enUS from "@kangc/v-md-editor/lib/lang/en-US";

VueMarkdownEditor.lang.use("en-US", enUS);

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

export default {
  name: "NMarkdownArea",
  components: { "v-md-editor": VueMarkdownEditor },
  inheritAttrs: false,
};
</script>

<style>
.v-md-editor {
  @apply rounded !important;
  @apply outline-none !important;
  @apply border !important;
  @apply border-gray-light !important;
  box-shadow: unset !important;

  .v-md-editor__editor-wrapper {
    textarea {
      @apply ring-0 !important;
    }
  }

  .v-md-editor__preview-wrapper {
    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    figure,
    p,
    pre {
      margin: unset !important;
      margin-bottom: 1em !important;
    }
  }

  .vuepress-markdown-body {
    &:not(.custom) {
      padding: 1.5rem 2rem;
    }

    p a code {
      @apply text-primary;
    }
  }
}
</style>
