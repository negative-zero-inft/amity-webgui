<script lang="ts">
    let {iconName = "star"} = $props();

    const loadIcon = (iconName: string) => {
        const icons = import.meta.glob('../miniicons/**/*.svg', { eager: true, query: '?url' });
        console.log(icons);
        return icons[`../miniicons/${iconName}.svg`]
    };
</script>

<img src={loadIcon(iconName) as string} alt="#">

<style lang="scss">
</style>

<!-- u won't know next when this will be used again-->