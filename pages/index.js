import Head from "next/head";
import { Box } from "@chakra-ui/react";
import ComponentNavbar from "../components/ComponentNavbar";
import ComponentMusicPlayer from "../components/ComponentMusicPlayer";
import songs from "../utils/songs.json";
import React, { useState } from 'react'

export default function Home() {
  const [activeSong, setActiveSong] = useState(songs[0]);
  
  return (
    <div>
      <Head>
        <title>Wave Music Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box maxW={["1536px"]} h={['100vh']} mx={['auto']} pt={['2rem']} position={['relative']}>
          <ComponentNavbar />
          <ComponentMusicPlayer activeSong={activeSong} setActiveSong={setActiveSong} songs={songs} />
        </Box>
      </main>
    </div>
  );
}
