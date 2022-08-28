import { Box, Heading, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Text, DrawerFooter, Button, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react'
import { FiMusic } from "react-icons/fi";

const ComponentNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w={['100%']} px={['1rem']} display={['flex']} alignItems={['center']} justifyContent={['space-between']} >
        <Heading>Wave</Heading>
        <IconButton bg='transparent' onClick={onOpen} size='lg' icon={<FiMusic />}></IconButton>

        <>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Library</DrawerHeader>

          <DrawerBody>
            <Text>Songs to go here</Text>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
    </Box>
  )
}

export default ComponentNavbar