<div class="flex flex-col h-screen">
	<main class="w-full h-full flex items-center px-12">
		<slot />
	</main>
	
	
	<footer class="flex justify-between items-baseline p-3 mt-auto">
		<a class="transition-colors text-muted-foreground hover:text-foreground/80 underline" href="https://winet.space/">By Anatoly "wineT" Bogomolov</a>
		<nav class="flex gap-4">
			<a class="transition-colors text-muted-foreground hover:text-foreground/80 underline" href="/about">About</a>
			<a class="transition-colors text-muted-foreground hover:text-foreground/80 underline" href="/legal">Legal</a>
		</nav>
	</footer>

</div>