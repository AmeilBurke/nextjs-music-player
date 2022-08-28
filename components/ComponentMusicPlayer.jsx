import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import songs from "../utils/songs.json";
import { Center, Heading, Text, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton } from "@chakra-ui/react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const ComponentMusicPlayer = (props) => {

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [currentSongDuration, setCurrentSongDuration] = useState();
  const [currentSongTime, setCurrentSongTime] = useState();
  const [songPercent, setSongPercent] = useState();
  const audioPlayer = useRef();

  const playPauseHandler = () => {
    if (isAudioPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
      setIsAudioLoaded(true);

    }
    setIsAudioPlaying(!isAudioPlaying);
  }

  // const timeUpdateHandlerInput = (e) => {
  //   console.log(e);
  //   setCurrentSongTime(currentSongDuration / e);
  // }

  const timeUpdateHandler = (e) => {
    console.log(e)
    setCurrentSongTime(e.target.currentTime);
    setCurrentSongDuration(e.target.duration);

    setSongPercent(Math.floor(e.target.currentTime) / Math.floor(e.target.duration) * 100);

    console.log(Math.floor(songPercent));
  }

  return (
    <Center pt={["2rem"]} display={["flex"]} flexDir={["column"]}>
      <Image width={500} height={500} src={props.activeSong.image} alt="Decorative" />
      <Heading mt={["2rem"]}>{props.activeSong.title}</Heading>
      <Text mb={['2rem']} >{props.activeSong.artist}</Text>

      <HStack w={["100%"]} mb={['1rem']} px={["1rem"]} justifyContent={["space-between"]}>
        <Text>{isAudioLoaded ? Math.floor(currentSongTime / 60) + ":" + ("0" + Math.floor(currentSongTime % 60)).slice(-2) : '0:00'}</Text>
        <Slider w={['70%']} aria-label='slider-ex-1' defaultValue={0} value={songPercent} onChange={timeUpdateHandlerInput}>
          <SliderTrack >
            <SliderFilledTrack bg={['#ffd28a']} />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>{isAudioLoaded ? Math.round(currentSongDuration / 60) + ":" + ("0" + Math.floor(currentSongDuration % 60)).slice(-2) : '0:00'}</Text>
        {/* <Text>{currentSongDuration}</Text> */}
      </HStack>

      <HStack w={["75%"]} px={["1rem"]} justifyContent={["space-between"]}>
        <IconButton size='lg' icon={<FiSkipBack />}></IconButton>
        <IconButton size='lg' onClick={playPauseHandler} icon={isAudioPlaying ? <FiPause /> : <FiPlay />}></IconButton>
        <IconButton size='lg' icon={<FiSkipForward />}></IconButton>
      </HStack>

      <audio ref={audioPlayer} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler}>
        <source src={props.activeSong.audio} ></source>
      </audio>

    </Center>
  );
};

export default ComponentMusicPlayer;
