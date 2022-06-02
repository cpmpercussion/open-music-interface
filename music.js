//const synth = new Tone.Synth().toMaster()
//synth.triggerAttackRelease('C4', '8n')

var power = new Nexus.Add.Toggle("#instrument");


var harmDial = Nexus.Add.Dial('#instrument',{
  'size': [75,75],
  'value': 1.0,
  'min': 0,
  'max': 2,
});

var sliderAttack = Nexus.Add.Slider('#instrument',{'size': [25,100]});
var sliderRelease = Nexus.Add.Slider('#instrument',{'size': [25,100]});


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
    synth.triggerAttackRelease("C4", "16n", time);
  }, "8n").start(0);
  
  power.on('change',function(v) {
    v ? Tone.Transport.start() : Tone.Transport.stop();
  });
  
  harmDial.on('change',function(v) {
    synth.harmonicity.rampTo(v,.1)
  }) 

  sliderAttack.on('change',function(v) {
    synth.envelope.attack = v;
  }) 

  sliderRelease.on('change',function(v) {
    synth.envelope.release = v;
  })
}



