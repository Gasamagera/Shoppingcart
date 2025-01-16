import { useState } from "react";

const products = [
  {
    name: "Sofa",
    image:
      "https://i5.walmartimages.com/asr/5b7c8a4f-6c69-4ba8-bbdf-530bfc88f95c.991b3be4e506c57bc9a5ecfcb149e1ae.jpeg",
    price: 200,
    id: 1,
  },
  {
    name: "couche",
    image:
      "https://kvadrofurniture.ca/wp-content/uploads/2018/06/AR35-1-scaled.jpg",
    price: 300,
    id: 2,
  },
  {
    name: "chair",
    image:
      "https://i5.walmartimages.com/asr/03a2c830-3d9c-4fee-b660-5d865113d429.643cc059e6685eac1b1c03fb84da5298.jpeg",
    price: 100,
    id: 3,
  },
  {
    name: "Sofa",
    image:
      "https://i5.walmartimages.com/asr/5b7c8a4f-6c69-4ba8-bbdf-530bfc88f95c.991b3be4e506c57bc9a5ecfcb149e1ae.jpeg",
    price: 200,
    id: 4,
  },
  {
    name: "couche",
    image:
      "https://kvadrofurniture.ca/wp-content/uploads/2018/06/AR35-1-scaled.jpg",
    price: 300,
    id: 5,
  },
  {
    name: "chair",
    image:
      "https://i5.walmartimages.com/asr/03a2c830-3d9c-4fee-b660-5d865113d429.643cc059e6685eac1b1c03fb84da5298.jpeg",
    price: 100,
    id: 6,
  },
  {
    name: "Sofa",
    image:
      "https://i5.walmartimages.com/asr/5b7c8a4f-6c69-4ba8-bbdf-530bfc88f95c.991b3be4e506c57bc9a5ecfcb149e1ae.jpeg",
    price: 200,
    id: 7,
  },
  {
    name: "couche",
    image:
      "https://kvadrofurniture.ca/wp-content/uploads/2018/06/AR35-1-scaled.jpg",
    price: 300,
    id: 8,
  },
];

export default function App() {
  const [packedItem, setPckedItem] = useState([]);
  const [showPackingList, setShowPackingList] = useState(false);

  function addToCart(produ) {
    setPckedItem([...packedItem, produ]);
  }

  function displayPackList() {
    setShowPackingList(!showPackingList);
  }
  return (
    <div className="App">
      <Navbar displayPackList={displayPackList} packedItem={packedItem} />
      <ListProducts
        addToCart={addToCart}
        packedItem={packedItem}
        showPackingList={showPackingList}
      />
    </div>
  );
}

function Navbar({ displayPackList, packedItem }) {
  const num = packedItem.length;
  return (
    <div className="navbar">
      <h3>Home</h3>
      <div className="navbar-buttons">
        <button className="circle-button" onClick={displayPackList}>
          <img src="Image/shop.jpg" alt="Shop" />
        </button>
        <div className="circle-notification">
          <span>{num}</span> {/* Notification number */}
        </div>
      </div>
    </div>
  );
}

function ListProducts({ addToCart, packedItem, showPackingList }) {
  return (
    <div className="container">
      <div className="product-container">
        <h1 style={{ marginLeft: "30px" }}>List Products</h1>
        <ul>
          {products.map((pro) => (
            <Products pro={pro} key={pro.id} addToCart={addToCart} />
          ))}
        </ul>
      </div>
      <div className="packing-list-container">
        <PackingList
          packedItem={packedItem}
          showPackingList={showPackingList}
        />
      </div>
    </div>
  );
}

function Products({ pro, addToCart }) {
  return (
    <div className="product-card">
      <img src={pro.image} alt={pro.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{pro.name}</h3>
        <div className="price-and-button">
          <p className="product-price">${pro.price}</p>
          <button className="add-to-cart-button" onClick={() => addToCart(pro)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
function PackingList({ packedItem }) {
  const [clickCounts, setClickCounts] = useState({});

  function handleIncrement(id) {
    setClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [id]: (prevCounts[id] || 0) + 1 };
      return newCounts;
    });
  }

  function handleDecrement(id) {
    setClickCounts((prevCounts) => {
      const newCounts = {
        ...prevCounts,
        [id]: Math.max((prevCounts[id] || 0) - 1, 0),
      };
      return newCounts;
    });
  }

  return (
    <div>
      <h3>Shopping Cart</h3>
      <ul>
        {packedItem.map((product) => {
          const quantity = clickCounts[product.id] || 0;
          const price = product.price; // Get the price of the product
          const totalPrice = price * quantity; // Calculate the total price

          return (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="item-image"
              />
              <span className="item-name">{product.name}</span>
              <span className="item-price">
                ${totalPrice > 0 ? totalPrice : price}
              </span>
              <button
                className="item-btn"
                onClick={() => handleDecrement(product.id, price)}
              >
                ➖
              </button>
              <span className="item-quantity">{quantity}</span>
              <button
                className="item-btn"
                onClick={() => handleIncrement(product.id, price)}
              >
                ➕
              </button>
            </li>
          );
        })}
      </ul>

      <div className="action-buttons">
        <button className="close-btn">Close</button>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
