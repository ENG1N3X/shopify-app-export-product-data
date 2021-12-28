import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Layout,
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";

const GET_PRODUCTS = gql`
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          featuredImage {
            id
            altText
          }
        }
      }
    }
  }
`;

const ProductList = (props) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { first: 50 },
  });

  if (loading) {
    return (
      <Layout.Section>
        <TextStyle variation="strong">Loading...</TextStyle>
      </Layout.Section>
    );
  }
  if (error)
    return (
      <Layout.Section>
        <TextStyle variation="strong">{error.message}</TextStyle>
      </Layout.Section>
    );

  if (data) {
    console.log("Data", data);

    const products = data.products.edges.map((product) => product.node);
    console.log("products", products);

    return (
      <Layout.Section>
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          items={products}
          loading={loading}
          selectable
          selectedItems={selectedIds}
          onSelectionChange={(selectedItems) => {
            setSelectedIds(selectedItems);
            console.log("setSelectedIds", selectedItems);
          }}
          renderItem={(item, index) => {
            console.log("Item data", item);
            const { id, title, featuredMedia } = item;
            return (
              <ResourceItem
                id={id}
                accessibilityLabel={title}
                media={
                  <Thumbnail
                    source={
                      featuredMedia
                        ? featuredMedia.preview.image.id
                        : "https://via.placeholder.com/72"
                    }
                    alt={featuredMedia && featuredMedia.alt}
                    size="large"
                  />
                }
              >
                <h3>
                  <TextStyle variation="strong">{title}</TextStyle>
                </h3>
              </ResourceItem>
            );
          }}
        />
      </Layout.Section>
    );
  }
};

export default ProductList;
