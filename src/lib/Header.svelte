<header>
	<div class="logo">
		<!-- <img src="/public/images/Milessima.png" alt="logo"> -->
	</div>
	<h1>Milessima Gestión de Depósitos</h1>
</header>

<style>
	header {
		/*Trabajamos con flexbox nuestro header (Recomendado)*/
		display: flex;
		background-color: #161616;
		/*Alinea lo distintos elementos dentro del header (un <a> con un <ul> por ej.)*/
		align-items: center;
		justify-content: space-between;
		height: 70px;
		/*nuestro header ocupa todo el ancho de la página*/
		width: 100%;
		/*Nos fija el header al hacer scroll*/
		position: fixed;
		z-index: 1000;
		top: 0;
	}

	h1 {
		font-family: 'Wix Madefor Display';
		font-weight: 500;
		color: #e8eaee;
		font-size: 1.5rem;
		margin-right: 1%;
	}
</style>
