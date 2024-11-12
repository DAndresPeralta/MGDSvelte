<script>
  import { ToastNotification } from "carbon-components-svelte";
  import { fade } from "svelte/transition";

  export let title;
  export let kind;

  let timeout = 3000;
  let showNotification = true;

  const closeNotify = () => {
    showNotification = false;
  };

  setTimeout(() => {
    closeNotify();
  }, timeout);
</script>

{#if showNotification}
  <div transition:fade>
    <ToastNotification {kind} {title} on:close={closeNotify} />
  </div>
{/if}
