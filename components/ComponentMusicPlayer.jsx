import React, { useState, useRef } from "react";
import Image from "next/image";
import songs from "../utils/songs.json";
import { Box, Center, Heading, Text, Input, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, } from "@chakra-ui/react";

const ComponentMusicPlayer = () => {
  const [activeSong, setActiveSong] = useState(songs.songs[0]);
  const audioPlayer = useRef();

  return (
    <Center pt={["2rem"]} display={["flex"]} flexDir={["column"]}>
      <Image width={500} height={500} src={activeSong.image} alt="Decorative" />
      <Heading mt={["2rem"]}>{activeSong.title}</Heading>
      <Text>{activeSong.artist}</Text>

      <HStack w={["100%"]} px={["1rem"]} justifyContent={["space-between"]}>
        <Text>0:00</Text>
        <Input type={"range"}></Input>
        <Text>0:00</Text>
      </HStack>

      <audio ref={audioPlayer} src={activeSong.audio}></audio>
    </Center>
  );
};

export default ComponentMusicPlayer;
