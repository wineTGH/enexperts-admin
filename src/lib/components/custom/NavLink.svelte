<script lang="ts">
	import { page } from "$app/stores";

    export let href: string;

    $: active = href === $page.url.pathname ? "" : "text-muted-foreground";
</script>

<a class="text-sm font-medium transition-colors hover:text-primary {active}" {href}>
    <slot />
</a>
