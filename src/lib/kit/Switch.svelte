<script lang="ts">
    let {
        isOn = false,
        onToggle = ()=>{}
    } = $props();
</script>
  
<!-- svelte-ignore a11y_consider_explicit_label -->
<button class="switch" onclick={(e)=>{onToggle(e)}} class:is-on={isOn}>
    <div class="toggle">
        <div class:is-on={isOn} class="circle"></div>
        <svg class="onIcon" class:is-on={isOn} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5.5V10.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg class="offIcon" class:is-on={isOn} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="2.5" stroke="white" stroke-width="1.5"/>
        </svg>            
    </div>
</button>
  
<style lang="scss">
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

    svg{
        transition: 0.25s;
    }
    .offIcon{
        right: -16px;
        &.is-on{
            right: 0;
        }
    }
    .onIcon{
        position: absolute;
        left: -16px;
        &.is-on{
            left: 0px;
        }
    }

    .switch {
        overflow: hidden;
        position: relative;
        width: 32px;
        height: 16px;
        background-color: c.$clickable;
        border-radius: 15px;
        border: 1px solid c.$text-25;
        display: flex;
        align-items: center;
        padding: 2px;
        cursor: pointer;
        transition: background-color 0.25s;
    
        &.is-on {
            background-color: c.$accent;
        }
  
        .toggle {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 28px;
            height: 12px;
            transition: justify-content 0.25s;
                
            .circle {
                width: 12px;
                height: 12px;
                background-color: white;
                border-radius: 50%;
                transition: transform 0.25s;

                &.is-on {
                    transform: translateX(16px);
                }
            }
        }
    }
  </style>