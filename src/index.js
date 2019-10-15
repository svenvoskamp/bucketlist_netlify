{

  Zdog.Anchor.prototype.renderGraphSvg = function (svg) {
    if (!svg) {
      throw new Error('svg is ' + svg + '. ' +
        'SVG required for render. Check .renderGraphSvg( svg ).');
    }
    this.flatGraph.forEach(function (item) {
      item.render(svg, Zdog.SvgRenderer);
    });
  };
  const TAU = Zdog.TAU;
  const light = '#EAE2B7';
  const yellow1 = '#FCBF49';
  const orange1 = '#F77F00';
  const red1 = '#d62828';
  const purple1 = '#003049';
  const white1 = '#ffffff';
  const isSpinning = true;
  const handleClickEvent = () => {
    $live.classList.toggle('.active');
  }

  let showreel = new Zdog.Illustration({
    element: '.showreel',
    dragRotate: false,
    rotate: {
      x: 0.2,
      y: -0.2
    }
  });

  let playButton = new Zdog.Shape({
    addTo: showreel,
    stroke: 30,
    color: orange1,
    path: [{
      x: -20,
      y: -40
    }, {
      x: -20,
      y: 60
    }, {
      x: 70,
      y: 10
    }],
    fill: true,
  });

  var BokehShape = Zdog.Shape.subclass({
    bokehSize: 5,
    bokehLimit: 64,
  });

  BokehShape.prototype.updateBokeh = function () {
    // bokeh 0 -> 1
    this.bokeh = Math.abs(this.sortValue) / this.bokehLimit;
    this.bokeh = Math.max(0, Math.min(1, this.bokeh));
    return this.bokeh;
  };

  BokehShape.prototype.getLineWidth = function () {
    return this.stroke + this.bokehSize * this.bokeh * this.bokeh;
  };

  BokehShape.prototype.getBokehAlpha = function () {
    var alpha = 1 - this.bokeh;
    alpha *= alpha;
    return alpha * 0.8 + 0.2;
  };

  BokehShape.prototype.renderCanvasDot = function (ctx) {
    this.updateBokeh();
    ctx.globalAlpha = this.getBokehAlpha(); // set opacity
    Zdog.Shape.prototype.renderCanvasDot.apply(this, arguments);
    ctx.globalAlpha = 1; // reset
  };

  BokehShape.prototype.renderPath = function (ctx, renderer) {
    this.updateBokeh();
    // set opacity
    if (renderer.isCanvas) {
      ctx.globalAlpha = this.getBokehAlpha();
    }
    Zdog.Shape.prototype.renderPath.apply(this, arguments);
    // reset opacity
    if (renderer.isCanvas) {
      ctx.globalAlpha = 1;
    }
  };

  (function () {
    var dotCount = 326;

    for (var i = 0; i < dotCount; i++) {
      var yRotor = new Zdog.Anchor({
        addTo: showreel,
        rotate: {
          y: TAU / dotCount * i
        },
      });

      new BokehShape({
        path: [{
          z: 40 * (1 - Math.random() * Math.random()) + 380
        }, ],
        addTo: yRotor,
        rotate: {
          x: (Math.random() * 2 - 1) * TAU * 30
        },
        color: light,
        stroke: 1 + Math.random(),
        bokehSize: 6,
        bokehLimit: 2,
      });
    }
  })();

  let showreelBox = new Zdog.Box({
    addTo: showreel,
    width: 30,
    height: 30,
    depth: 30,
    stroke: 1,
    color: red1, // default face color
    leftFace: yellow1,
    rightFace: orange1,
    topFace: purple1,
    bottomFace: light,
    translate: {
      x: -200,
      y: 150,
      z: 50
    },
    rotate: {
      x: 2,
      y: 0.3,
      z: 100
    }
  });

  showreelBox.copy({
    width: 25,
    height: 25,
    translate: {
      x: 250,
      y: 250
    },
    rotate: {
      x: -10,
      y: -0.3
    }
  });

  showreelBox.copy({
    width: 35,
    height: 20,
    translate: {
      y: -100,
      x: 250,
      z: -100
    },
    rotate: {
      x: -14,
      y: -2.3
    }
  });

  showreelBox.copy({
    width: 30,
    height: 25,
    translate: {
      y: -200,
      x: -250,
      z: -225
    },
    rotate: {
      x: -12,
      y: -4.3
    }
  });

  showreelBox.copy({
    width: 30,
    height: 25,
    translate: {
      y: -300,
      x: 20,
      z: 100
    },
    rotate: {
      x: -11,
      y: -5.3
    }
  });

  let illusion = new Zdog.Illustration({
    element: '.illusion',
    dragRotate: true,
    rotate: {
      y: 0.71,
      x: 0.6
    },
    translate: {
      y: -100
    },

  });

  let cubus1 = new Zdog.Box({
    addTo: illusion,
    width: 200,
    height: 200,
    depth: 200,
    stroke: 1,
    color: purple1, // default face color
    leftFace: yellow1,
    rightFace: orange1,
    topFace: red1,
    bottomFace: light,
    translate: {
      x: -300,
      y: -300
    },
  });

  cubus1.copy({
    translate: {
      x: -128,
      y: 82
    },
  })

  cubus1.copy({
    translate: {
      x: 45,
      y: 462
    },
  })

  const ball = new Zdog.Ellipse({
    addTo: illusion,
    translate: {
      y: 1400,
      x: 990,
      z: 1000
    },
    stroke: 200,
    color: red1,
    fill: true,
  });

  // BALANCE 

  let balance = new Zdog.Illustration({
    element: '.balance',
    dragRotate: false,
    rotate: {
      y: 0.71,
      x: -0.4,
      z: -0.2
    },
    translate: {
      y: -100
    },

  });

  let cubus2 = new Zdog.Box({
    addTo: balance,
    width: 340,
    height: 500,
    depth: 340,
    stroke: 1,
    color: purple1,
    leftFace: red1,
    rightFace: red1,
    topFace: orange1,
    bottomFace: light,
    translate: {
      y: 190
    },


  });

  let ball2 = new Zdog.Ellipse({
    addTo: balance,
    translate: {
      y: -125,
      x: 50,
      z: -10
    },
    stroke: 125,
    color: red1,
    fill: true,
    spin: -TAU * 3 / 8,
  });

  let live = new Zdog.Illustration({
    element: '.live',
    dragRotate: false,
    translate: {
      y: 25
    },
    rotate: {
      x: -0.4,
      y: 0.75
    }
  });

  let liveHouse = new Zdog.Box({
    addTo: live,
    width: 350,
    height: 200,
    depth: 200,
    stroke: 1,
    color: light,
    fill: true,
    leftFace: yellow1,
    rightFace: yellow1,
    topFace: purple1,
    bottomFace: light,
  });

  let frontRoof = new Zdog.Shape({
    path: [{
        x: -175,
        y: -100,
        z: 100
      },
      {
        x: 175,
        y: -100,
        z: 100
      },
      {
        x: 175,
        y: -225,
        z: 0
      },
      {
        x: -175,
        y: -225,
        z: 0
      }
    ],
    addTo: live,
    color: purple1,
    fill: true,
  });

  let backRoof = new Zdog.Shape({
    path: [{
        x: -175,
        y: -100,
        z: -100
      },
      {
        x: 175,
        y: -100,
        z: -100
      },
      {
        x: 175,
        y: -225,
        z: 0
      },
      {
        x: -175,
        y: -225,
        z: 0
      }
    ],
    addTo: live,
    color: purple1,
    fill: true,
  });

  let frontRoofConnector = new Zdog.Shape({
    path: [{
        x: 175,
        y: -100,
        z: -100
      },
      {
        x: 175,
        y: -100,
        z: 100
      },
      {
        x: 175,
        y: -225,
        z: 0
      },
    ],
    addTo: live,
    color: yellow1,
    fill: true,
    stroke: 1,
  });

  let backRoofConnector = new Zdog.Shape({
    path: [{
        x: -175,
        y: -100,
        z: -100
      },
      {
        x: -175,
        y: -100,
        z: 100
      },
      {
        x: -175,
        y: -225,
        z: 0
      },
    ],
    addTo: live,
    color: yellow1,
    fill: true,
    stroke: 1,
  });



  [false, true].forEach(function (isGroup) {

    let SliceClass = isGroup ? Zdog.Group : Zdog.Anchor;

    let dotSlice = new SliceClass({
      addTo: live,
      translate: {
        z: isGroup ? 0 : -100
      },
    });

    let windowFront = new Zdog.Rect({
      addTo: dotSlice,
      width: 30,
      height: 30,
      translate: {
        x: -50,
        y: -10,
        z: 100
      },
      color: purple1,
      fill: true,
    })

    windowFront.copy({
      translate: {
        x: 50,
        y: -10,
        z: 100
      },
    })
  });

  [false, true].forEach(function (isGroup2) {

    let SliceClass2 = isGroup2 ? Zdog.Group : Zdog.Anchor;

    let dotSlice2 = new SliceClass2({
      addTo: live,
      translate: {
        z: isGroup2 ? 0 : 0
      },
    });

    let windowBack = new Zdog.Rect({
      addTo: dotSlice2,
      width: 30,
      height: 30,
      translate: {
        x: -50,
        y: -10,
        z: -100
      },
      color: purple1,
      fill: true,
    })

    windowBack.copy({
      translate: {
        x: 50,
        y: -10,
        z: -100
      },
    })
  });

  [false, true].forEach(function (isGroup3) {

    let SliceClass3 = isGroup3 ? Zdog.Group : Zdog.Anchor;

    let dotSlice3 = new SliceClass3({
      addTo: live,
      translate: {
        z: isGroup3 ? 0 : 0
      },
    });

    let windowBack = new Zdog.Rect({
      addTo: dotSlice3,
      width: 30,
      height: 30,
      translate: {
        x: 175,
        y: -10,
        z: 0
      },
      rotate: {
        y: 1.6
      },
      color: purple1,
      fill: true,
    })

    windowBack.copy({
      translate: {
        x: -175,
        y: -10,
        z: 0
      },
    })
  });

  let earth = new Zdog.Ellipse({
    diameter: 750,
    addTo: live,
    rotate: {
      x: TAU / 4
    },
    translate: {
      y: 100
    },
    stroke: 20,
    fill: true,
    color: purple1,
  });

  let chimney = new Zdog.Box({
    color: purple1,
    fill: true,
    addTo: live,
    width: 50,
    depth: 50,
    height: 150,
    translate: {
      x: 75,
      y: -200,
      z: 50
    }
  })

  let smokes = new Zdog.Group({
    addTo: live,
  })

  let smoke = new Zdog.Ellipse({
    addTo: smokes,
    translate: {
      x: 70,
      y: -310,
      z: 40
    },
    diameter: 2,
    stroke: 25,
    fill: true,
    color: yellow1,
  });

  smoke.copy({
    stroke: 15,
    translate: {
      x: 80,
      y: -340,
      z: 55
    },
  })

  let precision = new Zdog.Illustration({
    element: '.precision',
    dragRotate: false,
    rotate: {
      x: -0.2,
      y: 0.8
    },
  })

  let box = new Zdog.Group({
    addTo: precision,
  })

  let precisionBox = new Zdog.Box({
    addTo: precision,
    width: 175,
    height: 175,
    depth: 175,
    color: purple1,
    topFace: red1,
    rightFace: orange1,
  })

  precisionBox.copy({
    translate: {
      y: -300
    },
  })

  precisionBox.copy({
    translate: {
      y: 300
    },
  })

  let precisionBall = new Zdog.Shape({
    addTo: precision,
    stroke: 40,
    fill: true,
    color: purple1,
    translate: {
      y: 363,
      z: 400
    }
  })

  let precisionBall2 = new Zdog.Shape({
    addTo: precision,
    stroke: 40,
    fill: true,
    color: orange1,
    translate: {
      x: 400,
      y: 62
    }
  })

  let precisionBall3 = new Zdog.Shape({
    addTo: precision,
    stroke: 40,
    fill: true,
    color: red1,
    translate: {
      y: -238,
      z: -400
    }
  })


  let precisionRect = new Zdog.Rect({
    addTo: precisionBox,
    width: 50,
    depth: 300,
    stroke: 1,
    height: 100,
    color: purple1,
    fill: true,
    translate: {
      x: 100,
      y: 33
    },
    rotate: {
      y: 1.6
    }
  })

  precisionRect.copy({
    color: orange1,
    rotate: {
      y: 0
    },
    translate: {
      x: 0,
      y: 334,
      z: 100
    },
  })

  precisionRect.copy({
    color: orange1,
    rotate: {
      y: 0
    },
    translate: {
      x: 0,
      y: -266,
      z: 100
    },
  })

  let progress = new Zdog.Illustration({
    element: '.progress',
    dragRotate: false,
    translate: {
      y: 50
    },
    rotate: {
      x: -0.5,
      y: 0.75
    }
  });

  let head = new Zdog.Shape({
    addTo: progress,
    stroke: 150,
    color: purple1,
    translate: {
      y: -200
    },
  });

  [false, true].forEach(function (isGroup5) {

    let SliceClass5 = isGroup5 ? Zdog.Group : Zdog.Anchor;

    let dotSlice5 = new SliceClass5({
      addTo: head,
      translate: {
        z: isGroup5 ? 0 : 0
      },
    });

    let eye = new Zdog.Ellipse({
      addTo: dotSlice5,
      diameter: 30,

      quarters: 2, // semi-circle
      translate: {
        x: 35,
        y: 1,
        z: 30
      },
      // rotate semi-circle to point up
      rotate: {
        z: -TAU / 4
      },
      color: yellow1,
      stroke: 5,
      // hide when front-side is facing back
      backface: false,
    });

    eye.copy({
      translate: {
        x: -35,
        y: 1,
        z: 30
      },
    })

    new Zdog.Ellipse({
      addTo: dotSlice5,
      diameter: 50,
      quarters: 2,
      translate: {
        y: 30,
        z: 30
      },
      rotate: {
        z: TAU / 4
      },
      closed: true,
      color: '#FED',
      stroke: 0.5,
      fill: true,
      backface: false,
    });
  });

  let progressBox = new Zdog.Box({
    addTo: progress,
    width: 150,
    height: 150,
    depth: 150,
    stroke: 1,
    color: purple1, // default face color
    leftFace: yellow1,
    rightFace: orange1,
    topFace: red1,
    bottomFace: light,
    translate: {
      x: 0,
      y: -50
    }
  });
  progressBox.copy({
    translate: {
      x: 0,
      z: 350,
      y: -175
    },
    height: 400,
  })

  progressBox.copy({
    translate: {
      x: 0,
      z: -350,
      y: -75
    },
    height: 210,
  })

  progressBox.copy({
    translate: {
      x: 350,
      z: 0,
      y: -90
    },
    height: 240,
  })

  progressBox.copy({
    translate: {
      x: -350,
      z: 0,
      y: -125
    },
    height: 300,
  })

  const $live = document.querySelector('.live');
  $live.addEventListener('click', handleClickEvent);

  function animate() {
    if (ball2.translate.z > 140) {
      ballDirection = 'down';
    } else if (ball2.translate.z < 0) {
      ballDirection = 'up';
    }

    

    if (balance.rotate.z > 0) {
      ballDirection = 'down';
    } else if (balance.rotate.z < -0.2) {
      ballDirection = 'up';
    }

    if (precisionBall.translate.z > 399) {
      move1 = 'true';
    } else if (precisionBall.translate.z < -399) {
      move1 = 'false';
    }


    if (precisionBall3.translate.z < -399) {
      move2 = 'true';
    } else if (precisionBall3.translate.z > 399) {
      move2 = 'false';
    }

    if (precisionBall2.translate.x > 0) {
      moving = 'true';
    } else {
      moving = 'false';
    }

    if (head.translate.y < -150) {
      moving2 = 'true';
    } else if (head.translate.y < -250) {
      moving2 = 'false';
    }
    console.log(head.translate.y);




    function move() {
      balance.rotate.z += ballDirection == 'up' ? 0.001 : -0.001;
      showreel.rotate.y += isSpinning ? -0.004 : 0;
      smokes.rotate.y += ballDirection == 'up' ? 0.0001 : -0.0001;
      head.translate.y += move2 == 'true' ? -0.5 : 0.5;
      ball2.translate.z += ballDirection == 'up' ? 1 : -1;
      precisionBall.translate.z += move1 == 'true' ? -2 : 2;
      precisionBall2.translate.x += move2 == 'true' ? -2 : 2;
      precisionBall3.translate.z += move2 == 'true' ? 2 : -2;
    }
    move();
   
    if ($live.classList.contains('.active')) {
      live.rotate.y += isSpinning ? -0.01 : 0;
    }

    showreel.updateRenderGraph();
    balance.updateRenderGraph();
    illusion.updateRenderGraph();
    live.updateRenderGraph();
    precision.updateRenderGraph();
    progress.updateRenderGraph();
    requestAnimationFrame(animate);

  }
  animate();
}