<template>
  <div id="paper-container"></div>
  <div id="power-input-container">
    <label for="power-input">Power</label>
    <input type="range" id="power-input" min="0" max="4" step="0.1" />
    <output id="power-output" for="power-input"></output>
  </div>
</template>

<script setup lang="ts">
// 1. Imports necessary modules from the JointJS library. dia is the core diagramming module, shapes contains predefined shapes, and util provides utility functions.
import { onMounted, ref, nextTick } from 'vue'
import { dia, shapes, util } from 'jointjs'

// 2. Gets the HTML element with the ID "paper-container", which will hold the JointJS diagram.
const canvasRef = ref<HTMLElement | null>(null)

// 3. Gets the HTML element with the ID "paper-container", which will hold the JointJS diagram
const paperContainerEl = document.getElementById('paper-container')
// Gets the HTML input element with the ID "power-input", likely a slider or input field for controlling the playback rate (power).
const playbackRateEl = document.getElementById('power-input')
// 4. Gets the HTML element with the ID "power-output", which will display the current playback rate.
const playbackRateOutputEl = document.getElementById('power-output')

// 5. Defines constants used in the custom shape's path definition (turbine metrics).
const r = 16
const a = 3
const b = 4
// 6. Defines flags used to trigger updates in the custom element views.
const POWER_FLAG = 'POWER'
const LIGHT_FLAG = 'LIGHT'

// 7. Defines a custom JointJS element class called Generator.
class Generator extends dia.Element {
  // Defines the default attributes for the generator element, including its size, appearance, and custom attributes
  defaults() {
    return {
      ...super.defaults,
      type: 'Generator',
      size: {
        width: 60,
        height: 80
      },
      power: 0,
      attrs: {
        root: {
          magnetSelector: 'body'
        },
        body: {
          width: 'calc(w)',
          height: 'calc(h)',
          stroke: '#7f4439',
          strokeWidth: 2,
          fill: '#945042',
          rx: 5,
          ry: 5
        },
        label: {
          text: 'Generator',
          textAnchor: 'middle',
          textVerticalAnchor: 'top',
          x: 'calc(0.5*w)',
          y: 'calc(h+10)',
          fontSize: '14',
          fontFamily: 'sans-serif',
          fill: '#350100'
        },
        generatorGroup: {
          transform: 'translate(calc(w/2),calc(h/2))',
          event: 'element:power:click',
          cursor: 'pointer'
        },
        generatorBackground: {
          r: 24,
          fill: '#350100',
          stroke: '#a95b4c',
          strokeWidth: 2
        },
        generator: {
          d: `M ${a} ${a} ${b} ${r} -${b} ${r} -${a} ${a} -${r} ${b} -${r} -${b} -${a} -${a} -${b} -${r} ${b} -${r} ${a} -${a} ${r} -${b} ${r} ${b} Z`,
          stroke: '#a95b4c',
          strokeWidth: 2,
          fill: '#c99287'
        }
      }
    }
  }
  // A getter that returns the rounded percentage of the generator's power.
  get power() {
    return Math.round(this.get('power') * 100)
  }
  // Defines the SVG markup for the generator element using JointJS's util.svg template literal.
  preinitialize() {
    this.markup = util.svg/* xml */ `
            <rect @selector="body" />
            <g @selector="generatorGroup">
                <circle @selector="generatorBackground" />
                <path @selector="generator" />
            </g>
            <text @selector="label" />
        `
  }
}

// 8.Defines a custom JointJS element view class called GeneratorView for the Generator element.
const GeneratorView = dia.ElementView.extend({
  // Registers the power attribute for presentation updates.
  presentationAttributes: dia.ElementView.addPresentationAttributes({
    power: [POWER_FLAG]
  }),
  //Sets initial flags for rendering and power updates.
  initFlag: [dia.ElementView.Flags.RENDER, POWER_FLAG],

  powerAnimation: null,
  // Overrides the default confirmUpdate method to handle power updates and trigger the togglePower method.
  confirmUpdate(...args: any[]) {
    let flags = dia.ElementView.prototype.confirmUpdate.call(this, ...args)
    if (this.hasFlag(flags, POWER_FLAG)) {
      this.togglePower()
      flags = this.removeFlag(flags, POWER_FLAG)
    }
    return flags
  },
  // Creates and returns an animation for the generator's spinning effect.
  getSpinAnimation() {
    let { spinAnimation } = this
    if (spinAnimation) return spinAnimation
    const [generatorEl] = this.findBySelector('generator')
    // It's important to use start and end frames to make it work in Safari.
    const keyframes = { transform: ['rotate(0deg)', 'rotate(360deg)'] }
    spinAnimation = generatorEl.animate(keyframes, {
      fill: 'forwards',
      duration: 1000,
      iterations: Infinity
    })
    this.spinAnimation = spinAnimation
    return spinAnimation
  },
  // Sets the playback rate of the spin animation based on the generator's power.
  togglePower() {
    const { model } = this
    const playbackRate = model.get('power')
    this.getSpinAnimation().playbackRate = playbackRate
  }
})

