<script lang="ts">
	import type { PageData } from "../dashboard/$types";

    export let data: PageData;
</script>

<h1>me</h1>
<p>{data.user?.email}</p>