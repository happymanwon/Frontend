import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Geolocation from "@/components/Geolocation";
import { StoreData } from "store-datas";
import useRegionStore from "../stores/location";
import useCategoryStore from "../stores/categories";

const CategoryPage = (): JSX.Element => {
  const { districtId, district } = useRegionStore();
  const districtName = district[districtId];

  const { categories, categoryId } = useCategoryStore();
  const categoryName = categories[categoryId];

  const [categoryData, setCategoryData] = useState<StoreData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`/api/stores/${categoryId}`);     // 백엔드랑 통신할 때
        const response = await axios.get(`/data/stores/${categoryId}.json`); // json 파일 사용
        const filterDataByDistrict = response.data.filter((data) =>
          data.sh_addr.includes(districtName)
        );
        setCategoryData(filterDataByDistrict);
        console.log(filterDataByDistrict);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [categoryId, districtName]);

  return (
    <CategoryContainer>
      <CategoryDesc>{categoryName}</CategoryDesc>
      <DistrictWrapper>
        <Geolocation />
      </DistrictWrapper>
      {!categoryData || categoryData.length === 0 ? (
        <p>데이터가 없습니다😅</p>
      ) : (
        <ListWrapper>
          {categoryData.map((data, index) => (
            <ListLink key={index} to={`/store/${Number(data.sh_id)}`}>
              {/* 사진 데이터 있을 때 
              <img src={`${data.sh_photo}`} alt={`이미지 ${index}`} /> */}
              <img
                src="https://sftc.seoul.go.kr/mulga/inc/img_view.jsp?filename=20220718174745.jpg"
                alt={`이미지 ${index}`}
              />
              <h1>{data.sh_name}</h1>
            </ListLink>
          ))}
        </ListWrapper>
      )}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  width: 100%;
  height: calc(100vh - 6.125rem);
  overflow: scroll;
  font-family: NotoSansWOFF, sans-serif, Arial;
`;

const CategoryDesc = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
`;

const DistrictWrapper = styled.div`
  margin: 10px 0px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ListLink = styled(Link)`
  text-decoration: none;
  color: #333;
  width: 11.3rem;
  height: 13rem;
  img {
    width: 11.3rem;
    height: 11.3rem;
    border-radius: 10px;
  }
  h1 {
    margin-top: 5px;
    font-size: 16px;
  }
`;

export default CategoryPage;
