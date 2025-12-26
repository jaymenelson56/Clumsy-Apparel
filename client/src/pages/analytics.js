import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import {
    Card,
    CardBody,
    CardTitle,
    Table,
    Spinner,
    Col
} from "reactstrap";
import { getSummary } from "../api/analyticsdata";

export default function Analytics() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    getSummary()
        .then(data => {
            setSummary(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
}, []);

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    if (loading) return (
        <>
            <Head>
                <title>Analytics - Clumsy Apparel</title>
            </Head>
            <div className={styles.page}>
                <main className={styles.main}>
                    <Col className="text-center mt-5">
                        <Spinner color="primary" type="grow">Loading...</Spinner>
                        <Spinner color="primary" type="grow">Loading...</Spinner>
                        <Spinner color="primary" type="grow">Loading...</Spinner>
                    </Col>
                </main>
            </div>
        </>
    )

    return (
        <>
            <Head>
                <title>Analytics - Clumsy Apparel</title>
                <meta name="description" content="Business analytics" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.page}`}>
                <main className={styles.main}>
                    <Card className="card-custom">
                        <CardBody>
                            <CardTitle tag="h1">Business Analytics</CardTitle>
                                <Table hover>
                                    <tbody>
                                        <tr>
                                            <td>Total Hours</td>
                                            <td>{summary?.totalHours?.toFixed(2) || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Revenue</td>
                                            <td>${summary?.fulfilledRevenue?.toFixed(2) || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Average Rating</td>
                                            <td>{summary?.averageRating?.toFixed(2) || 0} / 5</td>
                                        </tr>
                                        <tr>
                                            <td>Total Orders</td>
                                            <td>{summary?.totalOrders || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Fulfilled Orders</td>
                                            <td>{summary?.fulfilledOrders || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Unfulfilled Orders</td>
                                            <td>{summary?.unfulfilledOrders || 0}</td>
                                        </tr>
                                        <tr>
                                            <td>First Project Created On</td>
                                            <td>{formatDate(summary?.firstProjectCreated)}</td>
                                        </tr>
                                        <tr>
                                            <td>Most Recent Activity</td>
                                            <td>{formatDate(summary?.mostRecentActivity)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}