import { useState, useRef, useEffect } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

const AudioMessage = ({ audioUrl, index, playingIndex, setPlayingIndex }) => {
  const isPlaying = playingIndex === index; // Check if this audio is currently playing
  const audioRef = useRef(new Audio(audioUrl));
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [decodedAudioUrl, setDecodedAudioUrl] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    // Decode the audioUrl (Base64) when it changes
    if (audioUrl) {
      decodeBase64ToBlob(audioUrl);
    }
  }, [audioUrl]);



  // Function to decode Base64 string into a Blob and create the audio URL
  const decodeBase64ToBlob = (base64String) => {
    const binaryString = atob(base64String); // Decode the base64 string into binary
    const byteArray = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i); // Convert the binary string to a byte array
    }

    // Create a Blob object from the byte array with MIME type audio/wav
    const audioBlob = new Blob([byteArray], { type: "audio/wav" });
    const audioBlobUrl = URL.createObjectURL(audioBlob); // Create a URL for the Blob
    setDecodedAudioUrl(audioBlobUrl); // Update the state with the Blob URL
  };
/********************************************************************* */
  const togglePlay = (index) => {
    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
      cancelAnimationFrame(animationRef.current);
    } else {
      if (playingIndex !== null) {
        setPlayingIndex(null); // Stop the other audio before starting a new one
      }
      setPlayingIndex(index);
      //setupAudioVisualizer();
      audioRef.current.play();
      //visualize();
    }
  };

  const handleAudioEnd = () => {
    setPlayingIndex(null);
    cancelAnimationFrame(animationRef.current);
  };

  return (
   <div className="AudioMessage">
      <div >
        <button  style={{ width: '40px',height:'40px',padding:'0'}} className="ButtonClick" onClick={() => togglePlay(index)}>
          {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
        </button>
        {/* Only render the audio element if decodedAudioUrl is available */}
        {decodedAudioUrl && 
             <audio 
                ref={audioRef}  
                style={{ display: "none" }} // cacher si tu utilises seulement ton bouton 
                src={decodedAudioUrl} 
                type="audio/wav" 
                controls
                className="custom-audio-player" 
              />
        }
        
      </div>
    </div>
  );
};
/**
 * 
 * 
 */
export default AudioMessage;
  {/* Visualizer Canvas */}
        {/*<div className="mt-2">
          <canvas ref={canvasRef} width={200} height={50}></canvas>
        </div>*/}
 /**
  
  const setupAudioVisualizer = () => {
    if (!analyserRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 256;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      analyserRef.current = analyser;
    }
  };

  const visualize = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const draw = () => {
      if (!isPlaying) return;
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = "#E5E7EB"; // Background color
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const barWidth = (canvasRef.current.width / dataArray.length) * 2.5;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`; // Bar color
        ctx.fillRect(x, canvasRef.current.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;// Space out the bars
      }
      // Loop the animation
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();// Start drawing
  };

  */