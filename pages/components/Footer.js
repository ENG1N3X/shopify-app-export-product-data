import { Layout, TextContainer, Link } from "@shopify/polaris";

const Footer = (props) => {
  return (
    <Layout.Section>
      <TextContainer>
        <Link
          url={props.data.url}
          id="footer-link"
          monochrome={true}
          external={true}
        >
          {props.data.text}
        </Link>
      </TextContainer>
    </Layout.Section>
  );
};

export default Footer;
