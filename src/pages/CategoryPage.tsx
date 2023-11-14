import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface CategoryData {
  // 카테고리데이터의 모양
  name: string;
  description: string;
}

const CategoryPage = (): JSX.Element => {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/store?category=${categoryId}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  if (!categoryData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{categoryData.name}</h1>
      <p>{categoryData.description}</p>
    </div>
  );
};

export default CategoryPage;
