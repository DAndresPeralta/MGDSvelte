<script>
	import Table from '../../lib/Table.svelte';
	import FormInput from '../../lib/FormInput.svelte';
	import { mostrarFormularioAgregar, mostrarTable } from '../../lib/js/store';
	import { mostrarFormulario } from '../../lib/js/store';
	import { onMount } from 'svelte';
	import axios from 'axios';

	// VARIABLES ************
	// Para la Table
	export let data;
	let product = [];
	// Variables de estado para el formulario
	let productoSeleccionado = null;

	const lanzarFormulario = (product) => {
		console.log(product);
		productoSeleccionado = product;
		mostrarFormulario.set(true);
	};

	const actualizarProducto = async (formData) => {
		try {
			const response = await axios.put(
				`http://localhost:4000/api/product/${productoSeleccionado.id}`,
				formData,
				{
					withCredentials: true
				}
			);
			mostrarFormulario.set(false);
			productoSeleccionado = null;
		} catch (error) {}
	};

	const agregarProducto = async (formData) => {
		try {
			console.log('ingreso');
			console.log(formData);

			const response = await axios.post(`http://localhost:4000/api/product/`, formData, {
				withCredentials: true
			});
			mostrarFormularioAgregar.set(false);
			mostrarTable.set(true);
		} catch (error) {}
	};

	const cancelarModificacion = () => {
		mostrarFormulario.set(false);
		mostrarFormularioAgregar.set(false);
	};

	// ONMOUNT ************
	// onMount es un ciclo de vida en Svelte que se ejecuta cuando el componente se monta en el DOM, es decir,
	//justo después de que se haya renderizado inicialmente
	onMount(async () => {
		// Hacemos peticion a la BD para traer los productos
		const response = await axios.get('http://localhost:4000/api/product');
		// Se guardan los productos traidos en un array
		product = response.data.payload.result.map((item) => ({
			id: item._id,
			code: item.code,
			brand: item.brand,
			product: item.product,
			weight: item.weight,
			stock: item.stock,
			obs: item.obs
		}));

		// Se modifica el array declarado anteriormente con spread operator para que se actualice en el componente.
		product = [...product];
		console.log(data);
	});
</script>

<main>
	<section>
		{#if $mostrarFormulario}
			<FormInput
				datos={productoSeleccionado}
				campos={[
					{ key: 'code', label: 'Código' },
					{ key: 'product', label: 'Producto' },
					{ key: 'brand', label: 'Marca' },
					{ key: 'weight', label: 'Peso' },
					{ key: 'stock', label: 'Stock' },
					{ key: 'obs', label: 'Observaciones' }
				]}
				on:guardar={(e) => {
					const producto = e.detail;
					actualizarProducto(producto);
				}}
				on:cancelar={cancelarModificacion}
			/>
		{:else if $mostrarTable}
			<Table
				{product}
				on:editarProducto={(e) => {
					const producto = e.detail;
					lanzarFormulario(producto);
				}}
			/>
		{:else if $mostrarFormularioAgregar}
			<FormInput
				campos={[
					{ key: 'code', label: 'Código' },
					{ key: 'product', label: 'Producto' },
					{ key: 'brand', label: 'Marca' },
					{ key: 'weight', label: 'Peso' },
					{ key: 'stock', label: 'Stock' },
					{ key: 'obs', label: 'Observaciones' }
				]}
				on:guardar={(e) => {
					const producto = e.detail;
					agregarProducto(producto);
				}}
				on:cancelar={cancelarModificacion}
			/>
		{/if}

		<!-- Cuando el valor de mostrarTable sea True, se renderiza -->
		<!-- {#if $mostrarTable}
			<Table {product} />
		{/if} -->
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
