<script setup>
const props = defineProps({
  data: String,
});

function get_plate_size() {
  var plate_size;
  var slots = props.data.split(' ').length;
  slots == 8 ? (plate_size = '4x2') : null;
  slots == 10 ? (plate_size = '5x2') : null;
  slots == 15 ? (plate_size = '5x3') : null;

  return plate_size;
}
</script>

<template>
  <div class="plate" :data-plate-size="get_plate_size()">
    <div class="plate_layout">
      <div class="plate_slot" v-for="color in props.data.split(' ')" :data-plate-slot="color">
        <div class="head">
          <div class="nozzles">
            <div class="nozzle"></div>
            <div class="nozzle"></div>
            <div class="nozzle"></div>
            <div class="nozzle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.plate {
  --cyan: #0096e0;
  --cyan-light: #63cbff;
  --magenta: #ff0095;
  --magenta-light: #ff89ce;
  --yellow: #eeff2e;
  --black: #3d3d3d;
  --white: #d7d7d7;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  max-height: 192px;
  aspect-ratio: 16/9;
  margin: 8px 0;
}

.plate_layout {
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

.plate_slot {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 4x2 */
[data-plate-size='4x2'] {
  .plate_slot {
    height: 100%;
    padding-bottom: 32px;
    &:nth-child(2n) {
      padding-bottom: unset;
      padding-top: 32px;
    }
  }
}

/* 5x2 */
[data-plate-size='5x2'] {
  .plate_slot {
    height: 100%;
    padding-bottom: 32px;
    &:nth-child(2n) {
      padding-bottom: unset;
      padding-top: 32px;
    }
  }
}

/* 5x3 */
[data-plate-size='5x3'] {
  .plate_layout {
    flex-direction: column;
    .plate_slot {
      height: 50%;
      &:nth-child(3n - 2) {
        height: calc(50% + 2px);
      }
    }
  }
}

/* Head */
.head {
  display: flex;
  border: 1px solid #d1d1d1;
  background: white;
  width: 80%;
  height: 90%;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 20%;
  border-radius: 4px;
}

.nozzles {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  * {
    display: block;
    width: 1px;
    height: 100%;
  }
}

/* Head Colors */
[data-plate-slot='E'] {
  .head {
    border: 1px solid #d1d1d1;
    background: transparent;
  }
  .nozzle {
    background: none;
  }
}
[data-plate-slot='W'] {
  .nozzle {
    background: var(--white);
  }
}
[data-plate-slot='CB'] {
  .nozzle {
    background: var(--cyan);
    &:nth-last-child(-n + 2) {
      background: var(--black);
    }
  }
}
[data-plate-slot='BC'] {
  .nozzle {
    background: var(--black);
    &:nth-last-child(-n + 2) {
      background: var(--cyan);
    }
  }
}
[data-plate-slot='YM'] {
  .nozzle {
    background: var(--yellow);
    &:nth-last-child(-n + 2) {
      background: var(--magenta);
    }
  }
}
[data-plate-slot='MY'] {
  .nozzle {
    background: var(--magenta);
    &:nth-last-child(-n + 2) {
      background: var(--yellow);
    }
  }
}
[data-plate-slot='LCLM'] {
  .nozzle {
    background: var(--cyan-light);
    &:nth-last-child(-n + 2) {
      background: var(--magenta-light);
    }
  }
}
</style>
