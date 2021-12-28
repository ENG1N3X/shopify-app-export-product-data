import { Page, Layout } from "@shopify/polaris";

import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

const Index = () => {
  return (
    <Page
      title="Product List"
      divider={true}
      fullWidth={true}
      primaryAction={{
        primary: true,
        content: "Export",
        onAction: () => {
          console.log("Clicked");
        },
      }}
    >
      <Layout>
        <ProductList data="1" />
        <Footer
          data={{
            url: "https://github.com/ENG1N3X",
            text: "Developed by Yuriy K.",
          }}
        />
      </Layout>
    </Page>
  );
};

export default Index;
