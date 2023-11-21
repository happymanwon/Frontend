import { useState } from "react";
import { Link } from "react-router-dom";

const categories: { [key: number]: string } = {
  1: "한식",
  2: "중식",
  3: "일식",
  4: "기타 외식업",
  5: "미용",
  6: "기타",
  7: "세탁",
  8: "숙박",
};

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="category-buttons">
      {Object.keys(categories).map((categoryId) => (
        <Link
          key={categoryId}
          to={`/category/${Number(categoryId)}`}
          className={Number(categoryId) === selectedCategory ? "selected" : ""}
        >
          <button
            className={`category-button-${Number(categoryId)}`} // 카테고리에 따른 고유 클래스 추가
            onClick={() => handleCategoryClick(Number(categoryId))}
          >
            {categories[Number(categoryId)]}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Category;
