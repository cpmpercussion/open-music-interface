//const synth = new Tone.Synth().toMaster()
//synth.triggerAttackRelease('C4', '8n')


var dial = Nexus.Add.Dial('#instrument',{
	'size': [100,100]
});

var slider = Nexus.Add.Slider('#instrument',{
	'size': [25,100]
});

//attach a click listener to a play button
document.getElementById('button')?.addEventListener('click', async () => {
	await Tone.start();
	console.log('audio is ready')
	startSynth();
})



function startSynth() {
    // create two monophonic synths
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();
    //play a note every quarter-note
    const loopA = new Tone.Loop(time => {
        	synthA.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop(time => {
	     synthB.triggerAttackRelease("C4", "8n", time);
    }, "4n").start("8n");
    // all loops start until the Transport is started
}


document.getElementById("play-button").addEventListener("click", function() {
  if (Tone.Transport.state !== 'started') {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});

function setup() {
	const synth = new Tone.MonoSynth({
		oscillator: {
			type: "square"
		},
		envelope: {
			attack: 0.1
		}
	}).toDestination();
	synth.triggerAttackRelease("C4", "8n");

}
