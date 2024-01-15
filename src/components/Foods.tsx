import { useState } from "react";
import { getFoods } from "../services/fakeFoodService";
import Favourite from "./Favourite";
import Paginatioin from "./pagination";
import ListGroup from "./listGroup";
import { Category, getCategories } from "../services/fakeCategoryService";
import { paginate } from "../services/utils";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };

const PAGE_SIZE = 4;
export default function Foods() {
  const [foods, setFoods] = useState(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);

  const [SelectedCategory, setSelectedCategory] =
    useState<Category>(DEFAULT_CATEGORY);

  function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food._id !== id);
    setFoods(newFoods);
  }

  function handleFavour(id: string) {
    const newFoods = foods.map((food) => {
      if (food._id === id) {
        food.isFavoured = !food.isFavoured;
      }
      return food;
    });
    setFoods(newFoods);
  }
  if (foods.length === 0) return <p>There are no foods in the database.</p>;

  const paginatedFoods = paginate(foods, PAGE_SIZE, selectedPage);

  return (
    <div className="row container pt-3">
      <div className="col-3">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...getCategories()]}
          selectedItem={SelectedCategory}
          onItemSelect={setSelectedCategory}
        />
      </div>
      <div className="col">
        <p>There are {foods.length} foods in the database. </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedFoods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.price}</td>
                <td>{food.numberInStock}</td>
                <td>
                  <Favourite
                    isFavoured={Boolean(food.isFavoured)}
                    onFavor={() => handleFavour(food._id)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginatioin
          totalCount={foods.length}
          pageSize={PAGE_SIZE}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </div>
  );
}
