//const synth = new Tone.Synth().toMaster()
//synth.triggerAttackRelease('C4', '8n')

var power = new Nexus.Add.Toggle("#instrument");


var harmDial = Nexus.Add.Dial('#instrument',{
  'size': [75,75],
  'value': 1.0,
  'min': 0,
  'max': 2,
});

var pitchDial = Nexus.Add.Dial('#instrument',{
  'size': [75,75],
  'value': 220.0,
  'min': 15,
  'max': 800,
});

var tempoDial = Nexus.Add.Dial('#instrument',{
  'size': [75,75],
  'value': 3.0,
  'min': 0.1,
  'max': 10,
});

var sliderAttack = Nexus.Add.Slider('#instrument',{'size': [25,100], 'min': 0, 'max': 2});
var sliderRelease = Nexus.Add.Slider('#instrument',{'size': [25,100], 'min': 0, 'max': 5});


document.getElementById('button')?.addEventListener('click', async () => {
  await Tone.start();
  console.log('audio is ready')
  setup();
})

function setup() {
  
  const synth = new Tone.DuoSynth({
    oscillator: {
      type: "triangle"
    },
    envelope: {
      attack: 0.1
    }
  }).toDestination();
  
  const loop = new Tone.Loop(time => {
    synth.triggerAttackRelease("C4", "4n", time);
  }, 3).start(0);
  
  power.on('change', function(v) {
    v ? Tone.Transport.start() : Tone.Transport.stop();
  });
  
  harmDial.on('change', function(v) {
    synth.harmonicity.rampTo(v,.1)
  }) 

  pitchDial.on('change', function(v) {
    let cb = time => {synth.triggerAttackRelease(v, "4n", time)};
    loop.callback = cb;
  })

  tempoDial.on('change', function(v) {
    loop.interval = v;
  })

  sliderAttack.on('change',function(v) {
    synth.voice0.envelope.attack = v;
    synth.voice1.envelope.attack = v;
    synth.voice0.filterEnvelope.attack = v;
    synth.voice1.filterEnvelope.attack = v;
  })

  sliderRelease.on('change',function(v) {
    synth.voice0.envelope.release = v;
    synth.voice1.envelope.release = v;
    // synth.voice0.filterEnvelope.release = v;
    // synth.voice1.filterEnvelope.release = v;

  })
}



