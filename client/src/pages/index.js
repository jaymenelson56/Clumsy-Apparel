import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { getSummary } from "./api/analyticsdata";
import { useEffect, useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary()
      .then(data => setSummary(data))
      .catch(err => console.error(err));
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };
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

              <ListGroup className="mb-3">
                <ListGroupItem>
                  <strong>Orders Served:</strong> {summary?.fulfilledOrders || 0}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Awaiting Fulfilment:</strong> {summary?.unfulfilledOrders || 0}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Latest Activity On:</strong> {formatDate(summary?.mostRecentActivity)}
                </ListGroupItem>
              </ListGroup>

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
