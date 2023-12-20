import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { zzanPurchaseType } from "@/types/zzan/zzanPurchaseType";
import useUserStore from "@/stores/useUserStore";

// const item = [
//   {
//     id: 1,
//     image: "/data/fakeimg/sushi.jpg",
//     payDate: "2023-12-12 결제",
//     payStore: "스시히로이",
//     payPrice: "18,900원",
//     isQR: true,
//   },
//   {
//     id: 2,
//     image: "/data/fakeimg/toast.png",
//     payDate: "2023-12-11 결제",
//     payStore: "토스트",
//     payPrice: "1,000원",
//     isQR: false,
//   },
// ];

const MypageZzan = () => {
  const navigate = useNavigate();
  const { accessToken } = useUserStore();

  const [zzanData, setZzanData] = useState<zzanPurchaseType[] | null>(null);

  const MoveQR = (isQR: boolean, id: number, name: string) => () => {
    const encodedShopName = encodeURIComponent(name);
    console.log(isQR, id, name);
    if (isQR) {
      navigate(`/qr/${id}/${encodedShopName}`);
    }
  };

  const determineIsQR = (status: string) => {
    return status !== "사용 완료";
  };
  // 사용시간 포맷 만들기
  const handleDate = (time: string) => {
    const dateTime = new Date(time);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const formattedDateTime = `${year}년${month}월${day}일 ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return formattedDateTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/zzan-items/purchase/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setZzanData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <MyZzanContainer>
      {zzanData?.map((item, index) => (
        <ZzanItemContainer key={index}>
          {/* <ZzanItemImg>
            <img src={item.image} alt="" />
          </ZzanItemImg> */}
          <ZzanItemInfo isUsable={!item.usedTime}>
            {item.usedTime && (
              <div className="used-time">
                사용완료시간 | {handleDate(item.usedTime)}
              </div>
            )}
            <div className="shop-name">{item.shopName}</div>
            <div className="item-name">{item.itemName}</div>
            <div className="price">{item.price.toLocaleString()}원</div>
          </ZzanItemInfo>
          <ZzanItemBtn
            isQR={determineIsQR(item.status)}
            onClick={MoveQR(
              determineIsQR(item.status),
              item.purchaseId,
              item.shopName
            )}
          >
            {determineIsQR(item.status) ? "QR 코드" : "사용완료"}
          </ZzanItemBtn>
        </ZzanItemContainer>
      ))}
    </MyZzanContainer>
  );
};

const MyZzanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: calc(100% - 2.75rem);
  padding: 0 1.375rem;
  gap: 0.75rem;
  background: #fff;
`;

const ZzanItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.125rem;
  width: 23.875rem;
  height: 5.75rem;
  padding: 0.5rem 0.875rem;
  border-radius: 9px;
  border: 1px solid #dadada;
  box-sizing: border-box;
  gap: 0.5rem;
`;

// const ZzanItemImg = styled.div`
//   width: 4.75rem;
//   height: 4.75rem;
//   border-radius: 0.5rem;
//   overflow: hidden;
//   & > img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;
interface ZzanItemUsedTime {
  isUsable: boolean;
}

const ZzanItemInfo = styled.div<ZzanItemUsedTime>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  flex: 2;
  .used-time {
    color: #888;
    font-family: NotoSansRegularWOFF, sans-serif, Arial;
    font-size: 10px;
    display: ${(props) => (props.isUsable ? "none" : "block")};
  }
  .shop-name {
    font-family: NotoSansMediumWOFF;
    font-size: 12px;
    font-weight: 700;
  }
  .item-name {
    font-family: NotoSansMediumWOFF;
    font-size: 12px;
    font-weight: 700;
  }
  .price {
    font-family: NotoSansRegularWOFF;
    font-size: 12px;
  }
`;

interface ZzanItemBtnPropsType {
  isQR: boolean;
}

const ZzanItemBtn = styled.button<ZzanItemBtnPropsType>`
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isQR ? "#2AB673" : "#888")};
  font-size: 0.875rem;
  font-family: NotoSansMediumWOFF;
  font-weight: 700;
  line-height: 1.3125rem;
  border: none;
  color: #fff;
  cursor: ${(props) => (props.isQR ? "pointer" : "default")};
`;

export default MypageZzan;
