import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

export default function Home() {
  return (
    <>
      <Head>
        <title>Clumsy Apparel</title>
        <meta name="description" content="Welcome to Clumsy Apparel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <Card>
            <CardBody>
              <CardTitle tag="h1">Welcome to Clumsy Apparel Menu</CardTitle>
              <ListGroup className="mb-3">
                <ListGroupItem>Choose Menu Option</ListGroupItem>
              </ListGroup>

              <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                <div>
                  <Button color="primary">Create Form</Button>
                </div>
                <div>
                  <Button color="secondary">Order Forms</Button>
                </div>
                <div>
                  <Button color="info">Data</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </>
  );
}
