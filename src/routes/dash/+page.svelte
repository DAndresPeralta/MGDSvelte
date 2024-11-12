<script context="module">
	import Table from '../../lib/Table.svelte';
	import { mostrarTable } from '../../lib/js/store';
</script>

<main>
	<section>
		<!-- Cuando el valor de mostrarTable sea True, se renderiza -->
		{#if $mostrarTable}
			<Table />
		{/if}
	</section>
</main>

<style>
	main {
		flex: 1;
	}
	section {
		margin-top: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
