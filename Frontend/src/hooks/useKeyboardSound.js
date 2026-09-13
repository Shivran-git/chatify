import keystroke1 from '../assets/keystroke1.mp3'
import keystroke2 from '../assets/keystroke2.mp3'
import keystroke3 from '../assets/keystroke3.mp3'
import keystroke4 from '../assets/keystroke4.mp3'


const keyStrokeSounds = [
    new Audio(keystroke1),
    new Audio(keystroke2),
    new Audio(keystroke3),
    new Audio(keystroke4)
   
]

function useKeyboardSound(){
    const playRandomKeyStrokeSound = async ()=>{
              const randomSound = await keyStrokeSounds[Math.floor(Math.random() * (keyStrokeSounds.length)) ] ;
              randomSound.currentTime = 0 ;
              randomSound.play().catch(error => console.log("Audio play failed", error));
    }

    return {playRandomKeyStrokeSound}
}


export default useKeyboardSound ;

