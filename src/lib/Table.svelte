<script>
	import { DataTable, OverflowMenu, OverflowMenuItem, Pagination } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';

	// Array con los campos de la tabla. Este array se inyecta en el componente Table
	const headers = [
		{ key: 'code', value: 'Código' },
		{ key: 'brand', value: 'Marca' },
		{ key: 'product', value: 'Producto' },
		{ key: 'weight', value: 'Peso' },
		{ key: 'stock', value: 'Stock' },
		{ key: 'obs', value: 'Observaciones' },
		{ key: 'overflow', empty: true }
	];

	let products = [];
	let pageSize = 10;
	let page = 1;

	// Funcion asincrona que hace la peticion a la BD
	const product = async (e) => {
		// Hacemos peticion a la BD para traer los productos
		const response = await axios.get('http://localhost:4000/api/product');

		// Se guardan los productos traidos en un array
		products = response.data.payload.result.map((item) => ({
			id: item._id,
			code: item.code,
			brand: item.brand,
			product: item.product,
			weight: item.weight,
			stock: item.stock,
			obs: item.obs
		}));

		// Se modifica el array declarado anteriormente con spread operator para que se actualice en el componente.
		products = [...products];
	};

	const deleteProduct = async (id) => {
		console.log(id);
		const response = await axios.delete(`http://localhost:4000/api/product/${id}`);
		products = products.filter((product) => product.id !== id);
		products = [...products];
		console.log(response);
	};

	// onMount es un ciclo de vida en Svelte que se ejecuta cuando el componente se monta en el DOM, es decir,
	//justo después de que se haya renderizado inicialmente
	onMount(() => {
		product();
	});

	// Para paginar
	$: pagedProducts = products.slice((page - 1) * pageSize, page * pageSize);
</script>

<!-- let:row me permite acceder a cada fila y por ende a los atributos de cada producto -->
<!-- Se define row como una variable local -->
<div class="table-container">
	<DataTable sortable {headers} rows={pagedProducts}>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'overflow'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="Modificar" />
					<OverflowMenuItem danger text="Eliminar" on:click={() => deleteProduct(row.id)} />
				</OverflowMenu>
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
	<Pagination
		bind:page
		bind:pageSize
		totalItems={products.length}
		pageSizeInputDisabled
		on:pageChange={({ detail }) => {
			page = detail.page;
		}}
	/>
</div>

<style>
	.table-container {
		width: 75%;
		height: auto;
	}
</style>
