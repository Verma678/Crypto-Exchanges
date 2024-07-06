import axios from "axios"
import React, { useEffect, useState } from 'react'
import { server } from "../index"
import { Container, HStack, Heading, VStack, Text, Image, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import "../App.css"
import ErrorComponent from "./ErrorComponent"
import { Link } from "react-router-dom";
const Coins = () => {

  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setpage] = useState(1);
  const [currency, setcurrency] = useState("inr");
  const btns = new Array(132).fill(1);
  const changePage = (page) => {
    setpage(page);
    setloading(true);
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`, { mode: "no-cors" });
        setcoins(data);
        setloading(false);
      } catch (err) {
        seterror(true);
        setloading(false);
      }
    };
    fetchCoins()
  }, [currency, page]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  return (
    error ? <ErrorComponent message={"Error while fetching Coins"} /> : <Container maxW={"container.xl"}>

      {loading ? <Loader /> : <>

        <RadioGroup value={currency} onChange={setcurrency} >
          <Radio value="inr" p={"4"}>INR</Radio>
          <Radio value="usd" p={"4"}>USD</Radio>
          <Radio value="eur" p={"4"}>EUR</Radio>
        </RadioGroup>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            coins.map((i) => {
              return <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                price={i.current_price}
                symbol={i.symbol}
                id={i.id}
                currencySymbol={currencySymbol} />
            })
          }
        </HStack>

        <HStack overflow={"auto"} p={"8"}>
          {
            <div className="change">

              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(page-1)}
              >
                Prev</Button>
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(1)}
                className={page===1?"changeColor":""}>
                1</Button>


              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(2)}
                className={page===2?"changeColor":""}>
                2</Button>

              <Text>......</Text>

              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(132)}
                className={page===132?"changeColor":""}>
                132</Button>


                <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(page+1)}
                className="check">
                next</Button>

            </div>

          }
        </HStack>
      </>}
    </Container>
  );
}

const ExchangeCard = ({ name, img, price, symbol, id, currencySymbol }) => (
  <Link to={`/coin/${id}`}>
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
      <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coins