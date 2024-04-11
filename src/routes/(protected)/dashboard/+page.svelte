<script lang="ts">
    import { Separator } from '$lib/components/ui/separator';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main class="container my-6">
    <header class="flex justify-beetwen items-center">
        <h1 class="font-bold text-2xl">Welcome back, {data.user?.firstName}</h1>
    </header>
    
    <Separator class="my-3" />
</main>
