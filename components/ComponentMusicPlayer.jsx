import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import songs from "../utils/songs.json";
import {
  Center,
  Heading,
  Text,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";

const ComponentMusicPlayer = (props) => {
  // console.log(props);
  const audioPlayer = useRef();
  const audioPlayerSource = useRef();

  const [audio, setAudio] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [songPercent, setSongPercent] = useState(0);

  useEffect(() => {
    setAudio({
      currentTime: audioPlayer.current.currentTime,
      duration: audioPlayer.current.duration,
    });
    setSongPercent(
      getSongPercent(
        audioPlayer.current.currentTime,
        audioPlayer.current.duration
      )
    );
  }, [audioPlayer]);

  const playPauseHandler = () => {
    setIsAudioPlaying(!isAudioPlaying);

    if (isAudioPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  };

  const getFormattedTime = (intToEdit) => {
    let minutes = Math.floor(intToEdit / 60);
    let seconds = (Math.round(intToEdit) % 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return `${minutes}:${seconds}`;
  };

  const getSongPercent = (currentTime, duration) => {
    return Math.round((currentTime / duration) * 100);
  };

  const updateSongPercent = (val) => {
    audioPlayer.current.currentTime =
      (val / 100) * audioPlayer.current.duration;
    setAudio({
      currentTime: audioPlayer.current.currentTime,
      duration: audioPlayer.current.duration,
    });
    // console.log(audioPlayer.current.currentTime);
  };

  const userChangeTrack = (direction) => {
    audioPlayer.current.pause();
    let currentSongIndex = props.songs.indexOf(props.activeSong);
    if (direction === "forwards") {
      if (currentSongIndex === props.songs.length -1) {
        currentSongIndex = -1;
      }
      props.setActiveSong(props.songs[currentSongIndex + 1]);
      audioPlayerSource.src = props.activeSong.audio;
    }
    else {
      if(currentSongIndex === 0) {
        currentSongIndex = props.songs.length -1;
      }
      props.setActiveSong(props.songs[currentSongIndex - 1]);
      audioPlayerSource.src = props.activeSong.audio;
    }

    if(isAudioPlaying) {
    audioPlayer.current.play();
    }
  console.log(currentSongIndex);
};

  return (
    <Center pt={["2rem"]} display={["flex"]} flexDir={["column"]}>
      <Image
        width={500}
        height={500}
        src={props.activeSong.image}
        alt="Decorative"
      />
      <Heading mt={["2rem"]}>{props.activeSong.title}</Heading>
      <Text mb={["2rem"]}>{props.activeSong.artist}</Text>

      <HStack
        w={["100%"]}
        mb={["1rem"]}
        px={["1rem"]}
        justifyContent={["space-between"]}
      >
        <Text>{getFormattedTime(audio.currentTime)}</Text>
        <Slider
          w={["70%"]}
          aria-label="slider-ex-1"
          defaultValue={0}
          onChangeEnd={(val) => {
            updateSongPercent(val);
          }}
        >
          <SliderTrack>
            <SliderFilledTrack bg={["#ffd28a"]} />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box>
          {audio.duration ? (
            <Text>{getFormattedTime(audio.duration)}</Text>
          ) : (
            <Spinner />
          )}
        </Box>
      </HStack>

      <HStack w={["75%"]} px={["1rem"]} justifyContent={["space-between"]}>
        <IconButton
          size="lg"
          onClick={() => {
            userChangeTrack("backwards");
          }}
          icon={<FiSkipBack />}
        ></IconButton>
        <IconButton
          size="lg"
          onClick={playPauseHandler}
          icon={isAudioPlaying ? <FiPause /> : <FiPlay />}
        ></IconButton>
        <IconButton
          size="lg"
          onClick={() => {
            userChangeTrack("forwards");
          }}
          icon={<FiSkipForward />}
        ></IconButton>
      </HStack>

      <audio
        ref={audioPlayer}
        onTimeUpdate={() => {
          setAudio({
            currentTime: audioPlayer.current.currentTime,
            duration: audioPlayer.current.duration,
          });
        }}
      >
        <source ref={audioPlayerSource} src={props.activeSong.audio}></source>
      </audio>
    </Center>
  );
};

export default ComponentMusicPlayer;
