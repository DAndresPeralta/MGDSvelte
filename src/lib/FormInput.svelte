<script>
	import { TextInput } from 'carbon-components-svelte';

	export let datos = {};
	export let campos = {};
</script>

<div>
	{#each campos as campo}
		<TextInput id={campo.ket} label={campo.label} bind:value={datos[campo.key]} />
	{/each}
</div>
