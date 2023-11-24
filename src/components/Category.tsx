import { Link } from "react-router-dom";

import useCategoryStore from "@stores/categories";

const Category = () => {
  const { categories, categoryId, setCategoryId } = useCategoryStore();
  const handleCategoryClick = (id: number) => {
    setCategoryId(id);
  };

  return (
    <div className="category-buttons">
      {Object.keys(categories).map((id) => (
        <Link key={id} to={`/category/${Number(id)}`} className={Number(id) === categoryId ? "selected" : ""}>
          <button
            className={`category-button-${Number(id)}`} // 카테고리에 따른 고유 클래스 추가
            onClick={() => handleCategoryClick(Number(id))}
          >
            {categories[Number(id)]}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Category;
