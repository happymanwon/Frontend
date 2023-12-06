import useCategoryStore from "@stores/categories";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { categories, categoryId, setCategoryId } = useCategoryStore();
  const navigate = useNavigate();
  const handleCategoryClick = (id: number) => {
    setCategoryId(id);
    navigate(`/category/${Number(id)}`);
  };

  return (
    <div className="category-buttons">
      {Object.keys(categories).map((id) => (
        <button
          key={id}
          id={`category-button-${Number(id)}`}
          className={Number(id) === categoryId ? "selected" : ""}
          onClick={() => handleCategoryClick(Number(id))}
        >
          {categories[Number(id)]}
        </button>
      ))}
    </div>
  );
};

export default Category;
