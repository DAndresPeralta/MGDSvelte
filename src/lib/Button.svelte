<script>
  import { Button } from "carbon-components-svelte";
  export let title;
  export let type;
</script>

<Button {type} kind="tertiary">{title}</Button>
