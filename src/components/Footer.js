import React from 'react'
import { Box, Image,Text,Stack, VStack, Avatar } from "@chakra-ui/react"
const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whitealpha.700"} minH={"48"} px={"16"} py={["16", "8"]}>
        <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center","flex-start"]}>
            <Text fontWeight={"bold"} color={"whiteAlpha.700"}>About Us</Text>
            <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]} color={"whiteAlpha.700"}>We are the best Crypto trading app in India, we provide our guidance at a very reasonable price</Text>
        </VStack>
        <VStack>
            <Avatar boxSize={"28"} mt={["4","0"]}></Avatar>
            <Text>Our Founder</Text>
        </VStack>

        </Stack>
    </Box>
  )
}

export default Footer