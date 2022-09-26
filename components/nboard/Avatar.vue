<template>
  <div class="n-avatar relative inline-block">
    <div class="avatar-image">
      <img
        v-if="imageSource"
        :src="imageSource"
        class="object-cover object-center w-full h-full rounded-full"
      />
      <div v-else>{{ initial }}</div>
      <div
        v-if="computedStatus"
        class="avatar-status"
        :class="{
          online: computedStatus === 'online',
          idle: computedStatus === 'idle',
          away: computedStatus === 'away',
          dont_disturb: computedStatus === 'dont_disturb',
        }"
      ></div>
      <div v-else-if="contactType" class="contact-type">
        <NIcon class="sm text-primary" :icon="contactType" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NAvatar',
  props: {
    status: {
      type: String,
      default: null,
    },
    fullname: {
      type: String,
      default: null,
    },
    contactType: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: null,
    },
  },
  computed: {
    computedContactType() {
      return this.contactType || null
    },
    computedStatus() {
      return this.status || null
    },
    imageSource() {
      if (!this.src) {
        return null
      }
      return this.src
    },
    initial() {
      if (!this.fullname) {
        return 'NA'
      }
      return this.getInitials(this.fullname)
    },
  },
  methods: {
    getInitials(fullname) {
      const name = fullname.trim().split(' ')
      const initials = name.reduce((acc, curr, index) => {
        if (index === 0 || index === name.length - 1) {
          acc = `${acc}${curr.charAt(0).toUpperCase()}`
        }
        return acc
      }, '')

      return initials
    },
  },
}
</script>

<style scoped>
.n-avatar {
  /* Size */
  & .avatar-image {
    @apply relative;
    @apply flex;
    @apply justify-center;
    @apply items-center;
    @apply text-xs;
    @apply font-medium;
    @apply leading-none;
    @apply bg-gray-300;
    @apply text-white;
    @apply w-12;
    @apply h-12;
    @apply rounded-full;

    & .avatar-status {
      @apply absolute;
      @apply right-0;
      @apply bottom-0.5;
      @apply w-2.5;
      @apply h-2.5;
      @apply border;
      @apply border-white;
      @apply bg-gray-500;
      @apply rounded-full;

      &.online {
        @apply bg-green-500;
      }

      &.idle {
        @apply bg-yellow-600;
      }

      &.away {
        @apply bg-gray-400;
      }

      &.dont_disturb {
        @apply bg-red-500;
      }
    }

    & .contact-type {
      @apply absolute;
      @apply -right-1;
      @apply -bottom-1;
    }
  }

  &.xs {
    & .avatar-image {
      @apply w-8;
      @apply h-8;
      font-size: 0.7rem;
      line-height: 1rem;

      & .avatar-status {
        @apply bottom-0;
        @apply w-2;
        @apply h-2;
      }
    }
  }

  &.sm {
    & .avatar-image {
      @apply w-10;
      @apply h-10;
    }
  }

  &.md {
    & .avatar-image {
      @apply w-12;
      @apply h-12;
    }
  }

  &.lg {
    & .avatar-image {
      @apply text-xl;
      @apply w-14;
      @apply h-14;

      & .avatar-status {
        @apply bottom-0.5;
        @apply border-2;
        @apply w-3.5;
        @apply h-3.5;
      }
    }
  }

  &.xl {
    & .avatar-image {
      @apply text-xl;
      @apply w-16;
      @apply h-16;

      & .avatar-status {
        @apply border-2;
        @apply w-4;
        @apply h-4;
      }
    }
  }

  &.xxl {
    & .avatar-image {
      @apply text-xl;
      @apply w-20;
      @apply h-20;

      & .avatar-status {
        @apply border-2;
        @apply w-4;
        @apply h-4;
      }
    }
  }

  &.primary {
    & .avatar-image {
      @apply bg-primary;
    }
  }

  &.secondary {
    & .avatar-image {
      @apply bg-secondary;
    }
  }

  &.info {
    & .avatar-image {
      @apply bg-info;
    }
  }

  &.danger {
    & .avatar-image {
      @apply bg-danger;
    }
  }
}
</style>
