import React from 'react'
import { Box, Image,Text } from "@chakra-ui/react"
import bitcoinImage from "./btc.png"
import {motion} from "framer-motion"
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>

      <motion.div style={{
        height:"80vh",
      }}
      animate={{
        translateY:"20px"
      }}

      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse",
      }}
      >
      <Image w={"full"} h={"full"} objectFit={"contain"} src="https://github.com/meabhisingh/react-crypto-app/blob/master/src/assets/btc.png?raw=true" filter={"grayScale(1)"}></Image>
      </motion.div>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-21"}
      >
        Xcrypto
      </Text>
    </Box>
  )
}

export default Home