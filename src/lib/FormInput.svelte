<script>
	import { TextInput, Button } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	export let datos = {};
	export let campos = [];

	const dispatch = createEventDispatcher();

	const manejadorGuardado = () => {
		dispatch('guardar', datos);
	};
	const manejadorCancelar = () => {
		dispatch('cancelar');
	};
</script>

<div class="container">
	<div class="input">
		{#each campos as campo}
			<TextInput id={campo.key} labelText={campo.label} bind:value={datos[campo.key]} />
		{/each}
	</div>
	<div class="botones">
		<Button on:click={manejadorCancelar} kind="secondary">Cancelar</Button>
		<Button on:click={manejadorGuardado} kind="primary">Guardar</Button>
	</div>
</div>

<style>
	.container {
		display: flexbox;
		width: 90%; /* Ajusta el ancho del formulario */
		max-width: 1000px; /* Controla el tamaño máximo */
		margin: 0 auto;
		padding: 2rem;
		border-radius: 0;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);
	}
	.botones {
		margin-top: 1.5rem;
	}
</style>
