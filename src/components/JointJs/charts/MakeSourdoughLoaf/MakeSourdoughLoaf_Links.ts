import * as joint from '@joint/core'
import { MakeSourdoughLoafshapes } from './MakeSourDoughLoaf_Shapes'

const links: { [key: string]: joint.dia.Link } = {}

export function createLinksInChart(graph: joint.dia.Graph): { [key: string]: joint.dia.Link } {
  //links.obj1_obj2 = CreateLink(shapes.obj1, shapes.obj2, 'Link 1', customAttributesOfLink, graph)

  links.start_Container0 = new joint.shapes.standard.Link({
    linkID: 'link1',
    source: { id: MakeSourdoughLoafshapes.start.id },
    target: { id: MakeSourdoughLoafshapes.Container0.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    label: {
      text: 'Link 1',
      fontSize: 14
    },
    router: {
      name: 'manhattan',
      //excludeEnds: ['rhombus2', 'rhombus1'],
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['bottom'],
      endDirections: ['top']
    }
  })

  links.Container0_clock1 = new joint.shapes.standard.Link({
    linkID: 'link2',
    source: { id: MakeSourdoughLoafshapes.Container0.id },
    target: { id: MakeSourdoughLoafshapes.clock1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      //excludeEnds: ['rhombus2', 'rhombus1'],
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['top'],
      endDirections: ['top']
    }
  })
  links.clock1_Container5 = new joint.shapes.standard.Link({
    linkID: 'link3',
    source: { id: MakeSourdoughLoafshapes.clock1.id },
    target: { id: MakeSourdoughLoafshapes.Container5.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'normal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })

  links.Container5_rhombus2 = new joint.shapes.standard.Link({
    linkID: 'link4',
    source: { id: MakeSourdoughLoafshapes.Container5.id },
    target: { id: MakeSourdoughLoafshapes.rhombus2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.rhombus2_Jar = new joint.shapes.standard.Link({
    linkID: 'link5',
    source: { id: MakeSourdoughLoafshapes.rhombus2.id },
    target: { id: MakeSourdoughLoafshapes.Jar.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      //excludeEnds: ['rhombus2', 'rhombus1'],
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['top'],
      endDirections: ['top']
    }
  })

  links.rhombus2_Jar.labels([
    {
      position: 0.5,
      attrs: {
        text: {
          text: 'yes',
          fill: 'Black', // text color
          fontSize: 15
        }
      }
    }
  ])

  links.rhombus2_rhombus1 = new joint.shapes.standard.Link({
    linkID: 'link6',
    source: { id: MakeSourdoughLoafshapes.rhombus2.id },
    target: { id: MakeSourdoughLoafshapes.rhombus1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      //excludeEnds: ['rhombus2', 'rhombus1'],
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['top'],
      endDirections: ['top']
    }
  })
  links.rhombus2_rhombus1.labels([
    {
      position: 0.5,
      attrs: {
        text: {
          text: 'no',
          fill: 'Black', // text color
          fontSize: 15
        }
      }
    }
  ])

  links.rhombus2_Container5 = new joint.shapes.standard.Link({
    linkID: 'link7',
    source: { id: MakeSourdoughLoafshapes.rhombus2.id },
    target: { id: MakeSourdoughLoafshapes.Container5.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['top'],
      endDirections: ['right']
    }
  })
  links.rhombus2_Container5.labels([
    {
      position: 0.5,
      attrs: {
        text: {
          text: 'Replenish\nstarter',
          fill: 'Black', // text color
          fontSize: 15
        }
      }
    }
  ])
  // add labels to the links

  links.rhombus1_start = new joint.shapes.standard.Link({
    linkID: 'link8',
    source: { id: MakeSourdoughLoafshapes.rhombus1.id },
    target: { id: MakeSourdoughLoafshapes.start.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['top'],
      endDirections: ['right']
    }
  })
  links.Jar_Container1 = new joint.shapes.standard.Link({
    linkID: 'link9',
    source: { id: MakeSourdoughLoafshapes.Jar.id },
    target: { id: MakeSourdoughLoafshapes.Container1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'manhattan',
      excludeTypes: ['joint.dia.Element'],
      startDirections: ['top'],
      endDirections: ['right']
    }
  })
  links.Container1_Balance1 = new joint.shapes.standard.Link({
    linkID: 'link10',
    source: { id: MakeSourdoughLoafshapes.Container1.id },
    target: { id: MakeSourdoughLoafshapes.Balance1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'manhattan',
    //   excludeTypes: ['joint.dia.Element'],
    //   startDirections: ['bottom'],
    //   endDirections: ['top']
    // }
  })
  links.FContainer1_Balance1 = new joint.shapes.standard.Link({
    linkID: 'link11',
    source: { id: MakeSourdoughLoafshapes.FContainer1.id },
    target: { id: MakeSourdoughLoafshapes.Balance1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'manhattan',
    //   excludeTypes: ['joint.dia.Element'],
    //   startDirections: ['top'],
    //   endDirections: ['top']
    // }
  })
  links.funnel1_Balance1 = new joint.shapes.standard.Link({
    linkID: 'link12',
    source: { id: MakeSourdoughLoafshapes.funnel1.id },
    target: { id: MakeSourdoughLoafshapes.Balance1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'manhattan',
    //   excludeTypes: ['joint.dia.Element'],
    //   startDirections: ['bottom'],
    //   endDirections: ['top']
    // }
  })

  links.Balance1_Mixer1 = new joint.shapes.standard.Link({
    linkID: 'link13',
    source: { id: MakeSourdoughLoafshapes.Balance1.id },
    target: { id: MakeSourdoughLoafshapes.Mixer1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'orthogonal',
    //   options: {
    //     margin: 1,
    //     sourceDirection: routers.rightAngle.Directions.BOTTOM,
    //     targetDirection: routers.rightAngle.Directions.TOP
    //   }
    // }
  })

  links.Mixer1_Container2 = new joint.shapes.standard.Link({
    linkID: 'link14',
    source: { id: MakeSourdoughLoafshapes.Mixer1.id },
    target: { id: MakeSourdoughLoafshapes.Container2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.Container2_Mixer3 = new joint.shapes.standard.Link({
    linkID: 'link15',
    source: { id: MakeSourdoughLoafshapes.Container2.id },
    target: { id: MakeSourdoughLoafshapes.Mixer3.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })

  links.FContainer2_Balance2 = new joint.shapes.standard.Link({
    linkID: 'link16',
    source: { id: MakeSourdoughLoafshapes.FContainer2.id },
    target: { id: MakeSourdoughLoafshapes.Balance2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'orthogonal',
    //   options: {
    //     margin: 1,
    //     sourceDirection: routers.rightAngle.Directions.BOTTOM,
    //     targetDirection: routers.rightAngle.Directions.TOP
    //   }
    // }
  })

  links.funnel2_Balance2 = new joint.shapes.standard.Link({
    linkID: 'link17',
    source: { id: MakeSourdoughLoafshapes.funnel2.id },
    target: { id: MakeSourdoughLoafshapes.Balance2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'orthogonal',
    //   options: {
    //     margin: 1,
    //     sourceDirection: routers.rightAngle.Directions.BOTTOM,
    //     targetDirection: routers.rightAngle.Directions.TOP
    //   }
    // }
  })
  links.Balance2_Mixer2 = new joint.shapes.standard.Link({
    linkID: 'link18',
    source: { id: MakeSourdoughLoafshapes.Balance2.id },
    target: { id: MakeSourdoughLoafshapes.Mixer2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'manhattan',
    //   excludeTypes: ['joint.dia.Element'],
    //   startDirections: ['bottom'],
    //   endDirections: ['right']
    // }
  })
  links.Mixer2_Container3 = new joint.shapes.standard.Link({
    linkID: 'link19',
    source: { id: MakeSourdoughLoafshapes.Mixer2.id },
    target: { id: MakeSourdoughLoafshapes.Container3.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.Container3_Mixer3 = new joint.shapes.standard.Link({
    linkID: 'link20',
    source: { id: MakeSourdoughLoafshapes.Container3.id },
    target: { id: MakeSourdoughLoafshapes.Mixer3.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.funnel3_Balance3 = new joint.shapes.standard.Link({
    linkID: 'link21',
    source: { id: MakeSourdoughLoafshapes.funnel3.id },
    target: { id: MakeSourdoughLoafshapes.Balance3.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'orthogonal',
    //   options: {
    //     margin: 1,
    //     sourceDirection: routers.rightAngle.Directions.BOTTOM,
    //     targetDirection: routers.rightAngle.Directions.TOP
    //   }
    // }
  })
  links.funnel4_Balance3 = new joint.shapes.standard.Link({
    linkID: 'link22',
    source: { id: MakeSourdoughLoafshapes.funnel4.id },
    target: { id: MakeSourdoughLoafshapes.Balance3.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    }
    // router: {
    //   name: 'orthogonal',
    //   options: {
    //     margin: 1,
    //     sourceDirection: routers.rightAngle.Directions.BOTTOM,
    //     targetDirection: routers.rightAngle.Directions.TOP
    //   }
    // }
  })
  links.Balance3_Mixer3 = new joint.shapes.standard.Link({
    linkID: 'link23',
    source: { id: MakeSourdoughLoafshapes.Balance3.id },
    target: { id: MakeSourdoughLoafshapes.Mixer3.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.Mixer3_Container4 = new joint.shapes.standard.Link({
    linkID: 'link24',
    source: { id: MakeSourdoughLoafshapes.Mixer3.id },
    target: { id: MakeSourdoughLoafshapes.Container4.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.Container4_ShapeLoof = new joint.shapes.standard.Link({
    linkID: 'link25',
    source: { id: MakeSourdoughLoafshapes.Container4.id },
    target: { id: MakeSourdoughLoafshapes.ShapeLoof.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.ShapeLoof_Proof = new joint.shapes.standard.Link({
    linkID: 'link26',
    source: { id: MakeSourdoughLoafshapes.ShapeLoof.id },
    target: { id: MakeSourdoughLoafshapes.Proof.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.Proof_Oven2 = new joint.shapes.standard.Link({
    linkID: 'link27',
    source: { id: MakeSourdoughLoafshapes.Proof.id },
    target: { id: MakeSourdoughLoafshapes.Oven2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.Oven1_Oven2 = new joint.shapes.standard.Link({
    linkID: 'link28',
    source: { id: MakeSourdoughLoafshapes.Oven1.id },
    target: { id: MakeSourdoughLoafshapes.Oven2.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'normal'
    }
  })
  links.Oven2_Bread = new joint.shapes.standard.Link({
    linkID: 'link29',
    source: { id: MakeSourdoughLoafshapes.Oven2.id },
    target: { id: MakeSourdoughLoafshapes.Bread.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  links.rhombus1_clock1 = new joint.shapes.standard.Link({
    linkID: 'Mouldy->clock',
    source: { id: MakeSourdoughLoafshapes.rhombus1.id },
    target: { id: MakeSourdoughLoafshapes.clock1.id },
    attrs: {
      line: {
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'transparent'
      }
    },
    router: {
      name: 'orthogonal',
      options: {
        margin: 1,
        sourceDirection: joint.routers.rightAngle.Directions.BOTTOM,
        targetDirection: joint.routers.rightAngle.Directions.TOP
      }
    }
  })
  // add all links  to the graph
  graph.addCells(Object.values(links))

  return links
}
