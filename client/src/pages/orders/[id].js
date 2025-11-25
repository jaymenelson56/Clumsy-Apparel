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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";
import Head from "next/head";
import { deleteOrder, getOrderById } from "../api/orderListData";

export default function OrderDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDD, setOpenDD] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const toggleDD = () => setOpenDD(!openDD)

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

    const handleDelete = async () => {
        setDeleteError(null);
        try {
            await deleteOrder(id);
            setDeleteModal(false);
            setSuccessModal(true);
        } catch (err) {
            console.error(err);
            setDeleteError("Failed to delete order. Please try again.");
            setDeleteModal(false);
        }
    };

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
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>Are you sure you want to delete order number {order.id}? Once Deleted it cannot be retrieved.</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>Delete</Button>
                    <Button color="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={successModal} toggle={() => setSuccessModal(false)}>
                <ModalHeader>Success</ModalHeader>
                <ModalBody>Order Deleted Successfully</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => router.push('/orders')}>Ok</Button>
                </ModalFooter>
            </Modal>
            {deleteError && (
                <Modal isOpen={!!deleteError} toggle={() => setDeleteError(null)}>
                    <ModalHeader>Error</ModalHeader>
                    <ModalBody className="text-danger">{deleteError}</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => setDeleteError(null)}>Close</Button>
                    </ModalFooter>
                </Modal>
            )}
            <div className={styles.page}>
                <main className={styles.main}>
                    <Card className="card-custom my-2"
                        color="primary"
                        outline
                        style={{ borderWidth: '3px' }}
                    >
                        <CardHeader className="d-flex justify-content-between align-items-center gap-3">
                            <CardTitle tag="h2">{order.id}: {order.vinylType} on {order.shirtType}</CardTitle>
                            <Dropdown isOpen={openDD} toggle={toggleDD}>
                                <DropdownToggle tag="span" className="p-0" style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                                    ⋮
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem onClick={() => router.push(`/orders/${id}/edit`)}>
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="text-danger" onClick={() => setDeleteModal(true)}>
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
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
                                <ListGroupItem><strong>Help Needed:</strong> {order.neededHelp ? "Yes" : "No"}</ListGroupItem>
                                <ListGroupItem><strong>Rating:</strong> {order.rating}/5</ListGroupItem>
                                {order.notes && <ListGroupItem><strong>Notes:</strong> {order.notes}</ListGroupItem>}
                                <ListGroupItem><strong>Fulfilled:</strong> {order.fulfilled ? "Yes" : "No"}</ListGroupItem>
                                <ListGroupItem><strong>Created:</strong> {new Date(order.createdOn).toLocaleDateString()}</ListGroupItem>
                                {order.updatedOn && <ListGroupItem><strong>Last Edited:</strong> {new Date(order.updatedOn).toLocaleDateString()}</ListGroupItem>}
                            </ListGroup>
                        </CardBody>
                        <Button color="secondary" onClick={() => router.push("/orders")}>Back to Orders</Button>
                    </Card>
                </main>
            </div>
        </>
    );
}