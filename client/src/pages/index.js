import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import { getSummary } from "../api/analyticsdata";
import { useEffect, useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSummary()
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load summary data");
        setLoading(false);
      });
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

              {loading ? (
                <div className="text-center my-3">
                  <Spinner />
                </div>
              ) : error ? (
                <Alert color="danger" className="mb-3">{error}</Alert>
              ) : (
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
              )}

              <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                <div>
                  <Link href="/create_listing" passHref>
                    <Button data-test='create-button' className={styles.button}>Create Listing</Button>
                  </Link>
                </div>
                <div>
                  <Link href="/orders" passHref>
                    <Button data-test='order-button' className={styles.button}>Orders</Button>
                  </Link>
                </div>
                <div>
                  <Link href="/analytics" passHref>
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
