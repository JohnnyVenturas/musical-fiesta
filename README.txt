This website is inspired by https://musiclab.chromeexperiments.com/Song-Maker/
It works by holding mouse1 and adding/removing the coloured blocks which represent notes. The bottom note is an E, the interval between any 2 consecutive vertical blocks in 1 semitone.
Eack block is an eight note.
Unlike the original website which uses MIDI, we are using only the builtin web audio api, and so we are limited by the fact
that creating complex sounds from oscillators will consume multiple gigabytes of ram using our current knowledge of acoustic instrument synthesis. 
(Garbage collection is really weird for these objects, and is not really well documented)
Live preview when adding the notes is not possible because it would sound awfull really easily, there is also a chance of a memory leak
because the audio context may be closed before/during the creation of the various objects which the GC might not take care of.


We used this for the colours of the blocks : https://i.stack.imgur.com/RYOWJ.jpg


The wavetables have been taken from: https://github.com/GoogleChromeLabs/web-audio-samples/tree/main/archive/demos/wave-tables
