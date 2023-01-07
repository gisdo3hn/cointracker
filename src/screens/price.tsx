import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface IcoinId {
  coinId: string;
}

interface IHistorical {
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const PriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceBox = styled.div`
  border-radius: 20px;
  margin-left: 5px;
  width: 200px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: ${(props) => props.theme.tabColor};
  }
  span:first-child {
    margin-left: 15px;
    text-transform: uppercase;
  }
  span:last-child {
    margin-right: 10px;
    font-size: 30px;
    font-weight: 400;
  }
`;

const PriceAth = styled.div`
  border-radius: 20px;
  width: 430px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
`;

const AthPrice_Date = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    color: ${(props) => props.theme.tabColor};
  }
  span:first-child {
    margin-bottom: 5px;
  }
  span:last-child {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 400;
  }
`;

function Price() {
  const { coinId } = useOutletContext() as IcoinId;
  const { isLoading, data } = useQuery(
    ["Price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      <PriceWrap>
        <PriceBox>
          <span>Change-an hour</span>
          <span>{data?.quotes.USD.percent_change_1h}</span>
        </PriceBox>
        <PriceBox>
          <span>Change-24 hours</span>
          <span>{data?.quotes.USD.percent_change_24h}</span>
        </PriceBox>
      </PriceWrap>
      <PriceAth>
        <AthPrice_Date>
          <span>ATH_PRICE</span>
          <span>{data?.quotes.USD.ath_price}</span>
        </AthPrice_Date>
        <AthPrice_Date>
          <span>ATH_PRICE_DATE</span>
          <span>{data?.quotes.USD.ath_date}</span>
        </AthPrice_Date>
      </PriceAth>
    </div>
  );
}

export default Price;
