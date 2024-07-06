import axios from "axios"
import React, { useEffect, useState } from 'react'
import { server } from "../index"
import { Container, HStack, Heading, VStack, Text, Image } from "@chakra-ui/react";
import Loader from "./Loader";
import "../App.css"
import { transform } from "framer-motion";
import ErrorComponent from "./ErrorComponent"
const Exchanges = () => {

  const [exchanges, setexchanges] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setexchanges(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchExchange()
  }, []);

  if (error) return <ErrorComponent message={"Error while fetching Exchanges"} />
  return (
    <Container maxW={"container.xl"}>

      {loading ? <Loader /> : <>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            exchanges.map((i) => {
              return <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                url={i.url}
                rank={i.trust_score_rank} />
            })
          }
        </HStack>
      </>}
    </Container>
  );
}

const ExchangeCard = ({ name, img, url, rank }) => (
  <a href={url} target={"blank"}>
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)"
        }
      }

      }
    >
      <Image src={img} alt="exchanges" h={"10"} w={"10"} objectFit={"contain"}></Image>
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges