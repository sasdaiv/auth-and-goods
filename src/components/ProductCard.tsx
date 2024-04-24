import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from "mdb-react-ui-kit";
import { Product } from "../types/global.type";
import { FC } from "react";
import { categoriesObject } from "../constants/global";

interface IProductCard {
  item: Product;
}

const ProductCard: FC<IProductCard> = ({ item }) => {
  const numberOfStars = Math.round(item.rating);
  const stars = Array.from({ length: numberOfStars }, (_, index) => (
    <MDBIcon key={index} fas icon="star" className="text-warning" />
  ));

  return (
    <MDBCard
      style={{ width: "100%", padding: "1rem", borderRadius: "20px" }}
      className="col-lg-4 col-md-6 col-sm-6"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <MDBCardImage
          src={item.images[0]}
          position="top"
          alt={item.title}
          style={{
            objectFit: "cover",
            height: "300px",
            borderRadius: "20px",
            border: "1px lightgrey solid",
          }}
        />
      </div>
      <MDBCardBody>
        <div className="d-flex justify-content-between">
          <p className="small">
            <a href="#!" className="text-muted">
              {categoriesObject[item.category]}
            </a>
          </p>
          <p className="small text-danger">
            <s>{item.price}$</s>
          </p>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <p
            className="mb-0"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.title}
          </p>
          <h5 className="text-dark mb-0">
            {(
              item.price -
              (item.price * item.discountPercentage) / 100
            ).toFixed(0)}
            $
          </h5>
        </div>

        <div className="d-flex justify-content-between">
          <p className="text-muted mb-0">Rating:</p>
          <div className="ms-auto text-warning">{stars}</div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProductCard;
