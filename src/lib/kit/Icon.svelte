<script lang="ts">
    let {name = "-0"} = $props()

    const loadIcon = (iconName: string) => {
        const icons = import.meta.glob('../icons/**/*.svg', { eager: true, as: 'raw' });
        return icons[`../icons/${iconName}.svg`]
    };
</script>

{@html loadIcon(name)}