import { Container, Box, RadioGroup, Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, HStack, Progress, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Loader from './Loader';
import axios from 'axios';
import { server } from "../index"
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetails = () => {

  const [coin, setcoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  const switchChartStats = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setloading(true);
        break;

      case "7d":
        setDays("7d");
        setloading(true);
        break;

      case "14d":
        setDays("14d");
        setloading(true);
        break;

      case "30d":
        setDays("30d");
        setloading(true);
        break;

      case "60d":
        setDays("60d");
        setloading(true);
        break;

      case "200d":
        setDays("200d");
        setloading(true);
        break;

      case "1y":
        setDays("365d");
        setloading(true);
        break;

      case "max":
        setDays("max");
        setloading(true);
        break;

      default:
        setDays("24h");
        setloading(true);
        break;
    }
  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setcoin(data);
        setChartArray(chartData.prices);
        setloading(false);
      } catch (err) {
        seterror(true);
        setloading(false);
      }
    };
    fetchCoin()
  }, [params.id, currency, days]);


  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  return (
    error ? <ErrorComponent message={"Error while fetching Coin"} /> :
      <Container maxW={"container.xl"}>

        {
          loading ? <Loader /> : (
            <>
              <Box borderWidth={1} width={"full"}>
                <Chart arr={chartArray} currency={currencySymbol} days={days}></Chart>
              </Box>

              <HStack p={"4"} overflowX={"auto"}>
                {
                  btns.map((i) => (
                    <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
                  ))
                }
              </HStack>


              <RadioGroup value={currency} onChange={setcurrency} >
                <Radio value="inr" p={"4"}>INR</Radio>
                <Radio value="usd" p={"4"}>USD</Radio>
                <Radio value="eur" p={"4"}>EUR</Radio>
              </RadioGroup>

              <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
                <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                  Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
                </Text>

                <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"}></Image>

                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                    {coin.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>


                <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
                  {`#${coin.market_cap_rank}`}
                </Badge>

                <VStack w={"full"}>
                  <Progress value={50} colorScheme={"teal"} w={"full"} />
                  <HStack justifyContent={"space-between"} w={"full"}>
                    <Badge children={`${currencySymbol}${coin.market_data.low_24h[currency]}`} colorScheme={"red"} />
                    <Text fontSize={"sm"}>24H Range</Text>
                    <Badge children={`${currencySymbol}${coin.market_data.high_24h[currency]}`} colorScheme={"green"} />
                  </HStack>
                </VStack>

                <Box w={"full"} p={"4"}>
                  <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                  <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                  <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                  <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                  <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />

                </Box>

              </VStack>
            </>
          )
        }
      </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)
export default CoinDetails