// 9. Defines a custom JointJS element class called Bulb.
class Bulb extends dia.Element {
  // Defines the default attributes for the bulb element, including its size and appearance.
  defaults() {
    return {
      ...super.defaults,
      type: 'Bulb',
      size: {
        width: 28,
        height: 30
      },
      attrs: {
        root: {
          magnetSelector: 'glass'
        },
        cap1: {
          y: 'calc(h + 1)',
          x: 'calc(w / 2 - 6)',
          width: 12
        },
        cap2: {
          y: 'calc(h + 5)',
          x: 'calc(w / 2 - 5)',
          width: 10
        },
        cap: {
          fill: '#350100',
          height: 3
        },
        glass: {
          fill: '#f1f5f7',
          stroke: '#659db3',
          refD: 'M 14.01 0 C 3.23 0.01 -3.49 11.68 1.91 21.01 C 2.93 22.78 4.33 24.31 6.01 25.48 L 6.01 32 L 22.01 32 L 22.01 25.48 C 30.85 19.31 29.69 5.89 19.93 1.32 C 18.08 0.45 16.06 0 14.01 0 Z'
        },
        label: {
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          x: 'calc(w / 2)',
          y: 'calc(h / 2)',
          fontSize: 7,
          fontFamily: 'sans-serif',
          fill: '#350100'
        }
      }
    }
  }
  //  Defines the SVG markup for the bulb element.
  preinitialize() {
    this.markup = util.svg/* xml */ `
            <rect @selector="cap1" @group-selector="cap"/>
            <rect @selector="cap2" @group-selector="cap"/>
            <path @selector="glass"/>
            <text @selector="label" />
        `
  }
  // A static method to create a new bulb instance with a specified wattage.
  static create(watts = 100) {
    return new this({
      watts: watts,
      attrs: {
        label: {
          text: `${watts} W`
        }
      }
    })
  }
}
// 11. Defines a custom JointJS link class called Wire.
class Wire extends dia.Link {
  defaults() {
    return {
      ...super.defaults,
      type: 'Wire',
      z: -1,
      attrs: {
        line: {
          connection: true,
          stroke: '#346f83',
          strokeWidth: 2,
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        },
        outline: {
          connection: true,
          stroke: '#004456',
          strokeWidth: 4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        }
      }
    }
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
            <path @selector="outline" fill="none"/>
            <path @selector="line" fill="none"/>
        `
  }
}

// 20. Creates a new generator element instance.
const generator = new Generator({
  position: { x: 50, y: 50 }
})

onMounted(() => {
  nextTick(() => {
    if (canvasRef.value) {
      // 10. Defines a custom JointJS element view class called BulbView for the Bulb element.
      const BulbView = dia.ElementView.extend({
        presentationAttributes: dia.ElementView.addPresentationAttributes({
          light: [LIGHT_FLAG]
        }),

        initFlag: [dia.ElementView.Flags.RENDER, LIGHT_FLAG],

        spinAnimation: null,

        confirmUpdate(...args: any[]) {
          let flags = dia.ElementView.prototype.confirmUpdate.call(this, ...args)
          if (this.hasFlag(flags, LIGHT_FLAG)) {
            this.toggleLight()
            flags = this.removeFlag(flags, LIGHT_FLAG)
          }
          return flags
        },

        getGlassAnimation() {
          let { glassAnimation } = this
          if (glassAnimation) return glassAnimation
          const [glassEl] = this.findBySelector('glass')
          const keyframes = {
            stroke: ['#edbc26'],
            fill: ['#f5e5b7'],
            strokeWidth: [2]
          }
          glassAnimation = glassEl.animate(keyframes, {
            fill: 'forwards',
            duration: 500,
            iterations: 1
          })
          this.glassAnimation = glassAnimation
          return glassAnimation
        },

        toggleLight() {
          const { model } = this
          const state = model.get('light') ? 1 : -1
          this.getGlassAnimation().playbackRate = state
        }
      })

      // 12. Defines a custom JointJS highlighter view class called StatusEffect that adds a status circle to the generator.
      const StatusEffect = dia.HighlighterView.extend({
        UPDATE_ATTRIBUTES: ['power'],
        tagName: 'circle',
        attributes: {
          r: 5,
          stroke: 'white',
          event: 'element:power:click',
          cursor: 'pointer'
        },
        highlight: function (cellView: any) {
          const { vel } = this
          const { model } = cellView
          const { width, height } = model.size()
          const power = model.get('power')
          vel.attr('fill', power === 0 ? '#ed4912' : '#65b374')
          vel.attr('cx', width - 10)
          vel.attr('cy', height - 10)
        }
      })

      // 13. Defines a custom JointJS highlighter view class called PlaybackRateEffect that adds a playback rate text to the generator.
      const PlaybackRateEffect = dia.HighlighterView.extend({
        UPDATE_ATTRIBUTES: ['power'],
        tagName: 'text',
        attributes: {
          r: 5,
          fill: 'white',
          'font-size': 7,
          'font-family': 'sans-serif',
          'text-anchor': 'end'
        },
        highlight: function (cellView: any) {
          const { vel } = this
          const { model } = cellView
          const { width, height } = model.size()
          const { power } = model
          let text
          switch (power) {
            case 0:
              text = 'Off'
              break
            case 100:
              text = 'On'
              break
            case 400:
              text = 'Max'
              break
            default:
              text = `${power} %`
          }
          vel.attr('x', width - 18)
          vel.attr('y', height - 5)
          vel.text(text, { textVerticalAnchor: 'bottom' })
        }
      })

      // 14. Creates a namespace object that includes the custom elements and views.
      const namespace = { ...shapes, Generator, GeneratorView, Bulb, BulbView, Wire }

      // 15. Creates a new JointJS graph instance.
      const graph = new dia.Graph(
        {},
        {
          cellNamespace: namespace
        }
      )

      // 16. Creates a new JointJS paper instance, which renders the graph onto the "paper-container" element.
      const paper = new dia.Paper({
        model: graph,
        width: '100%',
        height: '100%',
        async: true,
        sorting: dia.Paper.sorting.APPROX,
        background: { color: '#F3F7F6' },
        interactive: {
          linkMove: false
        },
        cellViewNamespace: namespace,
        defaultAnchor: {
          name: 'perpendicular'
        },
        defaultConnectionPoint: {
          name: 'anchor'
        }
      })

      // 17. Appends the paper's DOM element to the container.
      // check for the null values
      if (paperContainerEl) {
        paperContainerEl.appendChild(paper.el)
      }

      // 18. Adds an event listener for clicks on the generator's power element.
      paper.on('element:power:click', ({ model }, evt) => {
        evt.stopPropagation()
        const playbackRate = model.get('power') ? 0 : 1
        setPlaybackRate(playbackRate)
      })

      // 19. Adds an event listener for changes to the playback rate input.
      // check for the null values
      if (playbackRateEl) {
        playbackRateEl.addEventListener('input', ({ target }) => {
          if (target) {
            const playbackRate = parseFloat(target.value)
            setPlaybackRate(playbackRate)
          }
        })
      }

      // 22. Creates two bulb element instances.
      const bulb1 = Bulb.create(100).position(150, 45)
      const bulb2 = Bulb.create(40).position(150, 105)

      // 23. Creates two wire link instances.
      const wire1 = new Wire({
        source: { id: generator.id },
        target: { id: bulb1.id }
      })

      const wire2 = new Wire({
        source: { id: generator.id },
        target: { id: bulb2.id }
      })

      // 24. Adds the elements and links to the graph.
      graph.addCells([generator, bulb1, bulb2, wire1, wire2])

      // 25. Adds the StatusEffect and PlaybackRateEffect highlighters to the generator.
      StatusEffect.add(generator.findView(paper), 'root', 'status')
      PlaybackRateEffect.add(generator.findView(paper), 'root', 'playback-rate')

      // 26. Scales the paper.
      paper.scale(4)
      //27. Sets the initial playback rate.
      setPlaybackRate(1)

      // 28.Adds an event listener for changes to the generator's power.
      graph.on('change:power', (el) => toggleLights(graph, el))

      // 30. toggleLights(graph, generator);
      toggleLights(graph, generator)
    }
  })
})

// 21. A function to set the generator's power and update the UI.
function setPlaybackRate(playbackRate: number) {
  generator.set('power', playbackRate)
  if (playbackRateEl) {
    playbackRateEl.value = playbackRate
  }

  if (playbackRateOutputEl) {
    playbackRateOutputEl.value = `${playbackRate} x`
  }


// 29. A function to update the bulb's light state based on the generator's power.
function toggleLights(graph: dia.Graph, el: dia.Element) {
  graph.getNeighbors(el, { outbound: true }).forEach((bulb) => {
    bulb.set('light', el.power >= bulb.get('watts'))
  })
}
}
</script>

<style scoped>
#paper-container {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: scroll;
}

#power-input-container {
  position: relative;
  font-family: sans-serif;
  font-size: 20px;
  border: 0px solid lightgray;
  background: white;
  padding: 0px 0px;
  border-radius: 1px;

  output {
    display: inline-block;
    width: 50px;
    text-align: right;
  }
}
/* #logo {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  padding: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
} */
</style>
