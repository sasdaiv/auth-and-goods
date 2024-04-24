import { MDBContainer } from "mdb-react-ui-kit";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/global.type";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getCategoryProducts,
  getProductsWithQuery,
} from "../api/api";
import Pagination from "../components/Pagination";
import { categoriesObject } from "../constants/global";
import debounce from "debounce";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [resultsPerPage, setResultsPerPage] = useState<number>(15);
  const resultsPerPageOptions = [15, 30, 50];
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const delayedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    delayedSearch(value);
  };

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    let res;
    try {
      if (category) {
        res = await getCategoryProducts(category, page, resultsPerPage);
      }
      if (searchTerm) {
        res = await getProductsWithQuery(searchTerm);
      }
      if (!category && !searchTerm) {
        res = await getAllProducts(page, resultsPerPage);
      }
      if (res) {
        setTotalProducts(res.total);
        setProducts(res.products);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setSearchTerm("");
    }
    setCurrentPage(1);
  }, [category, searchTerm]);

  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, resultsPerPage, category, searchTerm]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleResultsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newResultsPerPage = parseInt(event.target.value);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(1);
  };

  return (
    <PageWrapper isProtectedRoute>
      <MDBContainer className="my-5">
        <div
          className="d-flex mb-3 justify-content-between align-items-center bg-white p-3 flex-wrap"
          style={{
            border: "1px lightgrey solid",
            borderRadius: "20px",
          }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <label className="me-2">Per page:</label>
            <select
              className="form-select"
              style={{ width: "70px" }}
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
            >
              {resultsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label className="me-2 ms-3">Categories:</label>
            <select
              className="form-select"
              style={{ width: "150px" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}>{"All"}</option>
              {Object.entries(categoriesObject).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <Pagination
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            totalResults={totalProducts}
            onPageChange={onPageChange}
          />
        </div>
        <div className="mb-3 d-flex align-items-center gap-1">
          <input
            style={{ borderRadius: "10px" }}
            type="text"
            className="form-control"
            placeholder="Search products..."
            defaultValue={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </MDBContainer>
    </PageWrapper>
  );
}

export default Products;
