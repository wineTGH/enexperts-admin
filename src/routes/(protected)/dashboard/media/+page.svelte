<script lang="ts">
	import { superForm, fileProxy } from 'sveltekit-superforms';
    import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { imageMimeTypes, mediaUploadSchema, videoMimeTypes } from './schema';
    
    export let data: PageData;

    const {form, errors, enhance} = superForm(data.form, {
        validators: zodClient(mediaUploadSchema)
    });

    const file = fileProxy(form, 'media');
    const acceptedMimeTypes = [...imageMimeTypes, ...videoMimeTypes].join(",")
</script>

<form method="post" action="?/uploadMedia" enctype="multipart/form-data" use:enhance>
    <input type="file" name="media" bind:files={$file} accept={acceptedMimeTypes}>
    <button type="submit">Submit</button>
</form>