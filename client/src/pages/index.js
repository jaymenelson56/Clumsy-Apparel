import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
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
          <Card className="card-custom">
            <CardBody>
              <CardTitle data-test='welcome' tag="h1" >Welcome to Clumsy Apparel Menu</CardTitle>


              <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                <div>
                  <Link href="/create_order" passHref>
                    <Button data-test='create-button' className={styles.button}>Create Listing</Button>
                  </Link>
                </div>
                <div>
                  <Link href="/orders" passHref>
                    <Button data-test='order-button' className={styles.button}>Orders</Button>
                  </Link>
                </div>
                <div>
                  <Link href="/data" passHref>
                    <Button data-test='data-button' className={styles.button}>Analytics</Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </>
  );
}
