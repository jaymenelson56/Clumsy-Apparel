import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardImg,
    FormGroup,
    Col,
    Spinner,
    Form,
    Label,
    Input,
    Button,
} from "reactstrap";
import Head from "next/head";
import { getOrderById, updateOrder } from "../../../api/orderListData";

export default function OrderDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        vinylType: "",
        shirtType: "",
        price: 0,
        hoursLogged: 0,
        amountOfErrors: 0,
        neededHelp: false,
        rating: 1,
        notes: "",
        fulfilled: false
    });
    const [submitError, setSubmitError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        if (!id) return;

        getOrderById(id)
            .then(data => {
                if (!data) {
                    setError("Order not found");
                } else {
                    setOrder(data);
                    setFormData({
                        vinylType: data.vinylType,
                        shirtType: data.shirtType,
                        price: data.price,
                        hoursLogged: data.hoursLogged,
                        amountOfErrors: data.amountOfErrors,
                        neededHelp: data.neededHelp,
                        rating: data.rating,
                        notes: data?.notes,
                        fulfilled: data.fulfilled
                    });
                }
            })
            .catch(() => setError("Failed to load order"))
            .finally(() => setLoading(false));
    }, [id]);
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);
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
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'select-one' && (name === 'neededHelp' || name === 'fulfilled')
                ? value === 'true'
                : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        try {
            const submitData = { ...formData };
            if (imageFile) {
                submitData.image = imageFile;
            } else if (imageURL) {
                submitData.imageURL = imageURL;
            }
            await updateOrder(id, submitData);
            router.push(`/orders/${id}/`);
        } catch (err) {
            console.error(err);
            setSubmitError("Failed to update order. Please try again.");
        }
    };

    if (error) return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className="text-center mt-5">
                    <p>Error: {error}</p>
                    <Button color="secondary" onClick={() => router.push("/orders/")}>Order List</Button>
                </div>
            </main>
        </div>
    );

    if (!order) return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className="text-center mt-5">
                    <p>Order not found</p>
                    <Button color="secondary" onClick={() => router.push("/orders/")}>Order List</Button>
                </div>
            </main>
        </div>
    );

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
                            src={imagePreview || order.imageURL || "/image-not-found.png"}
                            alt={`${order.vinylType} order`}
                            onError={(e) => {
                                e.currentTarget.src = "/image-not-found.png";
                            }}
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="imageInput">Upload New Image (optional):</Label>
                                    <Input
                                        id="imageInput"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imageURLInput">Or enter image URL:</Label>
                                    <div className="d-flex gap-2">
                                        <Input
                                            id="imageURLInput"
                                            name="imageURL"
                                            type="text"
                                            value={imageURL}
                                            onChange={(e) => setImageURL(e.target.value)}
                                            placeholder={order.imageURL || "type or paste in manually"}
                                        />
                                        <Button
                                            color="info"
                                            onClick={() => setImagePreview(imageURL)}
                                            disabled={!imageURL}
                                        >
                                            Preview
                                        </Button>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="vinylInput">Vinyl Used:</Label>
                                    <Input
                                        id="vinylInput"
                                        name="vinylType"
                                        type="text"
                                        value={formData.vinylType}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="shirtInput">Shirt Used:</Label>
                                    <Input
                                        id="shirtInput"
                                        name="shirtType"
                                        type="text"
                                        value={formData.shirtType}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="priceInput">Price:</Label>
                                    <Input
                                        id="priceInput"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="hoursInput">Hours Worked:</Label>
                                    <Input
                                        id="hoursInput"
                                        name="hoursLogged"
                                        type="number"
                                        step="0.50"
                                        value={formData.hoursLogged}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="errorInput">Number Of Errors:</Label>
                                    <Input
                                        id="errorInput"
                                        name="amountOfErrors"
                                        type="number"
                                        value={formData.amountOfErrors}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="helpInput">Help Needed:</Label>
                                    <Input
                                        id="helpInput"
                                        name="neededHelp"
                                        type="select"
                                        value={formData.neededHelp}
                                        onChange={handleChange}
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ratingInput">Rating:</Label>
                                    <Input
                                        id="ratingInput"
                                        name="rating"
                                        type="select"
                                        value={formData.rating}
                                        onChange={handleChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="notesInput">Notes:</Label>
                                    <Input
                                        id="notesInput"
                                        name="notes"
                                        type="textarea"
                                        value={formData.notes}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fulfilledInput">Is it fulfilled?</Label>
                                    <Input id="fulfilledInput"
                                        name="fulfilled"
                                        type="select"
                                        value={formData.fulfilled}
                                        onChange={handleChange}
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Input>
                                </FormGroup>
                                <div className="d-flex gap-2 mt-3">
                                    <Button color="primary" type="submit">Save Changes</Button>
                                    <Button color="secondary" onClick={() => router.back()}>Cancel</Button>
                                </div>
                                {submitError && <div className="text-danger">{submitError}</div>}
                            </Form>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}