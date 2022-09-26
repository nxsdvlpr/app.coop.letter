<template>
  <div class="n-icon">
    <NIconHome v-if="icon === 'home'" />
    <NIconBag v-else-if="icon === 'bag'" />
    <NIconTruck v-else-if="icon === 'truck'" />
    <NIconScan v-else-if="icon === 'scan'" />
    <NIconCategory v-else-if="icon === 'category'" />
    <NIconUsers v-else-if="icon === 'users'" />
    <NIconChart v-else-if="icon === 'chart'" />
    <NIconSetting v-else-if="icon === 'setting'" />
    <NIconSearch v-else-if="icon === 'search'" />
    <NIconNotification v-else-if="icon === 'notification'" />
    <NIconLogout v-else-if="icon === 'logout'" />
    <NIconMenu v-else-if="icon === 'menu'" />
    <NIconClose v-else-if="icon === 'close'" />
    <NIconDownload v-else-if="icon === 'download'" />
    <NIconDelete v-else-if="icon === 'delete'" />
    <NIconMore v-else-if="icon === 'more'" />
    <NIconChat v-else-if="icon === 'chat'" />
    <NIconAdd v-else-if="icon === 'add'" />
    <NIconCalendar v-else-if="icon === 'calendar'" />
    <NIconDone v-else-if="icon === 'done'" />
    <NIconEdit v-else-if="icon === 'edit'" />
    <NIconFail v-else-if="icon === 'fail'" />
    <NIconFilter v-else-if="icon === 'filter'" />
    <NIconHide v-else-if="icon === 'hide'" />
    <NIconImage v-else-if="icon === 'image'" />
    <NIconLocation v-else-if="icon === 'location'" />
    <NIconMoreCircle v-else-if="icon === 'more-circle'" />
    <NIconMoreSquare v-else-if="icon === 'more-square'" />
    <NIconArrowDown v-else-if="icon === 'arrow-down'" />
    <NIconArrowDown2 v-else-if="icon === 'arrow-down-2'" />
    <NIconArrowDown3 v-else-if="icon === 'arrow-down-3'" />
    <NIconArrowDownCircle v-else-if="icon === 'arrow-down-circle'" />
    <NIconArrowDownSquare v-else-if="icon === 'arrow-down-square'" />
    <NIconArrowRight v-else-if="icon === 'arrow-right'" />
    <NIconArrowRight2 v-else-if="icon === 'arrow-right-2'" />
    <NIconArrowRight3 v-else-if="icon === 'arrow-right-3'" />
    <NIconArrowRightCircle v-else-if="icon === 'arrow-right-circle'" />
    <NIconArrowRightSquare v-else-if="icon === 'arrow-right-square'" />
    <NIconArrowUp v-else-if="icon === 'arrow-up'" />
    <NIconArrowUp2 v-else-if="icon === 'arrow-up-2'" />
    <NIconArrowUp3 v-else-if="icon === 'arrow-up-3'" />
    <NIconArrowUpCircle v-else-if="icon === 'arrow-up-circle'" />
    <NIconArrowUpSquare v-else-if="icon === 'arrow-up-square'" />
    <NIconArrowLeft v-else-if="icon === 'arrow-left'" />
    <NIconArrowLeft2 v-else-if="icon === 'arrow-left-2'" />
    <NIconArrowLeft3 v-else-if="icon === 'arrow-left-3'" />
    <NIconArrowLeftCircle v-else-if="icon === 'arrow-left-circle'" />
    <NIconArrowLeftSquare v-else-if="icon === 'arrow-left-square'" />
    <NIconShow v-else-if="icon === 'show'" />
    <NIconSwap v-else-if="icon === 'swap'" />
    <NIconTick v-else-if="icon === 'tick'" />
    <NIconUpload v-else-if="icon === 'upload'" />
    <NIconPaper v-else-if="icon === 'paper'" />
    <NIconMoney v-else-if="icon === 'money'" />
    <NIconFolder v-else-if="icon === 'folder'" />
    <NIconWallet v-else-if="icon === 'wallet'" />
    <NIconGraph v-else-if="icon === 'graph'" />
    <NIconBookmark v-else-if="icon === 'bookmark'" />
    <NIconHeart v-else-if="icon === 'heart'" />
    <NIconPaperNegative v-else-if="icon === 'paper-negative'" />
    <NIconPaperFail v-else-if="icon === 'paper-fail'" />
    <NIconPaperDownload v-else-if="icon === 'paper-download'" />
    <NIconPaperUpload v-else-if="icon === 'paper-upload'" />
    <NIconSend v-else-if="icon === 'send'" />
    <NIconPassword v-else-if="icon === 'password'" />
    <NIconWork v-else-if="icon === 'work'" />
    <NIconActivity v-else-if="icon === 'activity'" />
    <NIconMessage v-else-if="icon === 'message'" />
    <NIconVideo v-else-if="icon === 'video'" />
    <NIconPlus v-else-if="icon === 'plus'" />
    <NIconGame v-else-if="icon === 'game'" />
    <NIconBag3 v-else-if="icon === 'bag-3'" />
    <NIconTicketStar v-else-if="icon === 'ticket-star'" />
    <NIconDiscount v-else-if="icon === 'discount'" />
    <NIconBuy v-else-if="icon === 'buy'" />
    <NIconInfoCircle v-else-if="icon === 'info-circle'" />
    <NIconInfoSquare v-else-if="icon === 'info-square'" />
    <NIconDanger v-else-if="icon === 'danger'" />
    <NIconDiscovery v-else-if="icon === 'discovery'" />
    <NIconDocument v-else-if="icon === 'document'" />
    <NIconTimeSquare v-else-if="icon === 'time-square'" />
    <NIconTimeCircle v-else-if="icon === 'time-circle'" />
    <NIconVolumeUp v-else-if="icon === 'volume-up'" />
    <NIconVolumeDown v-else-if="icon === 'volume-down'" />
    <NIconVolumeOff v-else-if="icon === 'volume-off'" />
    <NIconStar v-else-if="icon === 'star'" />
    <NIconTicket v-else-if="icon === 'ticket'" />
    <NIconCamera v-else-if="icon === 'camera'" />
    <NIconProfile v-else-if="icon === 'profile'" />
    <NIconAddUser v-else-if="icon === 'add-user'" />
    <NIconUsers2 v-else-if="icon === 'users-2'" />
    <NIconLogin v-else-if="icon === 'login'" />
    <NIconVoice v-else-if="icon === 'voice'" />
    <NIconVoice3 v-else-if="icon === 'voice-3'" />
    <NIconEditSquare v-else-if="icon === 'edit-square'" />
    <NIconPlay v-else-if="icon === 'play'" />
    <NIconFilter3 v-else-if="icon === 'filter-3'" />
    <NIconImage3 v-else-if="icon === 'image-3'" />
    <NIconCall v-else-if="icon === 'call'" />
    <NIconCalling v-else-if="icon === 'calling'" />
    <NIconCallMissed v-else-if="icon === 'call-missed'" />
    <NIconCallSilent v-else-if="icon === 'call-silent'" />
    <NIconLock v-else-if="icon === 'lock'" />
    <NIconUnlock v-else-if="icon === 'unlock'" />
    <NIconWhatsapp v-else-if="icon === 'whatsapp'" />
    <NIconLine v-else-if="icon === 'line'" />
    <NIconTelegram v-else-if="icon === 'telegram'" />
    <NIconFacebook v-else-if="icon === 'facebook'" />
    <NIconDoubleCheckmark v-else-if="icon === 'double-checkmark'" />
    <NIconCheckmark v-else-if="icon === 'checkmark'" />
  </div>
</template>

<script>
export default {
  name: 'NIcon',
  props: {
    icon: {
      type: String,
      default: 'home',
    },
  },
}
</script>

<style scoped>
/* Todo:
Translate Tailwind with and height for better size proportion
on responsive
*/
.n-icon {
  @apply inline-flex;
  @apply items-center;
  @apply justify-center;

  svg {
    @apply w-full;
    @aookt h-full;
  }

  /* Size */
  @apply w-6;
  @apply h-6;

  &.xs {
    @apply w-4;
    @apply h-4;
  }

  &.sm {
    @apply w-5;
    @apply h-5;
  }

  &.md {
    @apply w-6;
    @apply h-6;
  }

  &.lg {
    @apply w-7;
    @apply h-7;
  }

  &.xl {
    @apply w-9;
    @apply h-9;
  }

  &.xxl {
    @apply w-12;
    @apply h-12;
  }
}
</style>
