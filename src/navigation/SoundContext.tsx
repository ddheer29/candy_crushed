import { createContext, ReactNode, useContext, useState } from "react";
import Video from "react-native-video";

interface SoundContextProps {
  playSound: (soundName: string, repeat: boolean) => void;
  stopSound: (soundName: string) => void;
}

interface SoundProviderProps {
  children: ReactNode;
}

const SountContext = createContext<SoundContextProps | undefined>(undefined)

const soundPaths: { [key: string]: string } = {
  ui: require('../assets/sfx/ui.mp3'),
  candy_shuffle: require('../assets/sfx/candy_shuffle.mp3'),
  candy_clear: require('../assets/sfx/candy_clear.mp3'),
  bg: require('../assets/sfx/bg.mp3'),
  cheer: require('../assets/sfx/cheer.mp3'),
}

const SoundProvider = ({ children }: SoundProviderProps) => {

  const [sounds, setSounds] = useState<any[]>([]);
  const playSound = (soundName: string, repeat: boolean) => {
    const soundPath = soundPaths[soundName];
    if (soundPath) {
      setSounds((prevSound) => {
        const updatedSound = prevSound?.filter((sound) => sound.id !== soundName)
        return [
          ...updatedSound,
          {
            id: soundName,
            path: soundPath,
            repeat
          }
        ]
      })
    } else {
      console.log(`Sound ${soundName} not found`)
    }
  }

  const stopSound = (soundName: string) => {
    setSounds((prevSound) => prevSound?.filter((sound) => sound.id !== soundName))
  }

  return (
    <SountContext.Provider value={{ playSound, stopSound }}>
      {children}
      {sounds?.map((sound) => (
        <Video
          key={sound.id}
          source={sound.path}
          paused={false}
          repeat={sound.repeat}
          volume={0.4}
          muted={false}
          resizeMode="cover"
          style={{ position: 'absolute', width: 0, height: 0 }}
        />
      ))}
    </SountContext.Provider>
  )
}


const UseSound = (): SoundContextProps => {
  const context = useContext(SountContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

export { SoundProvider, UseSound }
