import React, { useState, useEffect } from "react";
import CategoryDataService from "../../../services/Category/index";

const Edit = (props) => {
  const initialCategoryState = {
    id: null,
    name: "",
  };

  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
  const [message, setMessage] = useState("");

  const getCategory = (id) => {
    CategoryDataService.get(id)
      .then((response) => {
        setCurrentCategory(response.data);
        console.log("->" + response.data);
      })
      .catch((e) => {
        console.log("->" + e);
      });
  };

  useEffect(() => {
    getCategory(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updateCategory = () => {
    CategoryDataService.update(currentCategory.id, currentCategory)
      .then((response) => {
        console.log(response.data);
        setMessage("The category was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCategory = () => {
    CategoryDataService.remove(currentCategory.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/category");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCategory ? (
        <div className="edit-form">
          <h4>Category</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCategory.name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteCategory}>
            Deletar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCategory}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
        </div>
      )}
    </div>
  );
};

export default Edit;
