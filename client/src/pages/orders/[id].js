import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardImg,
    ListGroup,
    ListGroupItem,
    Col,
    Spinner,
} from "reactstrap";
import Head from "next/head";
import { getOrderById } from "../api/orderListData";

export default function OrderDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        getOrderById(id)
            .then(data => {
                if (!data) {
                    setError("Order not found");
                } else {
                    setOrder(data);
                }
            })
            .catch(() => setError("Failed to load order"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <>
            <Head>
                <title>Clumsy Apparel</title>
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
    if (error) return <div>Error: {error}</div>;
    if (!order) return <div>Order not found</div>;

    return (
        <>
            <Head>
                <title>{order.vinylType} - Clumsy Apparel</title>
            </Head>
            <div className={styles.page}>
                <main className={styles.main}>
                    <Card className="card-custom my-2"
                        color="primary"
                        outline
                        style={{ borderWidth: '3px' }}
                    >
                        <CardHeader>
                            <CardTitle tag="h2">{order.id}: {order.vinylType} on {order.shirtType}</CardTitle>
                        </CardHeader>
                        <CardImg
                            top
                            src={order.imageURL || "/image-not-found.png"}
                            alt={`${order.vinylType} order`}
                            onError={(e) => {
                                e.currentTarget.src = "/image-not-found.png";
                            }}
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <CardBody>
                            <ListGroup flush>
                                <ListGroupItem><strong>Vinyl Used:</strong> {order.vinylType}</ListGroupItem>
                                <ListGroupItem><strong>Shirt Used:</strong> {order.shirtType}</ListGroupItem>
                                <ListGroupItem><strong>Price:</strong> ${order.price}</ListGroupItem>
                                <ListGroupItem><strong>Hours Worked:</strong> {order.hoursLogged}</ListGroupItem>
                                <ListGroupItem><strong>Number of Errors:</strong> {order.amountOfErrors}</ListGroupItem>
                                <ListGroupItem><strong>Help Required:</strong> {order.neededHelp ? "Yes" : "No"}</ListGroupItem>
                                <ListGroupItem><strong>Rating:</strong> {order.rating}/5</ListGroupItem>
                                {order.notes && <ListGroupItem><strong>Notes:</strong> {order.notes}</ListGroupItem>}
                                <ListGroupItem><strong>Fulfilled:</strong> {order.fulfilled ? "Yes" : "No"}</ListGroupItem>
                                <ListGroupItem><strong>Created:</strong> {new Date(order.createdOn).toLocaleDateString()}</ListGroupItem>
                                {order.updatedOn && <ListGroupItem><strong>Last Edited:</strong> {new Date(order.updatedOn).toLocaleDateString()}</ListGroupItem>}
                            </ListGroup>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}